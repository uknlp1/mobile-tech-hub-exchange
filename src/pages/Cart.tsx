
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      toast.success("Order placed successfully!");
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
        <Navigation />
        
        <div className="py-16 px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4 font-poppins">Your Cart is Empty</h1>
            <p className="text-gray-300 mb-8">Start shopping to add items to your cart</p>
            <Link to="/buy">
              <Button className="bg-lemon hover:bg-lemon-dark text-black font-semibold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Navigation />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              Shopping Cart
            </h1>
            <p className="text-xl text-gray-300 font-inter">
              Review your items before checkout
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTIgMThoLjAxTTggMjFoOGExIDEgMCAwIDAgMS0xVjRhMSAxIDAgMCAwLTEtMUg4YTEgMSAwIDAgMC0xIDF2MTZhMSAxIDAgMCAwIDEgMXoiLz48L3N2Zz4=";
                          }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-400 text-sm">{item.condition} • {item.storage}</p>
                        <p className="text-lemon font-bold text-xl">R{item.price.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0 border-gray-600"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center bg-gray-700 border-gray-600 text-white"
                          min="1"
                        />
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 border-gray-600"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white font-poppins">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>R{getTotalPrice().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  
                  <hr className="border-gray-600" />
                  
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span className="text-lemon">R{getTotalPrice().toLocaleString()}</span>
                  </div>

                  <Button
                    className="w-full bg-lemon hover:bg-lemon-dark text-black font-semibold py-3"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                  </Button>

                  <Link to="/buy">
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
