
import { Card, CardContent } from "@/components/ui/card";
import { Package, CheckCircle, DollarSign } from "lucide-react";

interface Transaction {
  id: string;
  status: string;
}

interface StatsCardsProps {
  transactions: Transaction[];
}

const StatsCards = ({ transactions }: StatsCardsProps) => {
  const assessedCount = transactions.filter(t => 
    t.status === "Device Assessed" || t.status === "Offer Made"
  ).length;
  
  const offersCount = transactions.filter(t => 
    t.status === "Offer Made"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardContent className="p-6 text-center">
          <Package className="h-8 w-8 text-lemon mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">{transactions.length}</h3>
          <p className="text-gray-400">Assigned Devices</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">{assessedCount}</h3>
          <p className="text-gray-400">Assessed</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardContent className="p-6 text-center">
          <DollarSign className="h-8 w-8 text-cyan-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">{offersCount}</h3>
          <p className="text-gray-400">Offers Made</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
