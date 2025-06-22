
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Package, BarChart3, Settings, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";
import AgentManagement from "@/components/admin/AgentManagement";
import DeviceManagement from "@/components/admin/DeviceManagement";
import ProfileManagement from "@/components/admin/ProfileManagement";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminTransactions from "@/components/admin/AdminTransactions";
import { loadTransactions, loadCustomers, loadAgents, loadDevices, saveDevices } from "@/utils/storage";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Load data for overview
  const transactions = loadTransactions();
  const customers = loadCustomers();
  const agents = loadAgents();
  const [devices, setDevices] = useState(loadDevices());
  
  const totalRevenue = transactions.reduce((sum, txn) => sum + (txn.offeredAmount || 0), 0);

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

            <TabsContent value="overview">
              <AdminOverview 
                transactions={transactions}
                customers={customers}
                agents={agents}
                totalRevenue={totalRevenue}
              />
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

            <TabsContent value="transactions">
              <AdminTransactions transactions={transactions} />
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
