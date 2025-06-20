
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign } from "lucide-react";

interface OfferDialogProps {
  transactionId: string;
  transactionNumber: string;
  onMakeOffer: (transactionId: string, amount: number, notes: string) => void;
}

const OfferDialog = ({ transactionId, transactionNumber, onMakeOffer }: OfferDialogProps) => {
  const [offerAmount, setOfferAmount] = useState("");
  const [assessmentNotes, setAssessmentNotes] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (offerAmount) {
      onMakeOffer(transactionId, parseInt(offerAmount), assessmentNotes);
      setOfferAmount("");
      setAssessmentNotes("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-lemon hover:bg-lemon-dark text-black">
          <DollarSign className="h-4 w-4 mr-2" />
          Make Offer
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Make Offer - {transactionNumber}</DialogTitle>
          <DialogDescription className="text-gray-300">
            Enter your assessed value and any notes for the customer
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-gray-300">Offer Amount (ZAR)</Label>
            <Input
              type="number"
              placeholder="Enter offer amount"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-gray-300">Assessment Notes</Label>
            <Textarea
              placeholder="Add any notes about the device condition or assessment..."
              value={assessmentNotes}
              onChange={(e) => setAssessmentNotes(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full bg-lemon hover:bg-lemon-dark text-black"
            disabled={!offerAmount}
          >
            Submit Offer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDialog;
