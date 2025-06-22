import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: "",
    idType: "",
    idNumber: ""
  });

  const southAfricanProvinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape"
  ];

  const idTypes = [
    "ID Number",
    "Passport Number"
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", loginData);
    
    // Store user session
    localStorage.setItem('currentUser', JSON.stringify({
      email: loginData.email,
      firstName: 'User',
      lastName: 'Name'
    }));
    
    toast.success("Login successful!");
    navigate("/account");
    window.location.reload(); // Refresh to update navigation
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    console.log("Signup attempted with:", signupData);
    
    // Store user session with address and ID information
    localStorage.setItem('currentUser', JSON.stringify({
      email: signupData.email,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      phone: signupData.phone,
      address: {
        apartment: signupData.apartment,
        city: signupData.city,
        province: signupData.province,
        postalCode: signupData.postalCode
      },
      identification: {
        type: signupData.idType,
        number: signupData.idNumber
      }
    }));
    
    toast.success("Account created successfully!");
    navigate("/account");
    window.location.reload(); // Refresh to update navigation
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  const handleProvinceChange = (value: string) => {
    setSignupData({
      ...signupData,
      province: value
    });
  };

  const handleIdTypeChange = (value: string) => {
    setSignupData({
      ...signupData,
      idType: value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3">
            <div className="p-2 bg-lemon rounded-lg">
              <Smartphone className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-white font-poppins">QuickBuy</span>
          </Link>
        </div>

        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white font-poppins">Welcome to QuickBuy</CardTitle>
            <CardDescription className="text-gray-300">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-700 mb-6">
                <TabsTrigger value="login" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-lemon data-[state=active]:text-black">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email" className="text-gray-300">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={loginData.email}
                      onChange={handleLoginInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="login-password" className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={handleLoginInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-gray-300 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-lemon hover:text-lemon-dark text-sm">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full bg-lemon hover:bg-lemon-dark text-black font-semibold">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        value={signupData.firstName}
                        onChange={handleSignupInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        value={signupData.lastName}
                        onChange={handleSignupInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={signupData.email}
                      onChange={handleSignupInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+27 82 123 4567"
                      value={signupData.phone}
                      onChange={handleSignupInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* ID Verification Fields */}
                  <div>
                    <Label htmlFor="idType" className="text-gray-300">ID Verification Type</Label>
                    <Select onValueChange={handleIdTypeChange} required>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {idTypes.map((type) => (
                          <SelectItem key={type} value={type} className="text-white hover:bg-gray-600">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="idNumber" className="text-gray-300">
                      {signupData.idType === "Passport Number" ? "Passport Number" : "ID Number"}
                    </Label>
                    <Input
                      id="idNumber"
                      name="idNumber"
                      type="text"
                      placeholder={signupData.idType === "Passport Number" ? "Enter passport number" : "Enter ID number"}
                      value={signupData.idNumber}
                      onChange={handleSignupInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* Address Fields */}
                  <div>
                    <Label htmlFor="apartment" className="text-gray-300">Apartment/Unit Number</Label>
                    <Input
                      id="apartment"
                      name="apartment"
                      type="text"
                      placeholder="Apt 4B, Unit 123"
                      value={signupData.apartment}
                      onChange={handleSignupInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-gray-300">City</Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Cape Town"
                      value={signupData.city}
                      onChange={handleSignupInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="province" className="text-gray-300">Province</Label>
                    <Select onValueChange={handleProvinceChange} required>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {southAfricanProvinces.map((province) => (
                          <SelectItem key={province} value={province} className="text-white hover:bg-gray-600">
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="postalCode" className="text-gray-300">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      placeholder="8001"
                      value={signupData.postalCode}
                      onChange={handleSignupInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={signupData.password}
                        onChange={handleSignupInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={handleSignupInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" required />
                    <label className="text-gray-300 text-sm">
                      I agree to the{" "}
                      <Link to="/terms" className="text-lemon hover:text-lemon-dark">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-lemon hover:text-lemon-dark">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-lemon hover:bg-lemon-dark text-black font-semibold">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                Are you an agent or admin?{" "}
                <Link to="/agent-login" className="text-lemon hover:text-lemon-dark font-medium">
                  Agent/Admin Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
