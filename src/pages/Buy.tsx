
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Laptop, ArrowLeft, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Buy = () => {
  const sampleDevices = [
    {
      id: 1,
      type: "phone",
      brand: "Apple",
      model: "iPhone 14 Pro",
      storage: "256GB",
      color: "Space Black",
      condition: "Excellent",
      price: 899,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      type: "phone",
      brand: "Samsung",
      model: "Galaxy S23 Ultra",
      storage: "512GB",
      color: "Phantom Black",
      condition: "Good",
      price: 799,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      type: "laptop",
      brand: "Apple",
      model: "MacBook Pro 13",
      storage: "512GB",
      color: "Space Gray",
      condition: "Excellent",
      price: 1299,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      type: "laptop",
      brand: "Dell",
      model: "XPS 13",
      storage: "256GB",
      color: "Silver",
      condition: "Good",
      price: 849,
      image: "/placeholder.svg"
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Buy Devices</h1>
          <p className="text-lg text-gray-600">Find the perfect device at the best price</p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white shadow-lg border-0 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search devices..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Device Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Devices</SelectItem>
                  <SelectItem value="phone">Phones</SelectItem>
                  <SelectItem value="laptop">Laptops</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="samsung">Samsung</SelectItem>
                  <SelectItem value="dell">Dell</SelectItem>
                  <SelectItem value="hp">HP</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleDevices.map((device) => (
            <Card key={device.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardHeader className="p-0">
                <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                  {device.type === 'phone' ? (
                    <Smartphone className="h-16 w-16 text-gray-400" />
                  ) : (
                    <Laptop className="h-16 w-16 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{device.brand} {device.model}</h3>
                  <p className="text-sm text-gray-600">{device.storage} • {device.color}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      device.condition === 'Excellent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {device.condition}
                    </span>
                    <span className="text-2xl font-bold text-blue-600">${device.price}</span>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buy;
