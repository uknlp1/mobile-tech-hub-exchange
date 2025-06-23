
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard, Package, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import PaymentDetails from "@/components/PaymentDetails";
import { loadFromStorage } from "@/utils/storage";

const Account = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const currentUser = loadFromStorage('currentUser', null);
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <Navigation />
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Please Login</h1>
            <p className="text-gray-300">You need to be logged in to access your account.</p>
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
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              My Account
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Manage your profile and preferences
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border-gray-700">
              <TabsTrigger value="profile" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                <Package className="h-4 w-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="addresses" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                <MapPin className="h-4 w-4 mr-2" />
                Addresses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-gray-300">
                    Your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="text-lg">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-lg">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-lg">{user.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">ID Type</p>
                      <p className="text-lg">{user.idType || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">ID Number</p>
                      <p className="text-lg">{user.idNumber || "Not provided"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <PaymentDetails />
            </TabsContent>

            <TabsContent value="orders">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Order History</CardTitle>
                  <CardDescription className="text-gray-300">
                    View your past orders and their status
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  <p className="text-gray-400">No orders found. Start shopping to see your orders here!</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Saved Addresses</CardTitle>
                  <CardDescription className="text-gray-300">
                    Manage your shipping and billing addresses
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  <p className="text-gray-400">No saved addresses. Add an address for faster checkout!</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
