
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Navigation />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              About Quickbuy
            </h1>
            <p className="text-xl text-gray-300 font-inter max-w-3xl mx-auto">
              Your trusted partner for buying and selling quality pre-owned devices in South Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 font-poppins">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2020, Quickbuy emerged from a simple idea: make buying and selling 
                  pre-owned electronics accessible, safe, and reliable for everyone in South Africa.
                </p>
                <p>
                  We recognized the growing need for sustainable technology consumption and created 
                  a platform that extends the lifecycle of quality devices while providing 
                  affordable options for consumers.
                </p>
                <p>
                  Today, we're proud to be one of South Africa's leading platforms for 
                  certified pre-owned smartphones and laptops, serving thousands of satisfied 
                  customers across the country.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6 font-poppins">Our Mission</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  To revolutionize the pre-owned electronics market by providing a transparent, 
                  secure, and user-friendly platform that benefits both buyers and sellers.
                </p>
                <p>
                  We believe in sustainable technology consumption and aim to reduce electronic 
                  waste while making quality devices accessible to everyone.
                </p>
                <p>
                  Our commitment to excellence drives us to continuously improve our services 
                  and maintain the highest standards of quality and customer satisfaction.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-lemon mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Quality Assured</h3>
                <p className="text-gray-300">Every device undergoes rigorous testing and certification</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-lemon mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Warranty Protection</h3>
                <p className="text-gray-300">All purchases come with warranty coverage for peace of mind</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-lemon mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Expert Support</h3>
                <p className="text-gray-300">Dedicated customer support team ready to help you</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-lemon mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Fast Processing</h3>
                <p className="text-gray-300">Quick evaluation and payment for your devices</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6 font-poppins">Why Choose Quickbuy?</h2>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Transparency</h3>
                  <p>Clear pricing, detailed device conditions, and honest assessments.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Security</h3>
                  <p>Secure transactions, data protection, and reliable payment methods.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Convenience</h3>
                  <p>Easy online process, free shipping, and doorstep collection services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
