
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Smartphone, Laptop, ArrowLeft, Upload, CheckCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Sell = () => {
  const [deviceType, setDeviceType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transactionNumber, setTransactionNumber] = useState("");
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    condition: "",
    storage: "",
    color: "",
    price: "",
    description: "",
    contactEmail: "",
    contactPhone: ""
  });
  
  const { toast } = useToast();

  const phoneStorageOptions = ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB"];
  const laptopStorageOptions = ["128GB", "256GB", "512GB", "1TB", "2TB"];
  const phoneBrands = ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Huawei"];
  const laptopBrands = ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "Microsoft"];

  const generateTransactionNumber = () => {
    const prefix = deviceType === 'phone' ? 'PHN' : 'LPT';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const txnNumber = generateTransactionNumber();
    setTransactionNumber(txnNumber);
    setIsSubmitted(true);
    
    // Store transaction in localStorage for tracking
    const transaction = {
      id: txnNumber,
      deviceType,
      ...formData,
      status: "awaiting_confirmation",
      submissionDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    const existingTransactions = JSON.parse(localStorage.getItem('userTransactions') || '[]');
    localStorage.setItem('userTransactions', JSON.stringify([...existingTransactions, transaction]));
    
    console.log("Transaction created:", transaction);
    toast({
      title: "Device Listing Submitted!",
      description: `Transaction number ${txnNumber} has been generated and sent to your email.`,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <Navigation />
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-lemon mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4 font-poppins">Submission Successful!</h2>
              <p className="text-gray-300 mb-6">Your device has been submitted for evaluation.</p>
              
              <div className="bg-black/50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-lemon mb-2">Transaction Number</h3>
                <p className="text-2xl font-mono text-white bg-gray-900 rounded px-4 py-2 inline-block">
                  {transactionNumber}
                </p>
              </div>
              
              <div className="flex items-center justify-center text-gray-300 mb-6">
                <Mail className="h-5 w-5 mr-2" />
                <span>Confirmation email sent to {formData.contactEmail}</span>
              </div>
              
              <div className="space-y-4">
                <Link to="/track">
                  <Button className="w-full bg-lemon hover:bg-lemon-dark text-black">
                    Track Your Device
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full border-lemon text-lemon hover:bg-lemon hover:text-black"
                  onClick={() => {
                    setIsSubmitted(false);
                    setTransactionNumber("");
                    setFormData({
                      brand: "",
                      model: "",
                      condition: "",
                      storage: "",
                      color: "",
                      price: "",
                      description: "",
                      contactEmail: "",
                      contactPhone: ""
                    });
                    setDeviceType("");
                  }}
                >
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
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-poppins">Sell Your Device</h1>
          <p className="text-gray-300 font-inter">Get a great price for your phone or laptop</p>
        </div>

        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white font-poppins">Device Information</CardTitle>
            <CardDescription className="text-center text-gray-300">
              Tell us about your device to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Device Type Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-white">What are you selling?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      deviceType === 'phone' ? 'ring-2 ring-lemon bg-lemon/10 border-lemon' : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700/70'
                    }`}
                    onClick={() => setDeviceType('phone')}
                  >
                    <CardContent className="flex items-center justify-center p-6">
                      <div className="text-center">
                        <Smartphone className={`h-12 w-12 mx-auto mb-3 ${
                          deviceType === 'phone' ? 'text-lemon' : 'text-gray-400'
                        }`} />
                        <h3 className="font-semibold text-lg text-white">Phone</h3>
                        <p className="text-sm text-gray-300">Smartphones & Mobile Devices</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      deviceType === 'laptop' ? 'ring-2 ring-lemon bg-lemon/10 border-lemon' : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700/70'
                    }`}
                    onClick={() => setDeviceType('laptop')}
                  >
                    <CardContent className="flex items-center justify-center p-6">
                      <div className="text-center">
                        <Laptop className={`h-12 w-12 mx-auto mb-3 ${
                          deviceType === 'laptop' ? 'text-lemon' : 'text-gray-400'
                        }`} />
                        <h3 className="font-semibold text-lg text-white">Laptop</h3>
                        <p className="text-sm text-gray-300">Notebooks & Ultrabooks</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Dynamic Form Fields */}
              {deviceType && (
                <div className="space-y-6 border-t border-gray-600 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="brand" className="text-white">Brand</Label>
                      <Select onValueChange={(value) => handleInputChange('brand', value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {(deviceType === 'phone' ? phoneBrands : laptopBrands).map((brand) => (
                            <SelectItem key={brand} value={brand.toLowerCase()} className="text-white hover:bg-gray-700">{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model" className="text-white">Model</Label>
                      <Input
                        id="model"
                        placeholder={deviceType === 'phone' ? "e.g., iPhone 14 Pro" : "e.g., MacBook Pro 13"}
                        value={formData.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition" className="text-white">Condition</Label>
                      <Select onValueChange={(value) => handleInputChange('condition', value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="excellent" className="text-white hover:bg-gray-700">Excellent - Like new</SelectItem>
                          <SelectItem value="good" className="text-white hover:bg-gray-700">Good - Minor wear</SelectItem>
                          <SelectItem value="fair" className="text-white hover:bg-gray-700">Fair - Visible wear</SelectItem>
                          <SelectItem value="poor" className="text-white hover:bg-gray-700">Poor - Heavy wear</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storage" className="text-white">Storage</Label>
                      <Select onValueChange={(value) => handleInputChange('storage', value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select storage" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {(deviceType === 'phone' ? phoneStorageOptions : laptopStorageOptions).map((storage) => (
                            <SelectItem key={storage} value={storage.toLowerCase()} className="text-white hover:bg-gray-700">{storage}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="color" className="text-white">Color</Label>
                      <Input
                        id="color"
                        placeholder="e.g., Space Gray, Silver"
                        value={formData.color}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-white">Asking Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="Enter your asking price"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide additional details about your device..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Contact Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Contact Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2 text-white">Upload Photos</h3>
                    <p className="text-gray-300 mb-4">Add photos of your device to attract more buyers</p>
                    <Button type="button" variant="outline" className="border-lemon text-lemon hover:bg-lemon hover:text-black">
                      Choose Files
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-lemon hover:bg-lemon-dark text-black py-3 text-lg font-semibold"
                  >
                    Submit Device for Evaluation
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sell;
