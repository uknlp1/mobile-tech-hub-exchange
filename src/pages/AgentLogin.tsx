
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Eye, EyeOff, Shield } from "lucide-react";

const AgentLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle agent login logic here
    console.log("Agent login attempted with:", { agentId, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
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
            <div className="mx-auto mb-4 p-3 bg-lemon/20 rounded-full w-fit">
              <Shield className="h-8 w-8 text-lemon" />
            </div>
            <CardTitle className="text-2xl text-white font-poppins">Agent Portal</CardTitle>
            <CardDescription className="text-gray-300">
              Sign in to your agent account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="agentId" className="text-gray-300">Agent ID</Label>
                <Input
                  id="agentId"
                  type="text"
                  placeholder="Enter your agent ID"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                Sign In to Agent Portal
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                Not an agent?{" "}
                <Link to="/login" className="text-lemon hover:text-lemon-dark font-medium">
                  Customer Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentLogin;
