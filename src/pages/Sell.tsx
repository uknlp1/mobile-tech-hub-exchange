
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Smartphone, Laptop, Upload, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Sell = () => {
  const [deviceType, setDeviceType] = useState("");
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    condition: "",
    storage: "",
    color: "",
    accessories: "",
    description: "",
    contactPhone: "",
    contactEmail: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transactionNumber, setTransactionNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate transaction number
    const txnNumber = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
    setTransactionNumber(txnNumber);
    
    // Create transaction record
    const transaction = {
      transactionNumber: txnNumber,
      deviceType,
      brand: formData.brand,
      model: formData.model,
      condition: formData.condition,
      status: "Awaiting Confirmation",
      submittedDate: new Date().toISOString(),
      contactPhone: formData.contactPhone,
      contactEmail: formData.contactEmail,
      estimatedValue: Math.floor(Math.random() * 15000) + 2000, // Random value between R2000-R17000
      statusHistory: [
        {
          status: "Awaiting Confirmation",
          date: new Date().toISOString(),
          description: "Device details submitted for review"
        }
      ]
    };
    
    // Store in localStorage (in real app, this would be sent to backend)
    const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    existingTransactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(existingTransactions));
    
    setIsSubmitted(true);
    
    // Simulate email sending
    console.log(`Transaction ${txnNumber} created and confirmation sent to ${formData.contactEmail}`);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <Card className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-4 bg-green-500/20 rounded-full w-fit">
                <CheckCircle className="h-12 w-12 text-green-400" />
              </div>
              <CardTitle className="text-2xl text-white font-poppins">Submission Successful!</CardTitle>
              <CardDescription className="text-gray-300">
                Your device has been submitted for evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Transaction Number</p>
                <p className="text-lg font-bold text-lemon font-mono">{transactionNumber}</p>
              </div>
              <p className="text-sm text-gray-400">
                A confirmation email has been sent to your email address with your transaction details.
                You can track your device's progress using the transaction number above.
              </p>
              <div className="flex flex-col gap-3 pt-4">
                <Link to="/track">
                  <Button className="w-full bg-lemon hover:bg-lemon-dark text-black">
                    Track Your Device
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  Submit Another Device
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              Sell Your Device
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Get an instant quote for your phone or laptop
            </p>
          </div>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white font-poppins">Device Details</CardTitle>
              <CardDescription className="text-gray-300">
                Provide accurate information to get the best quote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="text-gray-300 text-base font-medium">Device Type</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        deviceType === "phone"
                          ? "border-lemon bg-lemon/10"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                      onClick={() => setDeviceType("phone")}
                    >
                      <Smartphone className="h-8 w-8 text-lemon mx-auto mb-2" />
                      <p className="text-center text-white font-medium">Phone</p>
                    </div>
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        deviceType === "laptop"
                          ? "border-lemon bg-lemon/10"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                      onClick={() => setDeviceType("laptop")}
                    >
                      <Laptop className="h-8 w-8 text-lemon mx-auto mb-2" />
                      <p className="text-center text-white font-medium">Laptop</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="brand" className="text-gray-300">Brand</Label>
                    <Select onValueChange={(value) => setFormData({...formData, brand: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {deviceType === "phone" ? (
                          <>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="samsung">Samsung</SelectItem>
                            <SelectItem value="huawei">Huawei</SelectItem>
                            <SelectItem value="xiaomi">Xiaomi</SelectItem>
                            <SelectItem value="oppo">Oppo</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="dell">Dell</SelectItem>
                            <SelectItem value="hp">HP</SelectItem>
                            <SelectItem value="lenovo">Lenovo</SelectItem>
                            <SelectItem value="asus">Asus</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="model" className="text-gray-300">Model</Label>
                    <Input
                      id="model"
                      placeholder="e.g., iPhone 14 Pro"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Condition</Label>
                    <Select onValueChange={(value) => setFormData({...formData, condition: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent - Like new</SelectItem>
                        <SelectItem value="good">Good - Minor wear</SelectItem>
                        <SelectItem value="fair">Fair - Visible wear</SelectItem>
                        <SelectItem value="poor">Poor - Significant damage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300">Storage</Label>
                    <Select onValueChange={(value) => setFormData({...formData, storage: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select storage" />
                      </SelectTrigger>
                      <SelectContent>
                        {deviceType === "phone" ? (
                          <>
                            <SelectItem value="64gb">64GB</SelectItem>
                            <SelectItem value="128gb">128GB</SelectItem>
                            <SelectItem value="256gb">256GB</SelectItem>
                            <SelectItem value="512gb">512GB</SelectItem>
                            <SelectItem value="1tb">1TB</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="256gb">256GB SSD</SelectItem>
                            <SelectItem value="512gb">512GB SSD</SelectItem>
                            <SelectItem value="1tb">1TB SSD</SelectItem>
                            <SelectItem value="2tb">2TB SSD</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-300">Additional Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe any issues, accessories included, or other relevant details..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactPhone" className="text-gray-300">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="+27 82 123 4567"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail" className="text-gray-300">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-lemon hover:bg-lemon-dark text-black font-semibold py-3 text-lg"
                    disabled={!deviceType}
                  >
                    Get Instant Quote
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sell;
