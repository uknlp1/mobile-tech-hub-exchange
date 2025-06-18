
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Clock, CheckCircle, User, DollarSign, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Transaction {
  id: string;
  deviceType: string;
  brand: string;
  model: string;
  condition: string;
  contactEmail: string;
  status: string;
  submissionDate: string;
  lastUpdated: string;
  price?: string;
}

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
  const [filteredTransaction, setFilteredTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem('userTransactions') || '[]');
    setUserTransactions(transactions);
  }, []);

  const statusStages = [
    { key: "awaiting_confirmation", label: "Awaiting Confirmation", icon: Clock, color: "bg-yellow-500" },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle, color: "bg-green-500" },
    { key: "assigned_agent", label: "Assigned to Agent", icon: User, color: "bg-blue-500" },
    { key: "device_assessed", label: "Device Assessed", icon: Package, color: "bg-purple-500" },
    { key: "awaiting_payment", label: "Awaiting Payment", icon: AlertCircle, color: "bg-orange-500" },
    { key: "paid", label: "Paid", icon: DollarSign, color: "bg-green-600" }
  ];

  const getStatusInfo = (status: string) => {
    const statusInfo = statusStages.find(stage => stage.key === status);
    return statusInfo || { key: status, label: status, icon: Package, color: "bg-gray-500" };
  };

  const getStatusProgress = (status: string) => {
    const currentIndex = statusStages.findIndex(stage => stage.key === status);
    return currentIndex >= 0 ? ((currentIndex + 1) / statusStages.length) * 100 : 0;
  };

  const handleSearch = () => {
    const found = userTransactions.find(tx => tx.id === trackingNumber.toUpperCase());
    setFilteredTransaction(found || null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-poppins">Track Your Device</h1>
          <p className="text-gray-300 font-inter">Enter your transaction number or view your submission history</p>
        </div>

        {/* Tracking Search */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white font-poppins">Track by Transaction Number</CardTitle>
            <CardDescription className="text-gray-300">Enter your transaction number to get real-time updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter transaction number (e.g., PHN-123456-ABC)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1 bg-gray-700 border-gray-600 text-white"
              />
              <Button 
                onClick={handleSearch}
                className="bg-lemon hover:bg-lemon-dark text-black"
              >
                <Search className="h-4 w-4 mr-2" />
                Track
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Result */}
        {filteredTransaction && (
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white font-poppins">Transaction Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-300 text-sm">Transaction ID</p>
                    <p className="text-white font-mono text-lg">{filteredTransaction.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Device</p>
                    <p className="text-white">{filteredTransaction.brand} {filteredTransaction.model}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Submitted</p>
                    <p className="text-white">{formatDate(filteredTransaction.submissionDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Last Updated</p>
                    <p className="text-white">{formatDate(filteredTransaction.lastUpdated)}</p>
                  </div>
                </div>

                {/* Status Progress */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Current Status</h3>
                    <Badge className={`${getStatusInfo(filteredTransaction.status).color} text-white`}>
                      {React.createElement(getStatusInfo(filteredTransaction.status).icon, { className: "h-4 w-4 mr-1" })}
                      {getStatusInfo(filteredTransaction.status).label}
                    </Badge>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-lemon h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getStatusProgress(filteredTransaction.status)}%` }}
                    ></div>
                  </div>

                  {/* Status Steps */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {statusStages.map((stage, index) => {
                      const currentIndex = statusStages.findIndex(s => s.key === filteredTransaction.status);
                      const isCompleted = index <= currentIndex;
                      const isCurrent = index === currentIndex;
                      
                      return (
                        <div 
                          key={stage.key}
                          className={`text-center p-2 rounded-lg transition-all ${
                            isCurrent ? 'bg-lemon/20 border border-lemon' :
                            isCompleted ? 'bg-green-500/20' : 'bg-gray-700/50'
                          }`}
                        >
                          <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                            isCurrent ? 'bg-lemon text-black' :
                            isCompleted ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-400'
                          }`}>
                            {React.createElement(stage.icon, { className: "h-4 w-4" })}
                          </div>
                          <p className={`text-xs ${
                            isCurrent ? 'text-lemon font-semibold' :
                            isCompleted ? 'text-green-400' : 'text-gray-400'
                          }`}>
                            {stage.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {trackingNumber && !filteredTransaction && (
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mb-8">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Transaction Not Found</h3>
              <p className="text-gray-300">Please check your transaction number and try again.</p>
            </CardContent>
          </Card>
        )}

        {/* Transaction History */}
        {userTransactions.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white font-poppins">Your Submissions</h2>
            
            {userTransactions.map((transaction) => {
              const statusInfo = getStatusInfo(transaction.status);
              return (
                <Card key={transaction.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white font-poppins">
                            {transaction.brand} {transaction.model}
                          </h3>
                          <Badge className={`${statusInfo.color} text-white`}>
                            {React.createElement(statusInfo.icon, { className: "h-4 w-4 mr-1" })}
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <p className="text-gray-300">Transaction: {transaction.id}</p>
                          <p className="text-gray-300">Condition: {transaction.condition}</p>
                          <p className="text-gray-300">Submitted: {formatDate(transaction.submissionDate)}</p>
                          {transaction.price && (
                            <p className="text-gray-300">Asking Price: ${transaction.price}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button 
                          onClick={() => {
                            setTrackingNumber(transaction.id);
                            setFilteredTransaction(transaction);
                          }}
                          className="bg-lemon hover:bg-lemon-dark text-black"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {userTransactions.length === 0 && !trackingNumber && (
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-8 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Submissions Yet</h3>
              <p className="text-gray-300 mb-4">You haven't submitted any devices for evaluation.</p>
              <Button 
                onClick={() => window.location.href = '/sell'}
                className="bg-lemon hover:bg-lemon-dark text-black"
              >
                Sell Your Device
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Track;
