
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Wrench, Smartphone, Laptop, Clock, Shield, Star, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const Repairs = () => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    deviceType: "",
    brand: "",
    model: "",
    issue: "",
    description: "",
    contactName: "",
    contactPhone: "",
    contactEmail: ""
  });

  const repairServices = [
    {
      id: "screen-repair",
      name: "Screen Repair",
      description: "Cracked or damaged screen replacement",
      phonePrice: "R350 - R1,200",
      laptopPrice: "R800 - R2,500",
      duration: "2-4 hours",
      warranty: "3 months",
      icon: "🔧"
    },
    {
      id: "battery-replacement",
      name: "Battery Replacement",
      description: "Replace old or degraded battery",
      phonePrice: "R200 - R600",
      laptopPrice: "R500 - R1,500",
      duration: "1-2 hours",
      warranty: "6 months",
      icon: "🔋"
    },
    {
      id: "water-damage",
      name: "Water Damage Repair",
      description: "Complete water damage restoration",
      phonePrice: "R400 - R1,500",
      laptopPrice: "R800 - R3,000",
      duration: "1-3 days",
      warranty: "1 month",
      icon: "💧"
    },
    {
      id: "charging-port",
      name: "Charging Port Repair",
      description: "Fix charging port issues",
      phonePrice: "R250 - R450",
      laptopPrice: "R400 - R800",
      duration: "2-3 hours",
      warranty: "3 months",
      icon: "⚡"
    },
    {
      id: "software-issues",
      name: "Software Issues",
      description: "OS installation, virus removal, data recovery",
      phonePrice: "R150 - R400",
      laptopPrice: "R200 - R600",
      duration: "2-6 hours",
      warranty: "1 month",
      icon: "💾"
    },
    {
      id: "motherboard-repair",
      name: "Motherboard Repair",
      description: "Advanced motherboard diagnostics and repair",
      phonePrice: "R600 - R2,000",
      laptopPrice: "R1,000 - R4,000",
      duration: "3-7 days",
      warranty: "3 months",
      icon: "⚙️"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Repair request submitted:", { selectedService, ...formData });
    // Handle repair request submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              Professional Repair Services
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Expert technicians, genuine parts, and fast turnaround times
            </p>
          </div>

          {/* Service Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 p-3 bg-lemon/20 rounded-full w-fit">
                  <Shield className="h-8 w-8 text-lemon" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Warranty Included</h3>
                <p className="text-gray-400 text-sm">All repairs come with warranty protection</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 p-3 bg-lemon/20 rounded-full w-fit">
                  <Clock className="h-8 w-8 text-lemon" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Fast Turnaround</h3>
                <p className="text-gray-400 text-sm">Most repairs completed within 24 hours</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 p-3 bg-lemon/20 rounded-full w-fit">
                  <Star className="h-8 w-8 text-lemon" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Expert Technicians</h3>
                <p className="text-gray-400 text-sm">Certified professionals with years of experience</p>
              </CardContent>
            </Card>
          </div>

          {/* Repair Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center font-poppins">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repairServices.map((service) => (
                <Card key={service.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">{service.icon}</div>
                      <Badge variant="outline" className="border-lemon text-lemon">
                        {service.warranty} warranty
                      </Badge>
                    </div>
                    <CardTitle className="text-white font-poppins">{service.name}</CardTitle>
                    <CardDescription className="text-gray-300">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Phone:</span>
                        <span className="text-lemon font-semibold">{service.phonePrice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Laptop:</span>
                        <span className="text-lemon font-semibold">{service.laptopPrice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Duration:</span>
                        <span className="text-white text-sm">{service.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-white font-poppins flex items-center gap-2">
                <Wrench className="h-6 w-6 text-lemon" />
                Book a Repair
              </CardTitle>
              <CardDescription className="text-gray-300">
                Fill out the form below and we'll get back to you with a quote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="text-gray-300 text-base font-medium">Device Type</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.deviceType === "phone"
                          ? "border-lemon bg-lemon/10"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                      onClick={() => setFormData({...formData, deviceType: "phone"})}
                    >
                      <Smartphone className="h-8 w-8 text-lemon mx-auto mb-2" />
                      <p className="text-center text-white font-medium">Phone</p>
                    </div>
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.deviceType === "laptop"
                          ? "border-lemon bg-lemon/10"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                      onClick={() => setFormData({...formData, deviceType: "laptop"})}
                    >
                      <Laptop className="h-8 w-8 text-lemon mx-auto mb-2" />
                      <p className="text-center text-white font-medium">Laptop</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="brand" className="text-gray-300">Brand</Label>
                    <Input
                      id="brand"
                      placeholder="e.g., Apple, Samsung"
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="model" className="text-gray-300">Model</Label>
                    <Input
                      id="model"
                      placeholder="e.g., iPhone 14, MacBook Pro"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Issue Type</Label>
                  <Select onValueChange={(value) => setFormData({...formData, issue: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select the main issue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="screen">Screen Damage</SelectItem>
                      <SelectItem value="battery">Battery Issues</SelectItem>
                      <SelectItem value="charging">Charging Problems</SelectItem>
                      <SelectItem value="water">Water Damage</SelectItem>
                      <SelectItem value="software">Software Issues</SelectItem>
                      <SelectItem value="hardware">Hardware Problems</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-300">Problem Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="contactName" className="text-gray-300">Full Name</Label>
                    <Input
                      id="contactName"
                      placeholder="Your full name"
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPhone" className="text-gray-300">Phone Number</Label>
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
                    <Label htmlFor="contactEmail" className="text-gray-300">Email</Label>
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
                    disabled={!formData.deviceType}
                  >
                    Request Repair Quote
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

export default Repairs;
