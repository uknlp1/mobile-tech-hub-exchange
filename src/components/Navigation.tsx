
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Menu, 
  X, 
  ShoppingCart, 
  DollarSign, 
  Wrench, 
  FileText, 
  User,
  LogOut
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
      const userData = JSON.parse(loggedInUser);
      setUserEmail(userData.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setUserEmail("");
    navigate('/');
  };

  const navItems = [
    { name: "Buy", path: "/buy", icon: ShoppingCart },
    { name: "Sell", path: "/sell", icon: DollarSign },
    { name: "Repairs", path: "/repairs", icon: Wrench },
    { name: "Track Orders", path: "/track", icon: FileText },
  ];

  // Only show Account if user is logged in
  if (isLoggedIn) {
    navItems.push({ name: "Account", path: "/account", icon: User });
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-black/90 backdrop-blur-sm shadow-lg border-b border-lemon/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-lemon rounded-lg">
              <Smartphone className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-white font-poppins">QuickBuy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 font-medium ${
                    isActive(item.path)
                      ? "bg-lemon text-black"
                      : "text-gray-300 hover:text-lemon hover:bg-lemon/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn && (
              <Link to="/agent-login">
                <Button variant="ghost" className="text-gray-300 hover:text-lemon hover:bg-lemon/10">
                  Agent Login
                </Button>
              </Link>
            )}
            
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-lemon text-lemon hover:bg-lemon hover:text-black">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-lemon hover:bg-lemon-dark text-black">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">{userEmail}</span>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="border-lemon text-lemon hover:bg-lemon hover:text-black"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-lemon transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-lemon text-black"
                        : "text-gray-300 hover:text-lemon hover:bg-lemon/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                {!isLoggedIn && (
                  <Link to="/agent-login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-gray-300 hover:text-lemon hover:bg-lemon/10">
                      Agent Login
                    </Button>
                  </Link>
                )}
                
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-lemon text-lemon hover:bg-lemon hover:text-black">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-lemon hover:bg-lemon-dark text-black">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-300 text-sm px-3">{userEmail}</p>
                    <Button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      variant="outline" 
                      className="w-full border-lemon text-lemon hover:bg-lemon hover:text-black"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
