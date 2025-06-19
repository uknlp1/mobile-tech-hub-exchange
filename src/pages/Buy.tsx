
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Laptop, Search, Filter, Star, Shield, Truck } from "lucide-react";
import Navigation from "@/components/Navigation";

const Buy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  // Mock data for devices
  const devices = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      brand: "Apple",
      type: "phone",
      price: 15999,
      originalPrice: 18999,
      condition: "Excellent",
      storage: "256GB",
      color: "Space Black",
      rating: 4.8,
      reviews: 24,
      image: "/placeholder.svg",
      inStock: true,
      warranty: "6 months"
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      brand: "Samsung",
      type: "phone",
      price: 12999,
      originalPrice: 15999,
      condition: "Good",
      storage: "128GB",
      color: "Phantom Black",
      rating: 4.6,
      reviews: 18,
      image: "/placeholder.svg",
      inStock: true,
      warranty: "3 months"
    },
    {
      id: 3,
      name: "MacBook Pro 13\"",
      brand: "Apple",
      type: "laptop",
      price: 22999,
      originalPrice: 28999,
      condition: "Excellent",
      storage: "512GB SSD",
      color: "Space Gray",
      rating: 4.9,
      reviews: 31,
      image: "/placeholder.svg",
      inStock: true,
      warranty: "12 months"
    },
    {
      id: 4,
      name: "Dell XPS 13",
      brand: "Dell",
      type: "laptop",
      price: 18999,
      originalPrice: 23999,
      condition: "Good",
      storage: "256GB SSD",
      color: "Silver",
      rating: 4.5,
      reviews: 15,
      image: "/placeholder.svg",
      inStock: false,
      warranty: "6 months"
    },
    {
      id: 5,
      name: "Huawei P50 Pro",
      brand: "Huawei",
      type: "phone",
      price: 8999,
      originalPrice: 12999,
      condition: "Fair",
      storage: "256GB",
      color: "Golden Black",
      rating: 4.3,
      reviews: 12,
      image: "/placeholder.svg",
      inStock: true,
      warranty: "3 months"
    },
    {
      id: 6,
      name: "HP Pavilion 15",
      brand: "HP",
      type: "laptop",
      price: 14999,
      originalPrice: 18999,
      condition: "Good",
      storage: "512GB SSD",
      color: "Silver",
      rating: 4.4,
      reviews: 20,
      image: "/placeholder.svg",
      inStock: true,
      warranty: "6 months"
    }
  ];

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || device.type === selectedCategory;
    const matchesBrand = selectedBrand === "all" || device.brand.toLowerCase() === selectedBrand;
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "under-10k" && device.price < 10000) ||
                        (priceRange === "10k-20k" && device.price >= 10000 && device.price < 20000) ||
                        (priceRange === "over-20k" && device.price >= 20000);
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              Buy Quality Devices
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Certified pre-owned phones and laptops with warranty
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search devices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white min-w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="phone">Phones</SelectItem>
                      <SelectItem value="laptop">Laptops</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white min-w-[120px]">
                      <SelectValue placeholder="Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="samsung">Samsung</SelectItem>
                      <SelectItem value="huawei">Huawei</SelectItem>
                      <SelectItem value="dell">Dell</SelectItem>
                      <SelectItem value="hp">HP</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white min-w-[140px]">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-10k">Under R10,000</SelectItem>
                      <SelectItem value="10k-20k">R10,000 - R20,000</SelectItem>
                      <SelectItem value="over-20k">Over R20,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Device Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device) => (
              <Card key={device.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300 transform hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                    {device.type === "phone" ? (
                      <Smartphone className="h-16 w-16 text-gray-400" />
                    ) : (
                      <Laptop className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  <CardTitle className="text-white font-poppins text-lg">{device.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {device.condition}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {device.storage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm ml-1">{device.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({device.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-lemon">R{device.price.toLocaleString()}</span>
                    <span className="text-gray-400 line-through text-sm">R{device.originalPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      <span>{device.warranty} warranty</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      <span>Free shipping</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-lemon hover:bg-lemon-dark text-black font-semibold"
                    disabled={!device.inStock}
                  >
                    {device.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDevices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No devices found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;
