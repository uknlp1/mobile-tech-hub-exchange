
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Package, Settings, UserPlus, Plus, Edit, Trash2, Search, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isCreateAgentOpen, setIsCreateAgentOpen] = useState(false);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  // Mock data for agents
  const [agents, setAgents] = useState([
    {
      id: "AGT001",
      name: "Sarah Mitchell",
      email: "sarah.m@quickbuy.co.za",
      phone: "+27 82 123 4567",
      role: "Senior Agent",
      status: "Active",
      assignedDevices: 12,
      completedAssessments: 45,
      joinDate: "2023-06-15"
    },
    {
      id: "AGT002",
      name: "Michael Johnson",
      email: "michael.j@quickbuy.co.za",
      phone: "+27 83 987 6543",
      role: "Agent",
      status: "Active",
      assignedDevices: 8,
      completedAssessments: 32,
      joinDate: "2023-08-22"
    },
    {
      id: "AGT003",
      name: "Priya Patel",
      email: "priya.p@quickbuy.co.za",
      phone: "+27 84 456 7890",
      role: "Agent",
      status: "Inactive",
      assignedDevices: 0,
      completedAssessments: 28,
      joinDate: "2023-04-10"
    }
  ]);

  // Mock data for devices for sale
  const [devicesForSale, setDevicesForSale] = useState([
    {
      id: "DEV001",
      name: "iPhone 14 Pro",
      brand: "Apple",
      type: "phone",
      condition: "Excellent",
      storage: "256GB",
      price: 15999,
      originalPrice: 18999,
      inStock: true,
      addedDate: "2024-01-15"
    },
    {
      id: "DEV002",
      name: "Samsung Galaxy S23",
      brand: "Samsung", 
      type: "phone",
      condition: "Good",
      storage: "128GB",
      price: 12999,
      originalPrice: 15999,
      inStock: true,
      addedDate: "2024-01-14"
    }
  ]);

  // Mock data for customers
  const [customers, setCustomers] = useState([
    {
      id: "CUST001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+27 82 111 2222",
      status: "Active",
      totalPurchases: 2,
      totalSales: 1,
      joinDate: "2023-12-01",
      lastActivity: "2024-01-15"
    },
    {
      id: "CUST002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+27 83 333 4444",
      status: "Active",
      totalPurchases: 1,
      totalSales: 3,
      joinDate: "2023-11-15",
      lastActivity: "2024-01-12"
    }
  ]);

  // Mock data for transactions with tracking status modification
  const [transactions, setTransactions] = useState([
    {
      id: "TXN001",
      transactionNumber: "TXN1705123456789",
      customerName: "John Doe",
      deviceInfo: "iPhone 13 Pro - 256GB",
      status: "Device Assessed",
      amount: 12500,
      submittedDate: "2024-01-12",
      agentId: "AGT001"
    },
    {
      id: "TXN002", 
      transactionNumber: "TXN1704987654321",
      customerName: "Jane Smith",
      deviceInfo: "MacBook Pro 13\" - 512GB",
      status: "Awaiting Payment",
      amount: 18500,
      submittedDate: "2024-01-10",
      agentId: "AGT002"
    }
  ]);

  const updateTransactionStatus = (transactionId: string, newStatus: string) => {
    setTransactions(transactions.map(txn => 
      txn.id === transactionId ? { ...txn, status: newStatus } : txn
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-red-500";
      case "awaiting confirmation":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-blue-500";
      case "assigned to agent":
        return "bg-purple-500";
      case "device assessed":
        return "bg-indigo-500";
      case "awaiting payment":
        return "bg-orange-500";
      case "paid":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins flex items-center justify-center gap-3">
              <Shield className="h-10 w-10 text-lemon" />
              Admin Portal
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Manage agents, devices, customers, and track all transactions
            </p>
          </div>

          <Tabs defaultValue="agents" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-8">
              <TabsTrigger value="agents" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                <Users className="h-4 w-4 mr-2" />
                Agents
              </TabsTrigger>
              <TabsTrigger value="devices" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                <Package className="h-4 w-4 mr-2" />
                Devices
              </TabsTrigger>
              <TabsTrigger value="customers" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                <Users className="h-4 w-4 mr-2" />
                Customers
              </TabsTrigger>
              <TabsTrigger value="tracking" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                <Settings className="h-4 w-4 mr-2" />
                Tracking
              </TabsTrigger>
            </TabsList>

            {/* Agents Management */}
            <TabsContent value="agents" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white font-poppins">Agent Management</h2>
                <Dialog open={isCreateAgentOpen} onOpenChange={setIsCreateAgentOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-lemon hover:bg-lemon-dark text-black">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create Agent
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle>Create New Agent</DialogTitle>
                      <DialogDescription className="text-gray-300">
                        Add a new agent to the system
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="agent-name" className="text-gray-300">Full Name</Label>
                        <Input id="agent-name" className="bg-gray-700 border-gray-600 text-white" />
                      </div>
                      <div>
                        <Label htmlFor="agent-email" className="text-gray-300">Email</Label>
                        <Input id="agent-email" type="email" className="bg-gray-700 border-gray-600 text-white" />
                      </div>
                      <div>
                        <Label htmlFor="agent-phone" className="text-gray-300">Phone</Label>
                        <Input id="agent-phone" placeholder="+27 82 123 4567" className="bg-gray-700 border-gray-600 text-white" />
                      </div>
                      <div>
                        <Label className="text-gray-300">Role</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="agent">Agent</SelectItem>
                            <SelectItem value="senior-agent">Senior Agent</SelectItem>
                            <SelectItem value="supervisor">Supervisor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full bg-lemon hover:bg-lemon-dark text-black">
                        Create Agent
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <Card key={agent.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white font-poppins">{agent.name}</CardTitle>
                          <CardDescription className="text-gray-300">{agent.role}</CardDescription>
                        </div>
                        <Badge className={`${getStatusColor(agent.status)} text-white`}>
                          {agent.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-gray-300">
                        <p><strong>ID:</strong> {agent.id}</p>
                        <p><strong>Email:</strong> {agent.email}</p>
                        <p><strong>Phone:</strong> {agent.phone}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-lemon font-bold text-lg">{agent.assignedDevices}</p>
                          <p className="text-gray-400 text-xs">Assigned</p>
                        </div>
                        <div>
                          <p className="text-lemon font-bold text-lg">{agent.completedAssessments}</p>
                          <p className="text-gray-400 text-xs">Completed</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-300">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Devices Management */}
            <TabsContent value="devices" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white font-poppins">Device Inventory</h2>
                <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-lemon hover:bg-lemon-dark text-black">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Device
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Device</DialogTitle>
                      <DialogDescription className="text-gray-300">
                        Add a device to the sales inventory
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-300">Device Type</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="laptop">Laptop</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Brand</Label>
                          <Input className="bg-gray-700 border-gray-600 text-white" />
                        </div>
                        <div>
                          <Label className="text-gray-300">Model</Label>
                          <Input className="bg-gray-700 border-gray-600 text-white" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Condition</Label>
                          <Select>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="excellent">Excellent</SelectItem>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="fair">Fair</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-gray-300">Storage</Label>
                          <Input placeholder="e.g., 256GB" className="bg-gray-700 border-gray-600 text-white" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Price (ZAR)</Label>
                          <Input type="number" className="bg-gray-700 border-gray-600 text-white" />
                        </div>
                        <div>
                          <Label className="text-gray-300">Original Price</Label>
                          <Input type="number" className="bg-gray-700 border-gray-600 text-white" />
                        </div>
                      </div>
                      <Button className="w-full bg-lemon hover:bg-lemon-dark text-black">
                        Add Device
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {devicesForSale.map((device) => (
                  <Card key={device.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white font-poppins">{device.name}</CardTitle>
                          <CardDescription className="text-gray-300">{device.brand} • {device.storage}</CardDescription>
                        </div>
                        <Badge className={device.inStock ? "bg-green-500" : "bg-red-500"}>
                          {device.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-lemon">R{device.price.toLocaleString()}</span>
                        <span className="text-gray-400 line-through text-sm">R{device.originalPrice.toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-gray-300">
                        <p><strong>Condition:</strong> {device.condition}</p>
                        <p><strong>Added:</strong> {device.addedDate}</p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-300">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Customers Management */}
            <TabsContent value="customers" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white font-poppins">Customer Management</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((customer) => (
                  <Card key={customer.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white font-poppins">{customer.name}</CardTitle>
                          <CardDescription className="text-gray-300">{customer.email}</CardDescription>
                        </div>
                        <Badge className={`${getStatusColor(customer.status)} text-white`}>
                          {customer.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-gray-300">
                        <p><strong>Phone:</strong> {customer.phone}</p>
                        <p><strong>Joined:</strong> {customer.joinDate}</p>
                        <p><strong>Last Activity:</strong> {customer.lastActivity}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-lemon font-bold text-lg">{customer.totalPurchases}</p>
                          <p className="text-gray-400 text-xs">Purchases</p>
                        </div>
                        <div>
                          <p className="text-lemon font-bold text-lg">{customer.totalSales}</p>
                          <p className="text-gray-400 text-xs">Sales</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-300">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tracking Status Management */}
            <TabsContent value="tracking" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white font-poppins">Transaction Status Management</h2>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                        <div>
                          <h4 className="text-white font-semibold">{transaction.transactionNumber}</h4>
                          <p className="text-gray-400 text-sm">{transaction.customerName}</p>
                          <p className="text-gray-400 text-sm">{transaction.deviceInfo}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lemon font-bold text-lg">R{transaction.amount.toLocaleString()}</p>
                          <p className="text-gray-400 text-sm">{transaction.submittedDate}</p>
                        </div>
                        <div className="flex justify-center">
                          <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <div>
                          <Select
                            value={transaction.status}
                            onValueChange={(value) => updateTransactionStatus(transaction.id, value)}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Awaiting Confirmation">Awaiting Confirmation</SelectItem>
                              <SelectItem value="Confirmed">Confirmed</SelectItem>
                              <SelectItem value="Assigned to Agent">Assigned to Agent</SelectItem>
                              <SelectItem value="Device Assessed">Device Assessed</SelectItem>
                              <SelectItem value="Awaiting Payment">Awaiting Payment</SelectItem>
                              <SelectItem value="Paid">Paid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
