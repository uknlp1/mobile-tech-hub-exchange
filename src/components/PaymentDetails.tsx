
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Building, Shield } from "lucide-react";
import { toast } from "sonner";

const PaymentDetails = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    accountNumber: "",
    bankName: "",
    accountType: "",
    accountHolder: "",
    branchCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSavePaymentDetails = () => {
    if (paymentMethod === "bank" && (!formData.accountNumber || !formData.bankName || !formData.accountHolder)) {
      toast.error("Please fill in all required bank details");
      return;
    }
    if (paymentMethod === "card" && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      toast.error("Please fill in all required card details");
      return;
    }
    
    // Save to localStorage or send to backend
    localStorage.setItem('paymentDetails', JSON.stringify({ method: paymentMethod, ...formData }));
    toast.success("Payment details saved successfully");
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-lemon" />
          Payment Details
        </CardTitle>
        <CardDescription>
          Add your payment information for faster checkout
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="payment-method">Payment Method</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank">Bank Account</SelectItem>
              <SelectItem value="card">Credit/Debit Card</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {paymentMethod === "bank" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600 mb-4">
              <Building className="h-5 w-5" />
              <span className="font-medium">Bank Account Details</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="account-holder">Account Holder Name*</Label>
                <Input
                  id="account-holder"
                  value={formData.accountHolder}
                  onChange={(e) => handleInputChange("accountHolder", e.target.value)}
                  placeholder="Full name on account"
                />
              </div>
              <div>
                <Label htmlFor="account-number">Account Number*</Label>
                <Input
                  id="account-number"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  placeholder="Bank account number"
                />
              </div>
              <div>
                <Label htmlFor="bank-name">Bank Name*</Label>
                <Select value={formData.bankName} onValueChange={(value) => handleInputChange("bankName", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="absa">ABSA</SelectItem>
                    <SelectItem value="fnb">FNB</SelectItem>
                    <SelectItem value="standard">Standard Bank</SelectItem>
                    <SelectItem value="nedbank">Nedbank</SelectItem>
                    <SelectItem value="capitec">Capitec</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="account-type">Account Type</Label>
                <Select value={formData.accountType} onValueChange={(value) => handleInputChange("accountType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="transmission">Transmission</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="branch-code">Branch Code</Label>
                <Input
                  id="branch-code"
                  value={formData.branchCode}
                  onChange={(e) => handleInputChange("branchCode", e.target.value)}
                  placeholder="6-digit branch code"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">Card Details</span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="card-holder">Cardholder Name*</Label>
                <Input
                  id="card-holder"
                  value={formData.cardHolder}
                  onChange={(e) => handleInputChange("cardHolder", e.target.value)}
                  placeholder="Name as shown on card"
                />
              </div>
              <div>
                <Label htmlFor="card-number">Card Number*</Label>
                <Input
                  id="card-number"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry-date">Expiry Date*</Label>
                  <Input
                    id="expiry-date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV*</Label>
                  <Input
                    id="cvv"
                    type="password"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentMethod && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Shield className="h-4 w-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        )}

        <Button 
          onClick={handleSavePaymentDetails} 
          className="w-full bg-lemon text-black hover:bg-lemon/90"
          disabled={!paymentMethod}
        >
          Save Payment Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentDetails;
