import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { Smartphone, DollarSign, Wrench, Shield, Award, Users, Laptop, Headphones, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
const Index = () => {
  const [api, setApi] = useState<CarouselApi>();

  // Auto-slide functionality
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [api]);
  const heroSlides = [{
    icon: Smartphone,
    title: "Buy & Sell",
    subtitle: "Smart Devices",
    description: "Your trusted marketplace for quality pre-owned smartphones and laptops. Get the best deals with warranty protection.",
    primaryButton: {
      text: "Start Shopping",
      link: "/buy"
    },
    secondaryButton: {
      text: "Sell Your Device",
      link: "/sell"
    }
  }, {
    icon: Laptop,
    title: "Premium",
    subtitle: "Laptops & Computers",
    description: "Discover high-performance laptops and computers at unbeatable prices. All devices certified and ready to power your productivity.",
    primaryButton: {
      text: "Browse Laptops",
      link: "/buy"
    },
    secondaryButton: {
      text: "Trade In Now",
      link: "/sell"
    }
  }, {
    icon: Headphones,
    title: "Audio & Tech",
    subtitle: "Accessories",
    description: "Complete your tech setup with premium accessories. From headphones to chargers, find everything you need in one place.",
    primaryButton: {
      text: "Shop Accessories",
      link: "/buy"
    },
    secondaryButton: {
      text: "Sell Accessories",
      link: "/sell"
    }
  }];
  const saleDevices = [{
    id: 1,
    name: "iPhone 13 Pro Max",
    originalPrice: 16999,
    salePrice: 12999,
    discount: 24,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    condition: "Excellent",
    storage: "256GB",
    rating: 4.8,
    timeLeft: "2 days"
  }, {
    id: 2,
    name: "MacBook Air M2",
    originalPrice: 24999,
    salePrice: 19999,
    discount: 20,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    condition: "Like New",
    storage: "512GB SSD",
    rating: 4.9,
    timeLeft: "1 day"
  }, {
    id: 3,
    name: "Samsung Galaxy S23 Ultra",
    originalPrice: 18999,
    salePrice: 14999,
    discount: 21,
    image: "https://images.unsplash.com/photo-1567784177951-6fa58317e16b?w=400&h=300&fit=crop",
    condition: "Excellent",
    storage: "512GB",
    rating: 4.7,
    timeLeft: "3 days"
  }, {
    id: 4,
    name: "iPad Pro 11\"",
    originalPrice: 15999,
    salePrice: 11999,
    discount: 25,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    condition: "Good",
    storage: "256GB",
    rating: 4.6,
    timeLeft: "5 hours"
  }];
  return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Navigation />
      
      {/* Hero Carousel Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {heroSlides.map((slide, index) => {
              const Icon = slide.icon;
              return <CarouselItem key={index}>
                    <div className="text-center">
                      <div className="mb-12">
                        <div className="inline-flex items-center justify-center p-3 bg-lemon/10 rounded-full mb-6">
                          <Icon className="h-12 w-12 text-lemon" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-poppins">
                          {slide.title}
                          <span className="block text-lemon">{slide.subtitle}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-inter">
                          {slide.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link to={slide.primaryButton.link}>
                            <Button size="lg" className="bg-lemon hover:bg-lemon-dark text-black font-semibold px-8 py-4 text-lg">
                              {slide.primaryButton.text}
                            </Button>
                          </Link>
                          <Link to={slide.secondaryButton.link}>
                            <Button size="lg" variant="outline" className="border-lemon hover:bg-lemon px-8 py-4 text-lg text-slate-950">
                              {slide.secondaryButton.text}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>;
            })}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </section>

      {/* Sales Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              Flash <span className="text-lemon">Sales</span>
            </h2>
            <p className="text-xl text-gray-300 font-inter">
              Limited time offers on premium devices - Don't miss out!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleDevices.map(device => <Card key={device.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-lemon/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{device.discount}% OFF
                  </div>
                </div>

                {/* Timer Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-lemon text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {device.timeLeft}
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="aspect-square bg-gray-700 rounded-lg mb-4 overflow-hidden">
                    <img src={device.image} alt={device.name} className="w-full h-full object-cover" />
                  </div>
                  <CardTitle className="text-white font-poppins text-lg">{device.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm ml-1">{device.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">• {device.condition}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-300 text-sm mb-3">{device.storage}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-lemon">R{device.salePrice.toLocaleString()}</span>
                    <span className="text-gray-400 line-through text-sm">R{device.originalPrice.toLocaleString()}</span>
                  </div>

                  <div className="text-center mb-4">
                    <p className="text-green-400 text-sm font-semibold">
                      Save R{(device.originalPrice - device.salePrice).toLocaleString()}!
                    </p>
                  </div>

                  <Link to="/buy">
                    <Button className="w-full bg-lemon hover:bg-lemon-dark text-black font-semibold">
                      Buy Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center mt-12">
            <Link to="/buy">
              <Button size="lg" variant="outline" className="border-lemon hover:bg-lemon text-zinc-950">
                View All Sales
              </Button>
            </Link>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 rounded">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-lemon/10 to-lemon/5 border-lemon/20 backdrop-blur-sm">
            <CardContent className="p-12 bg-[ffea00] bg-[#ffea00]">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins text-slate-950">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 font-inter text-gray-800">
                Whether you're buying or selling, we make it simple and secure
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/buy">
                  <Button size="lg" className="font-semibold text-slate-50 bg-black">
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