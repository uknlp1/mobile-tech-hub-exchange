
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Smartphone, Laptop, ArrowLeft, Wrench, Clock, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Repairs = () => {
  const repairServices = [
    {
      id: 1,
      category: "Phone Repairs",
      icon: Smartphone,
      services: [
        { name: "Screen Replacement", price: "From $89", duration: "30-60 min" },
        { name: "Battery Replacement", price: "From $49", duration: "20-30 min" },
        { name: "Camera Repair", price: "From $69", duration: "45-90 min" },
        { name: "Charging Port Repair", price: "From $59", duration: "30-45 min" }
      ]
    },
    {
      id: 2,
      category: "Laptop Repairs",
      icon: Laptop,
      services: [
        { name: "Screen Replacement", price: "From $149", duration: "2-3 hours" },
        { name: "Keyboard Replacement", price: "From $89", duration: "1-2 hours" },
        { name: "Hard Drive Upgrade", price: "From $99", duration: "1-2 hours" },
        { name: "Motherboard Repair", price: "From $199", duration: "3-5 hours" }
      ]
    }
  ];

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

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Repair Services</h1>
          <p className="text-lg text-gray-600">Professional repairs with genuine parts and warranty</p>
        </div>

        {/* Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white shadow-lg border-0 text-center">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
              <p className="text-gray-600">Most repairs completed within 24 hours</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg border-0 text-center">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Warranty Included</h3>
              <p className="text-gray-600">90-day warranty on all repairs</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg border-0 text-center">
            <CardContent className="p-6">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Technicians</h3>
              <p className="text-gray-600">Certified professionals with years of experience</p>
            </CardContent>
          </Card>
        </div>

        {/* Repair Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {repairServices.map((category) => (
            <Card key={category.id} className="bg-white shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <category.icon className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-2xl">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">{service.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Repair Request Form */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Wrench className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">Request a Repair</CardTitle>
                <CardDescription>Tell us about your device and the issue you're experiencing</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="device-type">Device Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select device type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="laptop">Laptop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="samsung">Samsung</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="dell">Dell</SelectItem>
                      <SelectItem value="hp">HP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" placeholder="e.g., iPhone 14 Pro, MacBook Air M2" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repair-type">Repair Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select repair type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="screen">Screen Replacement</SelectItem>
                      <SelectItem value="battery">Battery Replacement</SelectItem>
                      <SelectItem value="camera">Camera Repair</SelectItem>
                      <SelectItem value="charging">Charging Port Repair</SelectItem>
                      <SelectItem value="keyboard">Keyboard Replacement</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferred-date">Preferred Date</Label>
                  <Input id="preferred-date" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue-description">Issue Description</Label>
                <Textarea
                  id="issue-description"
                  placeholder="Please describe the issue with your device in detail..."
                  rows={4}
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                Submit Repair Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Repairs;
