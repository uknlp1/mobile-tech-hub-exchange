
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, CreditCard, Package, Wrench, Shield, Edit, Save, X } from "lucide-react";
import Navigation from "@/components/Navigation";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+27 82 123 4567",
    address: "123 Main Street, Cape Town, 8001"
  });

  const [editedInfo, setEditedInfo] = useState({ ...userInfo });

  const handleSave = () => {
    setUserInfo({ ...editedInfo });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo({ ...userInfo });
    setIsEditing(false);
  };

  // Mock data for orders and transactions
  const purchases = [
    {
      id: "ORD001",
      date: "2024-01-15",
      item: "iPhone 14 Pro",
      amount: 15999,
      status: "Delivered",
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD002",
      date: "2024-01-10",
      item: "MacBook Pro 13\"",
      amount: 22999,
      status: "Shipped",
      trackingNumber: "TRK987654321"
    }
  ];

  const sellTransactions = [
    {
      id: "TXN001",
      date: "2024-01-12",
      item: "Samsung Galaxy S22",
      amount: 8999,
      status: "Paid",
      transactionNumber: "TXN1705123456789"
    },
    {
      id: "TXN002",
      date: "2024-01-08",
      item: "Dell XPS 15",
      amount: 16999,
      status: "Device Assessed",
      transactionNumber: "TXN1704987654321"
    }
  ];

  const repairRequests = [
    {
      id: "REP001",
      date: "2024-01-14",
      item: "iPhone 13 Screen Repair",
      amount: 850,
      status: "Completed",
      pickupDate: "2024-01-16"
    },
    {
      id: "REP002",
      date: "2024-01-09",
      item: "MacBook Battery Replacement",
      amount: 1200,
      status: "In Progress",
      estimatedCompletion: "2024-01-20"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "completed":
      case "paid":
        return "bg-green-500";
      case "shipped":
      case "in progress":
      case "device assessed":
        return "bg-blue-500";
      case "pending":
      case "awaiting confirmation":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              My Account
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Manage your profile and track your activities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white font-poppins flex items-center gap-2">
                      <User className="h-5 w-5 text-lemon" />
                      Profile
                    </CardTitle>
                    {!isEditing ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="text-lemon hover:text-lemon-dark"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSave}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancel}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300 text-sm">Full Name</Label>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <Input
                          value={editedInfo.firstName}
                          onChange={(e) => setEditedInfo({...editedInfo, firstName: e.target.value})}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Input
                          value={editedInfo.lastName}
                          onChange={(e) => setEditedInfo({...editedInfo, lastName: e.target.value})}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    ) : (
                      <p className="text-white font-medium">{userInfo.firstName} {userInfo.lastName}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300 text-sm flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedInfo.email}
                        onChange={(e) => setEditedInfo({...editedInfo, email: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                      />
                    ) : (
                      <p className="text-white">{userInfo.email}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300 text-sm flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedInfo.phone}
                        onChange={(e) => setEditedInfo({...editedInfo, phone: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                      />
                    ) : (
                      <p className="text-white">{userInfo.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300 text-sm flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Address
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedInfo.address}
                        onChange={(e) => setEditedInfo({...editedInfo, address: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                      />
                    ) : (
                      <p className="text-white">{userInfo.address}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Section */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-poppins">Activity</CardTitle>
                  <CardDescription className="text-gray-300">
                    Track your purchases, sales, and repair requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="purchases" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                      <TabsTrigger value="purchases" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                        <Package className="h-4 w-4 mr-2" />
                        Purchases
                      </TabsTrigger>
                      <TabsTrigger value="sales" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Sales
                      </TabsTrigger>
                      <TabsTrigger value="repairs" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                        <Wrench className="h-4 w-4 mr-2" />
                        Repairs
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="purchases" className="space-y-4 mt-6">
                      {purchases.map((purchase) => (
                        <Card key={purchase.id} className="bg-gray-700/50 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">{purchase.item}</h4>
                                <p className="text-gray-400 text-sm">Order #{purchase.id} • {purchase.date}</p>
                                <p className="text-gray-400 text-sm">Tracking: {purchase.trackingNumber}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lemon font-bold">R{purchase.amount.toLocaleString()}</p>
                                <Badge className={`${getStatusColor(purchase.status)} text-white`}>
                                  {purchase.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="sales" className="space-y-4 mt-6">
                      {sellTransactions.map((transaction) => (
                        <Card key={transaction.id} className="bg-gray-700/50 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">{transaction.item}</h4>
                                <p className="text-gray-400 text-sm">Transaction #{transaction.transactionNumber}</p>
                                <p className="text-gray-400 text-sm">Submitted: {transaction.date}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lemon font-bold">R{transaction.amount.toLocaleString()}</p>
                                <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                                  {transaction.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="repairs" className="space-y-4 mt-6">
                      {repairRequests.map((repair) => (
                        <Card key={repair.id} className="bg-gray-700/50 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">{repair.item}</h4>
                                <p className="text-gray-400 text-sm">Request #{repair.id} • {repair.date}</p>
                                {repair.pickupDate && (
                                  <p className="text-gray-400 text-sm">Pickup: {repair.pickupDate}</p>
                                )}
                                {repair.estimatedCompletion && (
                                  <p className="text-gray-400 text-sm">Est. completion: {repair.estimatedCompletion}</p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="text-lemon font-bold">R{repair.amount.toLocaleString()}</p>
                                <Badge className={`${getStatusColor(repair.status)} text-white`}>
                                  {repair.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
