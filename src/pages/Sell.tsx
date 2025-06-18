
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Smartphone, Laptop, ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Sell = () => {
  const [deviceType, setDeviceType] = useState("");
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { deviceType, ...formData });
    toast({
      title: "Listing Submitted!",
      description: "We'll review your device listing and get back to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Smartphone className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TechMarket</span>
            </Link>
            <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sell Your Device</h1>
          <p className="text-lg text-gray-600">Get a great price for your phone or laptop</p>
        </div>

        <Card className="bg-white shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Device Information</CardTitle>
            <CardDescription className="text-center">
              Tell us about your device to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Device Type Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">What are you selling?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      deviceType === 'phone' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setDeviceType('phone')}
                  >
                    <CardContent className="flex items-center justify-center p-6">
                      <div className="text-center">
                        <Smartphone className={`h-12 w-12 mx-auto mb-3 ${
                          deviceType === 'phone' ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <h3 className="font-semibold text-lg">Phone</h3>
                        <p className="text-sm text-gray-600">Smartphones & Mobile Devices</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      deviceType === 'laptop' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setDeviceType('laptop')}
                  >
                    <CardContent className="flex items-center justify-center p-6">
                      <div className="text-center">
                        <Laptop className={`h-12 w-12 mx-auto mb-3 ${
                          deviceType === 'laptop' ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <h3 className="font-semibold text-lg">Laptop</h3>
                        <p className="text-sm text-gray-600">Notebooks & Ultrabooks</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Dynamic Form Fields */}
              {deviceType && (
                <div className="space-y-6 border-t pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Select onValueChange={(value) => handleInputChange('brand', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {(deviceType === 'phone' ? phoneBrands : laptopBrands).map((brand) => (
                            <SelectItem key={brand} value={brand.toLowerCase()}>{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input
                        id="model"
                        placeholder={deviceType === 'phone' ? "e.g., iPhone 14 Pro" : "e.g., MacBook Pro 13"}
                        value={formData.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select onValueChange={(value) => handleInputChange('condition', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="excellent">Excellent - Like new</SelectItem>
                          <SelectItem value="good">Good - Minor wear</SelectItem>
                          <SelectItem value="fair">Fair - Visible wear</SelectItem>
                          <SelectItem value="poor">Poor - Heavy wear</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storage">Storage</Label>
                      <Select onValueChange={(value) => handleInputChange('storage', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {(deviceType === 'phone' ? phoneStorageOptions : laptopStorageOptions).map((storage) => (
                            <SelectItem key={storage} value={storage.toLowerCase()}>{storage}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        placeholder="e.g., Space Gray, Silver"
                        value={formData.color}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Asking Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="Enter your asking price"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide additional details about your device..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Contact Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Contact Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Upload Photos</h3>
                    <p className="text-gray-600 mb-4">Add photos of your device to attract more buyers</p>
                    <Button type="button" variant="outline">
                      Choose Files
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  >
                    Submit Listing
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
