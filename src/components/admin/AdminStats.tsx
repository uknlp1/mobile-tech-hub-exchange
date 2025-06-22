
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Package, DollarSign } from "lucide-react";
import { Agent, Customer, Transaction } from "@/utils/storage";

interface AdminStatsProps {
  customers: Customer[];
  agents: Agent[];
  transactions: Transaction[];
  totalRevenue: number;
}

const AdminStats = ({ customers, agents, transactions, totalRevenue }: AdminStatsProps) => {
  return (
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
  );
};

export default AdminStats;
