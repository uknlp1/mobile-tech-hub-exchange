import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Clock, User, CreditCard, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Transaction {
  id: string;
  date: string;
  description: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "completed";
  amount: number;
  paymentMethod: string;
  trackingNumber?: string;
}

const getStoredTransactions = (): Transaction[] => {
  const storedTransactions = localStorage.getItem("transactions");
  return storedTransactions ? JSON.parse(storedTransactions) : [];
};

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(getStoredTransactions());

  const handleTrack = () => {
    const foundTransaction = transactions.find((t) => t.trackingNumber === trackingNumber);

    if (foundTransaction) {
      setTransaction(foundTransaction);
      setError(null);
    } else {
      setTransaction(null);
      setError("No transaction found with that tracking number.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-lemon font-semibold">Track Your Order</div>
              <CardTitle className="block mt-1 text-2xl leading-tight font-medium text-white font-poppins">Enter Tracking Number</CardTitle>
              <CardDescription className="mt-2 text-gray-300 font-inter">Enter your tracking number to get the latest update on your order status.</CardDescription>

              <div className="mt-6">
                <Input
                  type="text"
                  placeholder="Tracking Number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Button onClick={handleTrack} className="mt-4 w-full bg-lemon hover:bg-lemon-dark text-black font-semibold">
                  <Search className="h-4 w-4 mr-2" />
                  Track
                </Button>
                {error && <p className="mt-4 text-red-500">{error}</p>}
              </div>
            </div>
          </div>
        </div>

        {transaction && (
          <div className="max-w-md mx-auto mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-lemon font-semibold">Order Status</div>
                <CardTitle className="block mt-1 text-2xl leading-tight font-medium text-white font-poppins">Order Details</CardTitle>
                <CardDescription className="mt-2 text-gray-300 font-inter">Here are the details for your order.</CardDescription>

                <div className="mt-6">
                  <div className="flex items-center text-gray-300 mb-2">
                    <Package className="h-4 w-4 mr-2" />
                    <span>Tracking Number:</span>
                    <Badge className="ml-2 bg-gray-700 border-gray-600 text-white">{transaction.trackingNumber}</Badge>
                  </div>
                  <div className="flex items-center text-gray-300 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Date:</span>
                    <span>{transaction.date}</span>
                  </div>
                  <div className="flex items-center text-gray-300 mb-2">
                    <User className="h-4 w-4 mr-2" />
                    <span>Description:</span>
                    <span>{transaction.description}</span>
                  </div>
                  <div className="flex items-center text-gray-300 mb-2">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Payment Method:</span>
                    <span>{transaction.paymentMethod}</span>
                  </div>
                  <div className="flex items-center text-gray-300 mb-2">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Status:</span>
                    <span>{transaction.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
