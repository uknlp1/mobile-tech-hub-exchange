import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Package, CheckCircle, Clock, User, CreditCard, MapPin, DollarSign, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Track = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    const currentAgent = localStorage.getItem('currentAgent');
    const isAdmin = localStorage.getItem('isAdmin');
    
    setIsLoggedIn(!!(currentUser || currentAgent || isAdmin));
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // First check stored transactions for real data
      const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      const found = transactions.find((t: any) => t.transactionNumber === searchTerm.trim());
      
      if (found) {
        // Create enhanced transaction with status history
        const enhancedTransaction = {
          ...found,
          statusHistory: generateStatusHistory(found.status, found.submittedDate, found.offeredAmount)
        };
        setSearchResult(enhancedTransaction);
      } else {
        // Mock data for demonstration
        setSearchResult({
          transactionNumber: searchTerm,
          deviceType: "phone",
          brand: "Apple",
          model: "iPhone 14 Pro",
          condition: "Good",
          status: "Offer Made",
          submittedDate: "2024-01-10T10:00:00Z",
          contactPhone: "+27 82 123 4567",
          contactEmail: "customer@example.com",
          estimatedValue: 12500,
          offeredAmount: 11000,
          statusHistory: generateStatusHistory("Offer Made", "2024-01-10T10:00:00Z", 11000)
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const generateStatusHistory = (currentStatus: string, submittedDate: string, offeredAmount?: number) => {
    const baseHistory = [
      {
        status: "Awaiting Confirmation",
        date: submittedDate,
        description: "Device details submitted for review"
      },
      {
        status: "Confirmed",
        date: addHours(submittedDate, 4),
        description: "Device information verified and approved"
      },
      {
        status: "Assigned to Agent",
        date: addHours(submittedDate, 24),
        description: "Agent assigned for physical assessment"
      }
    ];

    // Add additional status based on current status
    switch (currentStatus.toLowerCase()) {
      case "device assessed":
        baseHistory.push({
          status: "Device Assessed",
          date: addHours(submittedDate, 48),
          description: "Physical assessment completed. Final quote being prepared."
        });
        break;
      case "awaiting offer":
        baseHistory.push(
          {
            status: "Device Assessed",
            date: addHours(submittedDate, 48),
            description: "Physical assessment completed. Final quote being prepared."
          },
          {
            status: "Awaiting Offer",
            date: addHours(submittedDate, 72),
            description: "Agent is preparing the offer based on assessment"
          }
        );
        break;
      case "offer made":
        baseHistory.push(
          {
            status: "Device Assessed",
            date: addHours(submittedDate, 48),
            description: "Physical assessment completed. Final quote generated."
          },
          {
            status: "Awaiting Offer",
            date: addHours(submittedDate, 72),
            description: "Agent is preparing the offer based on assessment"
          },
          {
            status: "Offer Made",
            date: addHours(submittedDate, 96),
            description: `Offer of R${offeredAmount?.toLocaleString()} has been made. Please respond to accept or decline.`
          }
        );
        break;
      case "awaiting payment":
        baseHistory.push(
          {
            status: "Device Assessed",
            date: addHours(submittedDate, 48),
            description: "Physical assessment completed."
          },
          {
            status: "Offer Made",
            date: addHours(submittedDate, 72),
            description: `Offer of R${offeredAmount?.toLocaleString()} accepted.`
          },
          {
            status: "Awaiting Payment",
            date: addHours(submittedDate, 96),
            description: "Payment is being processed."
          }
        );
        break;
      case "paid":
        baseHistory.push(
          {
            status: "Device Assessed",
            date: addHours(submittedDate, 48),
            description: "Physical assessment completed."
          },
          {
            status: "Offer Made",
            date: addHours(submittedDate, 72),
            description: `Offer of R${offeredAmount?.toLocaleString()} accepted.`
          },
          {
            status: "Paid",
            date: addHours(submittedDate, 120),
            description: "Payment completed successfully."
          }
        );
        break;
    }

    return baseHistory;
  };

  const addHours = (dateString: string, hours: number) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + hours);
    return date.toISOString();
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "awaiting confirmation":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "assigned to agent":
        return <User className="h-5 w-5 text-blue-500" />;
      case "device assessed":
        return <Package className="h-5 w-5 text-purple-500" />;
      case "awaiting offer":
        return <DollarSign className="h-5 w-5 text-orange-500" />;
      case "offer made":
        return <DollarSign className="h-5 w-5 text-cyan-500" />;
      case "awaiting payment":
        return <CreditCard className="h-5 w-5 text-orange-600" />;
      case "paid":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "awaiting confirmation":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-green-500";
      case "assigned to agent":
        return "bg-blue-500";
      case "device assessed":
        return "bg-purple-500";
      case "awaiting offer":
        return "bg-orange-500";
      case "offer made":
        return "bg-cyan-500";
      case "awaiting payment":
        return "bg-orange-600";
      case "paid":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <Navigation />
        
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="text-center py-12">
                <LogIn className="h-16 w-16 text-lemon mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
                <p className="text-gray-300 mb-6">
                  You need to be logged in to track your transactions.
                </p>
                <Link to="/auth">
                  <Button className="bg-lemon hover:bg-lemon-dark text-black font-semibold">
                    Login to Track Orders
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              Track Your Transaction
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Enter your transaction number to see the current status
            </p>
          </div>

          {/* Search Section */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white font-poppins flex items-center gap-2">
                <Search className="h-5 w-5 text-lemon" />
                Transaction Lookup
              </CardTitle>
              <CardDescription className="text-gray-300">
                Enter your transaction number to track your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter transaction number (e.g., TXN1705123456789)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-lemon hover:bg-lemon-dark text-black font-semibold px-8"
                  disabled={isLoading || !searchTerm.trim()}
                >
                  {isLoading ? "Searching..." : "Track"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {searchResult && (
            <div className="space-y-6">
              {/* Transaction Overview */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white font-poppins">Transaction Details</CardTitle>
                    <Badge className={`${getStatusColor(searchResult.status)} text-white`}>
                      {searchResult.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-gray-400 text-sm font-medium">Transaction Number</h4>
                        <p className="text-white font-mono text-lg">{searchResult.transactionNumber}</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-sm font-medium">Device</h4>
                        <p className="text-white">{searchResult.brand} {searchResult.model}</p>
                        <p className="text-gray-300 text-sm">Condition: {searchResult.condition}</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-sm font-medium">Submitted</h4>
                        <p className="text-white">{formatDate(searchResult.submittedDate)}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-gray-400 text-sm font-medium">Estimated Value</h4>
                        <p className="text-lemon font-bold text-2xl">R{searchResult.estimatedValue?.toLocaleString()}</p>
                        {searchResult.offeredAmount && (
                          <p className="text-cyan-400 font-semibold text-lg">
                            Offered: R{searchResult.offeredAmount.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-sm font-medium">Contact Information</h4>
                        <p className="text-white text-sm">{searchResult.contactEmail}</p>
                        <p className="text-white text-sm">{searchResult.contactPhone}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Timeline */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-poppins">Status Timeline</CardTitle>
                  <CardDescription className="text-gray-300">
                    Track the progress of your device evaluation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {searchResult.statusHistory?.map((entry: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className="p-2 bg-gray-700 rounded-full">
                            {getStatusIcon(entry.status)}
                          </div>
                          {index < searchResult.statusHistory.length - 1 && (
                            <div className="w-px h-12 bg-gray-600 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-white font-medium">{entry.status}</h4>
                            <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                              {formatDate(entry.date)}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm">{entry.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-poppins">What's Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {searchResult.status === "Offer Made" && (
                      <div className="p-4 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                        <p className="text-white font-medium">Offer Received!</p>
                        <p className="text-gray-300 text-sm">
                          We've made an offer of R{searchResult.offeredAmount?.toLocaleString()} for your device. 
                          Please check your email for details and respond to accept or decline the offer.
                        </p>
                        <div className="flex gap-3 mt-3">
                          <Button className="bg-green-600 hover:bg-green-700 text-black">
                            Accept Offer
                          </Button>
                          <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-black">
                            Decline Offer
                          </Button>
                        </div>
                      </div>
                    )}
                    {searchResult.status === "Awaiting Offer" && (
                      <div className="p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                        <p className="text-white font-medium">Agent Preparing Offer</p>
                        <p className="text-gray-300 text-sm">
                          Your device has been assessed and the agent is preparing an offer. You will be contacted within 24 hours.
                        </p>
                      </div>
                    )}
                    {searchResult.status === "Device Assessed" && (
                      <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                        <p className="text-white font-medium">Assessment Complete</p>
                        <p className="text-gray-300 text-sm">
                          Your device has been assessed. You will receive an offer within 1-2 business days.
                        </p>
                      </div>
                    )}
                    {searchResult.status === "Awaiting Payment" && (
                      <div className="p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                        <p className="text-white font-medium">Payment Processing</p>
                        <p className="text-gray-300 text-sm">
                          Your payment is being processed. Funds will be transferred to your account within 24 hours.
                        </p>
                      </div>
                    )}
                    {searchResult.status === "Awaiting Confirmation" && (
                      <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                        <p className="text-white font-medium">Pending Review</p>
                        <p className="text-gray-300 text-sm">
                          Your device details are being reviewed. You'll be contacted within 24 hours for confirmation.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!searchResult && searchTerm && !isLoading && (
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="text-center py-12">
                <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No transaction found with this number.</p>
                <p className="text-gray-500 text-sm mt-2">
                  Please check your transaction number and try again.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Track;
