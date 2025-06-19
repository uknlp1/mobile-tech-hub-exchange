
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, DollarSign, CheckCircle, Clock, User, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";

const AgentDashboard = () => {
  const [offerAmount, setOfferAmount] = useState("");
  const [assessmentNotes, setAssessmentNotes] = useState("");

  // Mock data for agent's assigned transactions
  const [assignedTransactions, setAssignedTransactions] = useState([
    {
      id: "TXN001",
      transactionNumber: "TXN1705123456789",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      customerPhone: "+27 82 111 2222",
      deviceInfo: "iPhone 13 Pro - 256GB",
      status: "Assigned to Agent",
      estimatedValue: 12500,
      submittedDate: "2024-01-12",
      deviceCondition: "Good",
      deviceImages: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1567784177951-6fa58317e16b?w=400&h=300&fit=crop"
      ]
    },
    {
      id: "TXN003",
      transactionNumber: "TXN1705987654321",
      customerName: "Alice Brown",
      customerEmail: "alice.brown@example.com",
      customerPhone: "+27 83 555 7777",
      deviceInfo: "Samsung Galaxy S22 - 128GB",
      status: "Device Assessed",
      estimatedValue: 8500,
      submittedDate: "2024-01-13",
      deviceCondition: "Fair",
      offeredAmount: 7500,
      deviceImages: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"
      ]
    }
  ]);

  const handleAssessDevice = (transactionId: string) => {
    setAssignedTransactions(prev => 
      prev.map(txn => 
        txn.id === transactionId 
          ? { ...txn, status: "Device Assessed" }
          : txn
      )
    );
  };

  const handleMakeOffer = (transactionId: string, amount: number, notes: string) => {
    setAssignedTransactions(prev => 
      prev.map(txn => 
        txn.id === transactionId 
          ? { 
              ...txn, 
              status: "Offer Made", 
              offeredAmount: amount,
              assessmentNotes: notes
            }
          : txn
      )
    );
    setOfferAmount("");
    setAssessmentNotes("");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "assigned to agent":
        return "bg-purple-500";
      case "device assessed":
        return "bg-indigo-500";
      case "offer made":
        return "bg-cyan-500";
      case "awaiting offer":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "assigned to agent":
        return <User className="h-4 w-4" />;
      case "device assessed":
        return <Package className="h-4 w-4" />;
      case "offer made":
        return <DollarSign className="h-4 w-4" />;
      case "awaiting offer":
        return <Clock className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins flex items-center justify-center gap-3">
              <User className="h-10 w-10 text-lemon" />
              Agent Dashboard
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Manage your assigned device assessments and make offers
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-lemon mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">{assignedTransactions.length}</h3>
                <p className="text-gray-400">Assigned Devices</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">
                  {assignedTransactions.filter(t => t.status === "Device Assessed" || t.status === "Offer Made").length}
                </h3>
                <p className="text-gray-400">Assessed</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-cyan-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">
                  {assignedTransactions.filter(t => t.status === "Offer Made").length}
                </h3>
                <p className="text-gray-400">Offers Made</p>
              </CardContent>
            </Card>
          </div>

          {/* Assigned Transactions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white font-poppins">Assigned Assessments</h2>
            
            {assignedTransactions.map((transaction) => (
              <Card key={transaction.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white font-poppins flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        {transaction.transactionNumber}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        {transaction.customerName} • {transaction.deviceInfo}
                      </CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                      {transaction.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Device Information */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Device Details</h4>
                        <div className="text-sm text-gray-300 space-y-1">
                          <p><strong>Device:</strong> {transaction.deviceInfo}</p>
                          <p><strong>Condition:</strong> {transaction.deviceCondition}</p>
                          <p><strong>Estimated Value:</strong> R{transaction.estimatedValue.toLocaleString()}</p>
                          <p><strong>Submitted:</strong> {transaction.submittedDate}</p>
                        </div>
                      </div>

                      {/* Customer Information */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Customer Details</h4>
                        <div className="text-sm text-gray-300 space-y-1">
                          <p><strong>Name:</strong> {transaction.customerName}</p>
                          <p><strong>Email:</strong> {transaction.customerEmail}</p>
                          <p><strong>Phone:</strong> {transaction.customerPhone}</p>
                        </div>
                      </div>

                      {transaction.offeredAmount && (
                        <div>
                          <h4 className="text-white font-medium mb-2">Offer Details</h4>
                          <div className="text-sm text-gray-300 space-y-1">
                            <p><strong>Offered Amount:</strong> <span className="text-green-400">R{transaction.offeredAmount.toLocaleString()}</span></p>
                            {transaction.assessmentNotes && (
                              <p><strong>Notes:</strong> {transaction.assessmentNotes}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Device Images */}
                    <div>
                      <h4 className="text-white font-medium mb-2">Device Images</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {transaction.deviceImages.map((image, index) => (
                          <img 
                            key={index} 
                            src={image} 
                            alt={`Device ${index + 1}`} 
                            className="w-full h-24 object-cover rounded border border-gray-600"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-600">
                    {transaction.status === "Assigned to Agent" && (
                      <>
                        <Button
                          onClick={() => handleAssessDevice(transaction.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Assessed
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-lemon hover:bg-lemon-dark text-black">
                              <DollarSign className="h-4 w-4 mr-2" />
                              Make Offer
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 border-gray-700 text-white">
                            <DialogHeader>
                              <DialogTitle>Make Offer - {transaction.transactionNumber}</DialogTitle>
                              <DialogDescription className="text-gray-300">
                                Enter your assessed value and any notes for the customer
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label className="text-gray-300">Offer Amount (ZAR)</Label>
                                <Input
                                  type="number"
                                  placeholder="Enter offer amount"
                                  value={offerAmount}
                                  onChange={(e) => setOfferAmount(e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white"
                                />
                              </div>
                              <div>
                                <Label className="text-gray-300">Assessment Notes</Label>
                                <Textarea
                                  placeholder="Add any notes about the device condition or assessment..."
                                  value={assessmentNotes}
                                  onChange={(e) => setAssessmentNotes(e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white"
                                  rows={3}
                                />
                              </div>
                              <Button
                                onClick={() => handleMakeOffer(transaction.id, parseInt(offerAmount), assessmentNotes)}
                                className="w-full bg-lemon hover:bg-lemon-dark text-black"
                                disabled={!offerAmount}
                              >
                                Submit Offer
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}

                    {transaction.status === "Device Assessed" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-lemon hover:bg-lemon-dark text-black">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Make Offer
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-800 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle>Make Offer - {transaction.transactionNumber}</DialogTitle>
                            <DialogDescription className="text-gray-300">
                              Enter your assessed value and any notes for the customer
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-gray-300">Offer Amount (ZAR)</Label>
                              <Input
                                type="number"
                                placeholder="Enter offer amount"
                                value={offerAmount}
                                onChange={(e) => setOfferAmount(e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-gray-300">Assessment Notes</Label>
                              <Textarea
                                placeholder="Add any notes about the device condition or assessment..."
                                value={assessmentNotes}
                                onChange={(e) => setAssessmentNotes(e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white"
                                rows={3}
                              />
                            </div>
                            <Button
                              onClick={() => handleMakeOffer(transaction.id, parseInt(offerAmount), assessmentNotes)}
                              className="w-full bg-lemon hover:bg-lemon-dark text-black"
                              disabled={!offerAmount}
                            >
                              Submit Offer
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {transaction.status === "Offer Made" && (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Offer submitted and awaiting customer response</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
