
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Agent, Customer, Transaction } from "@/utils/storage";
import AdminStats from "./AdminStats";

interface AdminOverviewProps {
  transactions: Transaction[];
  customers: Customer[];
  agents: Agent[];
  totalRevenue: number;
}

const AdminOverview = ({ transactions, customers, agents, totalRevenue }: AdminOverviewProps) => {
  return (
    <div className="space-y-6">
      <AdminStats 
        customers={customers}
        agents={agents}
        transactions={transactions}
        totalRevenue={totalRevenue}
      />

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
    </div>
  );
};

export default AdminOverview;
