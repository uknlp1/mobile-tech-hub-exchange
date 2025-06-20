
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, Package, DollarSign, Clock } from "lucide-react";
import OfferDialog from "./OfferDialog";

interface Transaction {
  id: string;
  transactionNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deviceInfo: string;
  deviceCondition: string;
  status: string;
  estimatedValue: number;
  submittedDate: string;
  deviceImages?: string[];
  offeredAmount?: number;
  assessmentNotes?: string;
}

interface TransactionCardProps {
  transaction: Transaction;
  onAssessDevice: (transactionId: string) => void;
  onMakeOffer: (transactionId: string, amount: number, notes: string) => void;
}

const TransactionCard = ({ transaction, onAssessDevice, onMakeOffer }: TransactionCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "assigned to agent":
        return "bg-purple-500";
      case "device assessed":
        return "bg-indigo-500";
      case "offer made":
        return "bg-cyan-500";
      case "awaiting offer":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "assigned to agent":
        return <User className="h-4 w-4" />;
      case "device assessed":
        return <Package className="h-4 w-4" />;
      case "offer made":
        return <DollarSign className="h-4 w-4" />;
      case "awaiting offer":
        return <Clock className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white font-poppins flex items-center gap-2">
              {getStatusIcon(transaction.status)}
              {transaction.transactionNumber}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {transaction.customerName} • {transaction.deviceInfo}
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor(transaction.status)} text-white`}>
            {transaction.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-2">Device Details</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p><strong>Device:</strong> {transaction.deviceInfo}</p>
                <p><strong>Condition:</strong> {transaction.deviceCondition}</p>
                <p><strong>Estimated Value:</strong> R{transaction.estimatedValue?.toLocaleString()}</p>
                <p><strong>Submitted:</strong> {new Date(transaction.submittedDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Customer Details</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p><strong>Name:</strong> {transaction.customerName}</p>
                <p><strong>Email:</strong> {transaction.customerEmail}</p>
                <p><strong>Phone:</strong> {transaction.customerPhone}</p>
              </div>
            </div>

            {transaction.offeredAmount && (
              <div>
                <h4 className="text-white font-medium mb-2">Offer Details</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>Offered Amount:</strong> <span className="text-green-400">R{transaction.offeredAmount.toLocaleString()}</span></p>
                  {transaction.assessmentNotes && (
                    <p><strong>Notes:</strong> {transaction.assessmentNotes}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Device Images</h4>
            <div className="grid grid-cols-2 gap-2">
              {transaction.deviceImages?.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`Device ${index + 1}`} 
                  className="w-full h-24 object-cover rounded border border-gray-600"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-600">
          {(transaction.status === "Assigned to Agent" || transaction.status === "Awaiting Offer") && (
            <>
              {transaction.status === "Assigned to Agent" && (
                <Button
                  onClick={() => onAssessDevice(transaction.id)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Assessed
                </Button>
              )}
              
              <OfferDialog
                transactionId={transaction.id}
                transactionNumber={transaction.transactionNumber}
                onMakeOffer={onMakeOffer}
              />
            </>
          )}

          {transaction.status === "Offer Made" && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Offer submitted and awaiting customer response</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
