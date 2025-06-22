
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/utils/storage";

interface AdminTransactionsProps {
  transactions: Transaction[];
}

const AdminTransactions = ({ transactions }: AdminTransactionsProps) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default AdminTransactions;
