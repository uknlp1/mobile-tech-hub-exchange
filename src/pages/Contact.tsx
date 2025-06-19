
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Get in touch with our team for any questions or support
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-poppins flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-lemon" />
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-lemon/20 rounded-lg">
                      <Phone className="h-6 w-6 text-lemon" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Phone</h4>
                      <p className="text-gray-300">+27 11 123 4567</p>
                      <p className="text-gray-300">+27 82 987 6543</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-lemon/20 rounded-lg">
                      <Mail className="h-6 w-6 text-lemon" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Email</h4>
                      <p className="text-gray-300">support@quickbuy.co.za</p>
                      <p className="text-gray-300">sales@quickbuy.co.za</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-lemon/20 rounded-lg">
                      <MapPin className="h-6 w-6 text-lemon" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Address</h4>
                      <p className="text-gray-300">
                        123 Tech Street<br />
                        Sandton, Johannesburg<br />
                        2196, South Africa
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-lemon/20 rounded-lg">
                      <Clock className="h-6 w-6 text-lemon" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Business Hours</h4>
                      <p className="text-gray-300">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-poppins">Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a href="#" className="block text-gray-300 hover:text-lemon transition-colors">
                      Frequently Asked Questions
                    </a>
                    <a href="#" className="block text-gray-300 hover:text-lemon transition-colors">
                      Warranty Information
                    </a>
                    <a href="#" className="block text-gray-300 hover:text-lemon transition-colors">
                      Return Policy
                    </a>
                    <a href="#" className="block text-gray-300 hover:text-lemon transition-colors">
                      Shipping Information
                    </a>
                    <a href="#" className="block text-gray-300 hover:text-lemon transition-colors">
                      Terms of Service
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white font-poppins">Send us a Message</CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+27 82 123 4567"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-300">Inquiry Type</Label>
                        <Select onValueChange={(value) => setFormData({...formData, inquiryType: value})}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="sales">Sales Question</SelectItem>
                            <SelectItem value="repair">Repair Service</SelectItem>
                            <SelectItem value="warranty">Warranty Claim</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Brief description of your inquiry"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-300">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please provide details about your inquiry..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto bg-lemon hover:bg-lemon-dark text-black font-semibold px-8 py-3"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Map Section */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mt-8">
                <CardHeader>
                  <CardTitle className="text-white font-poppins">Find Us</CardTitle>
                  <CardDescription className="text-gray-300">
                    Visit our store in Sandton, Johannesburg
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-lemon mx-auto mb-4" />
                      <p className="text-white font-semibold">Interactive Map</p>
                      <p className="text-gray-400 text-sm">123 Tech Street, Sandton, Johannesburg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
