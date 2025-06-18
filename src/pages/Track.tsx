
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  
  const mockOrders = [
    {
      id: "ORD-001",
      item: "iPhone 13 Pro",
      status: "shipped",
      date: "2024-01-15",
      tracking: "TRK123456789",
      estimatedDelivery: "2024-01-18"
    },
    {
      id: "ORD-002",
      item: "MacBook Air M2",
      status: "processing",
      date: "2024-01-16",
      tracking: "TRK987654321",
      estimatedDelivery: "2024-01-20"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing": return <Clock className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing": return "bg-yellow-500";
      case "shipped": return "bg-blue-500";
      case "delivered": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-poppins">Track Your Orders</h1>
          <p className="text-gray-300 font-inter">Enter your tracking number or view your order history</p>
        </div>

        {/* Tracking Search */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white font-poppins">Track Package</CardTitle>
            <CardDescription className="text-gray-300">Enter your tracking number to get real-time updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter tracking number..."
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1 bg-gray-700 border-gray-600 text-white"
              />
              <Button className="bg-lemon hover:bg-lemon-dark text-black">
                <Search className="h-4 w-4 mr-2" />
                Track
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white font-poppins">Recent Orders</h2>
          
          {mockOrders.map((order) => (
            <Card key={order.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white font-poppins">{order.item}</h3>
                      <Badge className={`${getStatusColor(order.status)} text-white capitalize`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">Order ID: {order.id}</p>
                    <p className="text-gray-300 text-sm">Tracking: {order.tracking}</p>
                    <p className="text-gray-300 text-sm">Order Date: {order.date}</p>
                    <p className="text-gray-300 text-sm">Est. Delivery: {order.estimatedDelivery}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="border-lemon text-lemon hover:bg-lemon hover:text-black">
                      View Details
                    </Button>
                    <Button className="bg-lemon hover:bg-lemon-dark text-black">
                      Track Package
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Track;
