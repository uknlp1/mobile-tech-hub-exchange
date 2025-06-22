import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Package, BarChart3, Settings, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";
import AgentManagement from "@/components/admin/AgentManagement";
import DeviceManagement from "@/components/admin/DeviceManagement";
import ProfileManagement from "@/components/admin/ProfileManagement";
import { loadTransactions, loadCustomers, loadAgents, loadDevices, saveDevices } from "@/utils/storage";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Load data for overview
  const transactions = loadTransactions();
  const customers = loadCustomers();
  const agents = loadAgents();
  const [devices, setDevices] = useState(loadDevices());
  
  const totalRevenue = transactions.reduce((sum, txn) => sum + (txn.offeredAmount || 0), 0);
  const pendingTransactions = transactions.filter(txn => 
    txn.status === "Awaiting Confirmation" || txn.status === "Assigned to Agent"
  ).length;

  // Handler functions for AgentManagement
  const handleCreateAgent = (agentData: any) => {
    console.log("Creating agent:", agentData);
    // Implementation would be added here
  };

  const handleUpdateAgent = (agentId: string, updates: any) => {
    console.log("Updating agent:", agentId, updates);
    // Implementation would be added here
  };

  const handleDeleteAgent = (agentId: string) => {
    console.log("Deleting agent:", agentId);
    // Implementation would be added here
  };

  // Handler functions for DeviceManagement
  const handleAddDevice = (deviceData: any) => {
    const newDevice = {
      ...deviceData,
      id: Date.now().toString(),
      name: `${deviceData.brand} ${deviceData.model}`,
      inStock: true,
      addedDate: new Date().toLocaleDateString()
    };
    const updatedDevices = [...devices, newDevice];
    setDevices(updatedDevices);
    saveDevices(updatedDevices);
    console.log("Adding device:", newDevice);
  };

  const handleUpdateDevice = (deviceId: string, updates: any) => {
    const updatedDevices = devices.map(device => 
      device.id === deviceId 
        ? { ...device, ...updates, name: `${updates.brand || device.brand} ${updates.model || device.model}` }
        : device
    );
    setDevices(updatedDevices);
    saveDevices(updatedDevices);
    console.log("Updating device:", deviceId, updates);
  };

  const handleDeleteDevice = (deviceId: string) => {
    const updatedDevices = devices.filter(device => device.id !== deviceId);
    setDevices(updatedDevices);
    saveDevices(updatedDevices);
    console.log("Deleting device:", deviceId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins flex items-center justify-center gap-3">
              <Settings className="h-10 w-10 text-lemon" />
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Manage your QuickBuy platform
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-lemon data-[state=active]:text-black text-gray-300"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="agents" 
                className="data-[state=active]:bg-lemon data-[state=active]:text-black text-gray-300"
              >
                <Users className="h-4 w-4 mr-2" />
                Agents
              </TabsTrigger>
              <TabsTrigger 
                value="devices" 
                className="data-[state=active]:bg-lemon data-[state=active]:text-black text-gray-300"
              >
                <Package className="h-4 w-4 mr-2" />
                Devices
              </TabsTrigger>
              <TabsTrigger 
                value="transactions" 
                className="data-[state=active]:bg-lemon data-[state=active]:text-black text-gray-300"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-lemon data-[state=active]:text-black text-gray-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold text-white">{customers.length}</h3>
                    <p className="text-gray-400">Total Customers</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold text-white">{agents.length}</h3>
                    <p className="text-gray-400">Active Agents</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardContent className="p-6 text-center">
                    <Package className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold text-white">{transactions.length}</h3>
                    <p className="text-gray-400">Total Transactions</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="h-8 w-8 text-lemon mx-auto mb-2" />
                    <h3 className="text-2xl font-bold text-white">R{totalRevenue.toLocaleString()}</h3>
                    <p className="text-gray-400">Total Revenue</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-poppins">Recent Transactions</CardTitle>
                  <CardDescription className="text-gray-300">
                    Latest device submissions and assessments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{transaction.transactionNumber}</p>
                          <p className="text-gray-400 text-sm">{transaction.customerName} • {transaction.deviceInfo}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lemon font-bold">R{(transaction.offeredAmount || transaction.estimatedValue || 0).toLocaleString()}</p>
                          <p className="text-gray-400 text-sm">{transaction.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agents">
              <AgentManagement 
                agents={agents}
                onCreateAgent={handleCreateAgent}
                onUpdateAgent={handleUpdateAgent}
                onDeleteAgent={handleDeleteAgent}
              />
            </TabsContent>

            <TabsContent value="devices">
              <DeviceManagement 
                devices={devices}
                onAddDevice={handleAddDevice}
                onUpdateDevice={handleUpdateDevice}
                onDeleteDevice={handleDeleteDevice}
              />
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-poppins">All Transactions</CardTitle>
                  <CardDescription className="text-gray-300">
                    Complete transaction history and management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                        <div className="flex-1">
                          <p className="text-white font-medium">{transaction.transactionNumber}</p>
                          <p className="text-gray-400 text-sm">{transaction.customerName} • {transaction.deviceInfo}</p>
                          <p className="text-gray-500 text-xs">Submitted: {new Date(transaction.submittedDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lemon font-bold">R{(transaction.offeredAmount || transaction.estimatedValue || 0).toLocaleString()}</p>
                          <p className="text-gray-400 text-sm">{transaction.status}</p>
                          {transaction.agentName && (
                            <p className="text-gray-500 text-xs">Agent: {transaction.agentName}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <ProfileManagement userType="admin" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
