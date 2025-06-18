import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Laptop, Wrench, ShoppingCart, DollarSign, Shield, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-poppins">
            Your Trusted
            <span className="text-lemon block mt-2">Tech Marketplace</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto font-inter leading-relaxed">
            Buy, sell, and repair phones and laptops with confidence. 
            Get the best deals on premium devices and professional repair services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/buy" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-lemon hover:bg-lemon-dark text-black font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Start Shopping
              </Button>
            </Link>
            <Link to="/sell" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-lemon text-lemon hover:bg-lemon hover:text-black font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105">
                <DollarSign className="mr-2 h-5 w-5" />
                Sell Your Device
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white mb-12 sm:mb-16 font-poppins">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-lemon/20 rounded-full w-fit">
                  <ShoppingCart className="h-8 w-8 text-lemon" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-semibold text-white font-poppins">Buy Devices</CardTitle>
                <CardDescription className="text-gray-300 font-inter">
                  Browse our wide selection of certified pre-owned phones and laptops
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 text-sm text-gray-400 font-inter">
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> Quality guaranteed devices</li>
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> Competitive pricing</li>
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> 30-day return policy</li>
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> Free shipping available</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-lemon/20 rounded-full w-fit">
                  <DollarSign className="h-8 w-8 text-lemon" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-semibold text-white font-poppins">Sell Devices</CardTitle>
                <CardDescription className="text-gray-300 font-inter">
                  Get instant quotes and sell your devices quickly and securely
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 text-sm text-gray-400 font-inter">
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> Instant price quotes</li>
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> Fast payment processing</li>
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> Free shipping labels</li>
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> Secure data wiping</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-lemon/20 rounded-full w-fit">
                  <Wrench className="h-8 w-8 text-lemon" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-semibold text-white font-poppins">Repair Services</CardTitle>
                <CardDescription className="text-gray-300 font-inter">
                  Professional repair services for all major phone and laptop brands
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 text-sm text-gray-400 font-inter">
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> Expert technicians</li>
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> Genuine parts only</li>
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> Quick turnaround</li>
                  <li className="flex items-center"><span className="text-lemon mr-2">•</span> Warranty included</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-lemon/20 rounded-full w-fit">
                <Shield className="h-10 w-10 text-lemon" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 font-poppins">Secure Transactions</h3>
              <p className="text-gray-400 font-inter">All transactions are encrypted and protected with industry-standard security.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-lemon/20 rounded-full w-fit">
                <Clock className="h-10 w-10 text-lemon" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 font-poppins">Fast Processing</h3>
              <p className="text-gray-400 font-inter">Quick quotes, fast repairs, and same-day shipping available.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-lemon/20 rounded-full w-fit">
                <Star className="h-10 w-10 text-lemon" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 font-poppins">5-Star Service</h3>
              <p className="text-gray-400 font-inter">Rated by thousands of satisfied customers across the country.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-lemon rounded-lg">
                  <Smartphone className="h-5 w-5 text-black" />
                </div>
                <span className="text-xl font-bold font-poppins">TechMarket</span>
              </div>
              <p className="text-gray-400 font-inter">Your trusted partner for all things tech.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 font-poppins">Services</h3>
              <ul className="space-y-2 text-gray-400 font-inter">
                <li><Link to="/buy" className="hover:text-lemon transition-colors">Buy Devices</Link></li>
                <li><Link to="/sell" className="hover:text-lemon transition-colors">Sell Devices</Link></li>
                <li><Link to="/repairs" className="hover:text-lemon transition-colors">Repairs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 font-poppins">Support</h3>
              <ul className="space-y-2 text-gray-400 font-inter">
                <li><a href="#" className="hover:text-lemon transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-lemon transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-lemon transition-colors">Warranty</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 font-poppins">Company</h3>
              <ul className="space-y-2 text-gray-400 font-inter">
                <li><a href="#" className="hover:text-lemon transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-lemon transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-lemon transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 font-inter">
            <p>&copy; 2024 TechMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
