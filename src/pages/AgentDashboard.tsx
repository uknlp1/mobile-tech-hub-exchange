
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProfileManagement from "@/components/admin/ProfileManagement";
import StatsCards from "@/components/agent/StatsCards";
import TransactionCard from "@/components/agent/TransactionCard";
import { loadTransactions, updateTransactionStatus, loadFromStorage } from "@/utils/storage";
import { toast } from "sonner";

interface Transaction {
  id: string;
  transactionNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deviceInfo: string;
  deviceType: string;
  brand: string;
  model: string;
  condition: string;
  status: string;
  estimatedValue: number;
  submittedDate: string;
  deviceCondition: string;
  deviceImages?: string[];
  offeredAmount?: number;
  assessmentNotes?: string;
  address?: string;
}

const AgentDashboard = () => {
  const [assignedTransactions, setAssignedTransactions] = useState<Transaction[]>([]);
  const [currentAgent, setCurrentAgent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Load current agent
    const agent = loadFromStorage('currentAgent', null);
    setCurrentAgent(agent);
    
    // Load transactions and filter for this agent or show all for demo
    const allTransactions = loadTransactions();
    const agentTransactions = allTransactions.map(txn => ({
      ...txn,
      customerPhone: txn.customerPhone || "+27 82 111 2222",
      deviceCondition: txn.condition,
      estimatedValue: txn.estimatedValue || txn.amount || 0,
      deviceImages: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1567784177951-6fa58317e16b?w=400&h=300&fit=crop"
      ]
    }));
    
    setAssignedTransactions(agentTransactions);
  }, []);

  const handleAssessDevice = (transactionId: string) => {
    const transaction = assignedTransactions.find(t => t.id === transactionId);
    if (transaction) {
      updateTransactionStatus(transaction.transactionNumber, "Device Assessed");
      setAssignedTransactions(prev => 
        prev.map(txn => 
          txn.id === transactionId 
            ? { ...txn, status: "Device Assessed" }
            : txn
        )
      );
      toast.success("Device marked as assessed");
    }
  };

  const handleMakeOffer = (transactionId: string, amount: number, notes: string) => {
    const transaction = assignedTransactions.find(t => t.id === transactionId);
    if (transaction) {
      updateTransactionStatus(transaction.transactionNumber, "Offer Made", amount);
      setAssignedTransactions(prev => 
        prev.map(txn => 
          txn.id === transactionId 
            ? { 
                ...txn, 
                status: "Offer Made", 
                offeredAmount: amount,
                assessmentNotes: notes
              }
            : txn
        )
      );
      toast.success(`Offer of R${amount.toLocaleString()} submitted successfully`);
    }
  };

  if (!currentAgent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardContent className="p-6 text-center">
            <p className="text-white">Please log in as an agent to access the dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins flex items-center justify-center gap-3">
              <User className="h-10 w-10 text-lemon" />
              Agent Dashboard
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Welcome back, {currentAgent.name}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border-gray-700">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                <Settings className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <StatsCards transactions={assignedTransactions} />

              {/* Assigned Transactions */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white font-poppins">Assigned Assessments</h2>
                
                {assignedTransactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onAssessDevice={handleAssessDevice}
                    onMakeOffer={handleMakeOffer}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <ProfileManagement userType="agent" initialData={currentAgent} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
