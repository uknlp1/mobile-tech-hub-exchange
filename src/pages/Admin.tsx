import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Package, Settings, UserPlus, Plus, Edit, Trash2, Search, Shield, Upload, Image, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { 
  loadAgents, 
  saveAgents, 
  loadCustomers, 
  saveCustomers, 
  loadDevices, 
  saveDevices, 
  loadTransactions, 
  saveTransactions,
  Agent,
  Customer,
  Device,
  Transaction
} from "@/utils/storage";

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateAgentOpen, setIsCreateAgentOpen] = useState(false);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [isEditAgentOpen, setIsEditAgentOpen] = useState(false);
  const [isEditCustomerOpen, setIsEditCustomerOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Load data from storage
  const [agents, setAgents] = useState<Agent[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [devicesForSale, setDevicesForSale] = useState<Device[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Form states
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    username: "",
    password: ""
  });

  const [newDevice, setNewDevice] = useState({
    type: "",
    brand: "",
    model: "",
    condition: "",
    storage: "",
    price: "",
    originalPrice: "",
    images: [] as string[]
  });

  // Load data on component mount
  useEffect(() => {
    setAgents(loadAgents());
    setCustomers(loadCustomers());
    setDevicesForSale(loadDevices());
    setTransactions(loadTransactions());
  }, []);

  const handleCreateAgent = () => {
    const agentId = `AGT${String(agents.length + 1).padStart(3, '0')}`;
    const newAgentData: Agent = {
      ...newAgent,
      id: agentId,
      status: "Active",
      assignedDevices: 0,
      completedAssessments: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedAgents = [...agents, newAgentData];
    setAgents(updatedAgents);
    saveAgents(updatedAgents);
    
    setNewAgent({ name: "", email: "", phone: "", role: "", username: "", password: "" });
    setIsCreateAgentOpen(false);
    toast.success("Agent created successfully!");
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setNewAgent({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      role: agent.role,
      username: agent.username,
      password: agent.password
    });
    setIsEditAgentOpen(true);
  };

  const handleUpdateAgent = () => {
    if (!selectedAgent) return;
    
    const updatedAgents = agents.map(agent => 
      agent.id === selectedAgent.id 
        ? { ...selectedAgent, ...newAgent }
        : agent
    );
    
    setAgents(updatedAgents);
    saveAgents(updatedAgents);
    setIsEditAgentOpen(false);
    setSelectedAgent(null);
    setNewAgent({ name: "", email: "", phone: "", role: "", username: "", password: "" });
    toast.success("Agent updated successfully!");
  };

  const handleDeleteAgent = (agentId: string) => {
    const updatedAgents = agents.filter(agent => agent.id !== agentId);
    setAgents(updatedAgents);
    saveAgents(updatedAgents);
    toast.success("Agent deleted successfully!");
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditCustomerOpen(true);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    const updatedCustomers = customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    
    setCustomers(updatedCustomers);
    saveCustomers(updatedCustomers);
    setIsEditCustomerOpen(false);
    setSelectedCustomer(null);
    toast.success("Customer updated successfully!");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setNewDevice({
        ...newDevice,
        images: [...newDevice.images, ...imageUrls].slice(0, 3)
      });
    }
  };

  const handleAddDevice = () => {
    const deviceId = `DEV${String(devicesForSale.length + 1).padStart(3, '0')}`;
    const deviceData: Device = {
      ...newDevice,
      id: deviceId,
      name: `${newDevice.brand} ${newDevice.model}`,
      price: parseInt(newDevice.price),
      originalPrice: parseInt(newDevice.originalPrice),
      inStock: true,
      addedDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedDevices = [...devicesForSale, deviceData];
    setDevicesForSale(updatedDevices);
    saveDevices(updatedDevices);
    
    setNewDevice({ type: "", brand: "", model: "", condition: "", storage: "", price: "", originalPrice: "", images: [] });
    setIsAddDeviceOpen(false);
    toast.success("Device added successfully!");
  };

  const handleAssignAgent = (transactionId: string, agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    const updatedTransactions = transactions.map(txn => 
      txn.id === transactionId 
        ? { ...txn, agentId, agentName: agent?.name || "", status: "Assigned to Agent" }
        : txn
    );
    
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
    toast.success("Agent assigned successfully!");
  };

  const handleOfferPrice = (transactionId: string, offerAmount: number) => {
    const updatedTransactions = transactions.map(txn => 
      txn.id === transactionId 
        ? { ...txn, offeredAmount: offerAmount, status: "Offer Made" }
        : txn
    );
    
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
    toast.success("Offer made successfully!");
  };

  const updateTransactionStatus = (transactionId: string, newStatus: string) => {
    const updatedTransactions = transactions.map(txn => 
      txn.id === transactionId ? { ...txn, status: newStatus } : txn
    );
    
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
    toast.success("Status updated successfully!");
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
                        Add a new agent with login credentials
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="agent-name" className="text-gray-300">Full Name</Label>
                          <Input 
                            id="agent-name" 
                            value={newAgent.name}
                            onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="agent-email" className="text-gray-300">Email</Label>
                          <Input 
                            id="agent-email" 
                            type="email" 
                            value={newAgent.email}
                            onChange={(e) => setNewAgent({...newAgent, email: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="agent-phone" className="text-gray-300">Phone</Label>
                          <Input 
                            id="agent-phone" 
                            placeholder="+27 82 123 4567" 
                            value={newAgent.phone}
                            onChange={(e) => setNewAgent({...newAgent, phone: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white" 
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Role</Label>
                          <Select value={newAgent.role} onValueChange={(value) => setNewAgent({...newAgent, role: value})}>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Agent">Agent</SelectItem>
                              <SelectItem value="Senior Agent">Senior Agent</SelectItem>
                              <SelectItem value="Supervisor">Supervisor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="agent-username" className="text-gray-300">Username</Label>
                          <Input 
                            id="agent-username" 
                            value={newAgent.username}
                            onChange={(e) => setNewAgent({...newAgent, username: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="agent-password" className="text-gray-300">Password</Label>
                          <Input 
                            id="agent-password" 
                            type="password"
                            value={newAgent.password}
                            onChange={(e) => setNewAgent({...newAgent, password: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white" 
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={handleCreateAgent}
                        className="w-full bg-lemon hover:bg-lemon-dark text-black"
                      >
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
                        <p><strong>Username:</strong> {agent.username}</p>
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
                        <Button 
                          size="sm"
                          variant="outline"
                          className="flex-1 border-gray-600 text-gray-300"
                          onClick={() => handleEditAgent(agent)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-400 hover:bg-red-600"
                          onClick={() => handleDeleteAgent(agent.id)}
                        >
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
                  <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Device</DialogTitle>
                      <DialogDescription className="text-gray-300">
                        Add a device to the sales inventory with images
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Device Type</Label>
                          <Select value={newDevice.type} onValueChange={(value) => setNewDevice({...newDevice, type: value})}>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="phone">Phone</SelectItem>
                              <SelectItem value="laptop">Laptop</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-gray-300">Brand</Label>
                          <Input 
                            value={newDevice.brand}
                            onChange={(e) => setNewDevice({...newDevice, brand: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Model</Label>
                          <Input 
                            value={newDevice.model}
                            onChange={(e) => setNewDevice({...newDevice, model: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white" 
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Storage</Label>
                          <Input 
                            placeholder="e.g., 256GB" 
                            value={newDevice.storage}
                            onChange={(e) => setNewDevice({...newDevice, storage: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Condition</Label>
                          <Select value={newDevice.condition} onValueChange={(value) => setNewDevice({...newDevice, condition: value})}>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Excellent">Excellent</SelectItem>
                              <SelectItem value="Good">Good</SelectItem>
                              <SelectItem value="Fair">Fair</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-gray-300">Price (ZAR)</Label>
                          <Input 
                            type="number" 
                            value={newDevice.price}
                            onChange={(e) => setNewDevice({...newDevice, price: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white" 
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-300">Original Price (ZAR)</Label>
                        <Input 
                          type="number" 
                          value={newDevice.originalPrice}
                          onChange={(e) => setNewDevice({...newDevice, originalPrice: e.target.value})}
                          className="bg-gray-700 border-gray-600 text-white" 
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Device Images (up to 3)</Label>
                        <div className="space-y-2">
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          {newDevice.images.length > 0 && (
                            <div className="grid grid-cols-3 gap-2">
                              {newDevice.images.map((image, index) => (
                                <div key={index} className="relative">
                                  <img src={image} alt={`Device ${index + 1}`} className="w-full h-20 object-cover rounded" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button 
                        onClick={handleAddDevice}
                        className="w-full bg-lemon hover:bg-lemon-dark text-black"
                      >
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
                      {device.images && device.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-1">
                          {device.images.slice(0, 3).map((image, index) => (
                            <img key={index} src={image} alt={`${device.name} ${index + 1}`} className="w-full h-16 object-cover rounded" />
                          ))}
                        </div>
                      )}
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
                        <Button 
                          size="sm"
                          variant="outline"
                          className="flex-1 border-gray-600 text-gray-300"
                          onClick={() => handleEditCustomer(customer)}
                        >
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

            {/* Enhanced Tracking Status Management */}
            <TabsContent value="tracking" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white font-poppins">Transaction Management</h2>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
                        <div>
                          <h4 className="text-white font-semibold">{transaction.transactionNumber}</h4>
                          <p className="text-gray-400 text-sm">{transaction.customerName}</p>
                          <p className="text-gray-400 text-sm">{transaction.deviceInfo}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lemon font-bold text-lg">R{transaction.amount.toLocaleString()}</p>
                          {transaction.offeredAmount && (
                            <p className="text-green-400 text-sm">Offered: R{transaction.offeredAmount.toLocaleString()}</p>
                          )}
                          <p className="text-gray-400 text-sm">{transaction.submittedDate}</p>
                        </div>
                        <div className="text-center">
                          <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                            {transaction.status}
                          </Badge>
                          {transaction.agentName && (
                            <p className="text-gray-400 text-xs mt-1">Agent: {transaction.agentName}</p>
                          )}
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
                              <SelectItem value="Awaiting Offer">Awaiting Offer</SelectItem>
                              <SelectItem value="Offer Made">Offer Made</SelectItem>
                              <SelectItem value="Awaiting Payment">Awaiting Payment</SelectItem>
                              <SelectItem value="Paid">Paid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="border-blue-600 text-blue-400">
                                <Users className="h-3 w-3 mr-1" />
                                Assign
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-800 border-gray-700 text-white">
                              <DialogHeader>
                                <DialogTitle>Assign Agent</DialogTitle>
                                <DialogDescription className="text-gray-300">
                                  Assign an agent to assess this device
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Select onValueChange={(value) => handleAssignAgent(transaction.id, value)}>
                                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                    <SelectValue placeholder="Select agent" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {agents.map((agent) => (
                                      <SelectItem key={agent.id} value={agent.id}>
                                        {agent.name} ({agent.role})
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          {transaction.status === "Awaiting Offer" && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="border-green-600 text-green-400">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  Offer
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-800 border-gray-700 text-white">
                                <DialogHeader>
                                  <DialogTitle>Make Offer</DialogTitle>
                                  <DialogDescription className="text-gray-300">
                                    Enter the offered amount for this device
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-gray-300">Offer Amount (ZAR)</Label>
                                    <Input
                                      type="number"
                                      placeholder="Enter amount"
                                      className="bg-gray-700 border-gray-600 text-white"
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          const amount = parseInt((e.target as HTMLInputElement).value);
                                          handleOfferPrice(transaction.id, amount);
                                        }
                                      }}
                                    />
                                  </div>
                                  <Button
                                    onClick={() => {
                                      const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                                      const amount = parseInt(input.value);
                                      handleOfferPrice(transaction.id, amount);
                                    }}
                                    className="w-full bg-lemon hover:bg-lemon-dark text-black"
                                  >
                                    Make Offer
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Edit Agent Dialog */}
          <Dialog open={isEditAgentOpen} onOpenChange={setIsEditAgentOpen}>
            <DialogContent className="bg-gray-800 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Edit Agent</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Update agent information and credentials
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-agent-name" className="text-gray-300">Full Name</Label>
                    <Input 
                      id="edit-agent-name" 
                      value={newAgent.name}
                      onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-agent-email" className="text-gray-300">Email</Label>
                    <Input 
                      id="edit-agent-email" 
                      type="email" 
                      value={newAgent.email}
                      onChange={(e) => setNewAgent({...newAgent, email: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-agent-phone" className="text-gray-300">Phone</Label>
                    <Input 
                      id="edit-agent-phone" 
                      value={newAgent.phone}
                      onChange={(e) => setNewAgent({...newAgent, phone: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Role</Label>
                    <Select value={newAgent.role} onValueChange={(value) => setNewAgent({...newAgent, role: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Agent">Agent</SelectItem>
                        <SelectItem value="Senior Agent">Senior Agent</SelectItem>
                        <SelectItem value="Supervisor">Supervisor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-agent-username" className="text-gray-300">Username</Label>
                    <Input 
                      id="edit-agent-username" 
                      value={newAgent.username}
                      onChange={(e) => setNewAgent({...newAgent, username: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-agent-password" className="text-gray-300">Password</Label>
                    <Input 
                      id="edit-agent-password" 
                      type="password"
                      value={newAgent.password}
                      onChange={(e) => setNewAgent({...newAgent, password: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white" 
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleUpdateAgent}
                  className="w-full bg-lemon hover:bg-lemon-dark text-black"
                >
                  Update Agent
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Customer Dialog */}
          <Dialog open={isEditCustomerOpen} onOpenChange={setIsEditCustomerOpen}>
            <DialogContent className="bg-gray-800 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Update customer information
                </DialogDescription>
              </DialogHeader>
              {selectedCustomer && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Name</Label>
                    <Input 
                      value={selectedCustomer.name}
                      onChange={(e) => setSelectedCustomer({...selectedCustomer, name: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Email</Label>
                    <Input 
                      type="email"
                      value={selectedCustomer.email}
                      onChange={(e) => setSelectedCustomer({...selectedCustomer, email: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Phone</Label>
                    <Input 
                      value={selectedCustomer.phone}
                      onChange={(e) => setSelectedCustomer({...selectedCustomer, phone: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Status</Label>
                    <Select value={selectedCustomer.status} onValueChange={(value) => setSelectedCustomer({...selectedCustomer, status: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={() => handleUpdateCustomer(selectedCustomer)}
                    className="w-full bg-lemon hover:bg-lemon-dark text-black"
                  >
                    Update Customer
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Admin;
