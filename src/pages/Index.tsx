import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, DollarSign, Wrench, Shield, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-lemon/10 rounded-full mb-6">
              <Smartphone className="h-12 w-12 text-lemon" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-poppins">
              Buy & Sell
              <span className="block text-lemon">Smart Devices</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-inter">
              Your trusted marketplace for quality pre-owned smartphones and laptops. 
              Get the best deals with warranty protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/buy">
                <Button size="lg" className="bg-lemon hover:bg-lemon-dark text-black font-semibold px-8 py-4 text-lg">
                  Start Shopping
                </Button>
              </Link>
              <Link to="/sell">
                <Button size="lg" variant="outline" className="border-lemon text-lemon hover:bg-lemon hover:text-black px-8 py-4 text-lg">
                  Sell Your Device
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              Why Choose Quickbuy?
            </h2>
            <p className="text-xl text-gray-300 font-inter">
              Experience the difference with our premium service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-lemon/10 rounded-lg w-fit mb-4">
                  <Shield className="h-8 w-8 text-lemon" />
                </div>
                <CardTitle className="text-white font-poppins">Quality Guaranteed</CardTitle>
                <CardDescription className="text-gray-300">
                  Every device undergoes rigorous testing and comes with warranty protection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-lemon/10 rounded-lg w-fit mb-4">
                  <DollarSign className="h-8 w-8 text-lemon" />
                </div>
                <CardTitle className="text-white font-poppins">Best Prices</CardTitle>
                <CardDescription className="text-gray-300">
                  Competitive pricing and fair valuations for both buyers and sellers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-lemon/10 rounded-lg w-fit mb-4">
                  <Wrench className="h-8 w-8 text-lemon" />
                </div>
                <CardTitle className="text-white font-poppins">Repair Services</CardTitle>
                <CardDescription className="text-gray-300">
                  Professional repair services to keep your devices running smoothly
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-lemon/10 rounded-lg w-fit mb-4">
                  <Award className="h-8 w-8 text-lemon" />
                </div>
                <CardTitle className="text-white font-poppins">Certified Pre-owned</CardTitle>
                <CardDescription className="text-gray-300">
                  All devices are thoroughly inspected and certified by our experts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-lemon/10 rounded-lg w-fit mb-4">
                  <Users className="h-8 w-8 text-lemon" />
                </div>
                <CardTitle className="text-white font-poppins">Trusted Community</CardTitle>
                <CardDescription className="text-gray-300">
                  Join thousands of satisfied customers across South Africa
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-lemon/10 rounded-lg w-fit mb-4">
                  <Smartphone className="h-8 w-8 text-lemon" />
                </div>
                <CardTitle className="text-white font-poppins">Easy Process</CardTitle>
                <CardDescription className="text-gray-300">
                  Simple online process from evaluation to payment in just a few steps
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-lemon/10 to-lemon/5 border-lemon/20 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins text-slate-950">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 font-inter text-gray-800">
                Whether you're buying or selling, we make it simple and secure
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/buy">
                  <Button size="lg" className="bg-lemon hover:bg-lemon-dark text-black font-semibold">
                    Browse Devices
                  </Button>
                </Link>
                <Link to="/sell">
                  <Button size="lg" variant="outline" className="border-lemon hover:bg-lemon text-slate-950">
                    Sell Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;