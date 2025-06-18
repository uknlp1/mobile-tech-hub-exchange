
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, CreditCard, ShoppingCart, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345"
  };

  const mockTransactions = [
    { id: "TXN-001", type: "purchase", item: "iPhone 13 Pro", amount: "$899", date: "2024-01-15", status: "completed" },
    { id: "TXN-002", type: "sale", item: "MacBook Air", amount: "$1,200", date: "2024-01-10", status: "completed" },
    { id: "TXN-003", type: "repair", item: "iPad Screen Repair", amount: "$150", date: "2024-01-08", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-poppins">My Account</h1>
          <p className="text-gray-300 font-inter">Manage your profile and view your activity</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
            <TabsTrigger value="profile" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
              <DollarSign className="h-4 w-4 mr-2" />
              Sales
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white font-poppins">Profile Information</CardTitle>
                <CardDescription className="text-gray-300">Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <Input
                      id="name"
                      defaultValue={mockUser.name}
                      disabled={!isEditing}
                      className="bg-gray-700 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={mockUser.email}
                      disabled={!isEditing}
                      className="bg-gray-700 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                    <Input
                      id="phone"
                      defaultValue={mockUser.phone}
                      disabled={!isEditing}
                      className="bg-gray-700 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-gray-300">Address</Label>
                    <Input
                      id="address"
                      defaultValue={mockUser.address}
                      disabled={!isEditing}
                      className="bg-gray-700 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  {isEditing ? (
                    <>
                      <Button 
                        className="bg-lemon hover:bg-lemon-dark text-black"
                        onClick={() => setIsEditing(false)}
                      >
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button 
                      className="bg-lemon hover:bg-lemon-dark text-black"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white font-poppins">Purchase History</CardTitle>
                <CardDescription className="text-gray-300">View your recent purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.filter(t => t.type === "purchase").map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">{transaction.item}</h3>
                        <p className="text-gray-300 text-sm">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lemon font-semibold">{transaction.amount}</p>
                        <p className="text-gray-300 text-sm capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="mt-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white font-poppins">Sales History</CardTitle>
                <CardDescription className="text-gray-300">Track your device sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.filter(t => t.type === "sale").map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">{transaction.item}</h3>
                        <p className="text-gray-300 text-sm">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">{transaction.amount}</p>
                        <p className="text-gray-300 text-sm capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white font-poppins">Account Settings</CardTitle>
                <CardDescription className="text-gray-300">Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-2">Notifications</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-gray-300">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Email notifications for orders</span>
                    </label>
                    <label className="flex items-center space-x-2 text-gray-300">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>SMS notifications for shipping updates</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-2">Privacy</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-gray-300">
                      <input type="checkbox" className="rounded" />
                      <span>Make profile public</span>
                    </label>
                    <label className="flex items-center space-x-2 text-gray-300">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Allow marketing emails</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
