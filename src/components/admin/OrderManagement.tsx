
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: string[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  shippingAddress: string;
}

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      customerName: "John Smith",
      customerEmail: "john@example.com",
      items: ["iPhone 13 Pro", "Case"],
      totalAmount: 15500,
      status: "pending",
      orderDate: "2024-01-15",
      shippingAddress: "123 Main St, Cape Town"
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      customerName: "Sarah Johnson",
      customerEmail: "sarah@example.com",
      items: ["MacBook Pro"],
      totalAmount: 25000,
      status: "processing",
      orderDate: "2024-01-14",
      shippingAddress: "456 Oak Ave, Johannesburg"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "processing": return "bg-blue-500";
      case "shipped": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "processing": return <Package className="h-4 w-4" />;
      case "shipped": return <Package className="h-4 w-4" />;
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "cancelled": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white font-poppins flex items-center gap-2">
            <Package className="h-6 w-6 text-lemon" />
            Order Management
          </CardTitle>
          <CardDescription className="text-gray-300">
            Manage customer orders and track fulfillment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-white font-medium">{order.orderNumber}</h3>
                    <p className="text-gray-400 text-sm">{order.customerName} • {order.customerEmail}</p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} text-white flex items-center gap-1`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Items</p>
                    <p className="text-white">{order.items.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Amount</p>
                    <p className="text-lemon font-bold">R{order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Order Date</p>
                    <p className="text-white">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-400 text-sm">Shipping Address</p>
                  <p className="text-white">{order.shippingAddress}</p>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-lemon text-lemon hover:bg-lemon hover:text-black"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {order.status === "pending" && (
                    <Button 
                      size="sm" 
                      onClick={() => updateOrderStatus(order.id, "processing")}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Mark Processing
                    </Button>
                  )}
                  {order.status === "processing" && (
                    <Button 
                      size="sm" 
                      onClick={() => updateOrderStatus(order.id, "shipped")}
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      Mark Shipped
                    </Button>
                  )}
                  {order.status === "shipped" && (
                    <Button 
                      size="sm" 
                      onClick={() => updateOrderStatus(order.id, "delivered")}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Mark Delivered
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
