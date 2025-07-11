import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Phone, MessageSquare, Minus } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-popup after 3 seconds on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('quickbot-visited');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        addBotMessage("Hi there! 👋 I'm Quickbot, your personal assistant. How can I help you today?");
        localStorage.setItem('quickbot-visited', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm Quickbot, your friendly assistant. I'm here to help you with anything related to Quickbuy. What would you like to know?";
    }
    if (message.includes('buy') || message.includes('purchase') || message.includes('shop')) {
      return "Great! You can browse our collection of smartphones, laptops, and accessories on our Buy page. All devices are certified pre-owned with warranty protection. Would you like me to tell you about our current deals?";
    }
    if (message.includes('sell') || message.includes('trade')) {
      return "Looking to sell your device? Awesome! Our Sell page will guide you through our simple 3-step process: evaluate your device, get an instant quote, and receive payment. We offer competitive prices for smartphones, laptops, and accessories.";
    }
    if (message.includes('repair') || message.includes('fix')) {
      return "Our expert repair services can help fix your devices! We handle smartphone repairs, laptop repairs, and general tech troubleshooting. Visit our Repairs page to book a service or get a quote.";
    }
    if (message.includes('track') || message.includes('order') || message.includes('delivery')) {
      return "You can track your order status on our Track page. Just enter your order number and we'll show you real-time updates on your purchase or repair service.";
    }
    if (message.includes('warranty') || message.includes('guarantee')) {
      return "All our devices come with warranty protection! We guarantee quality and offer repair services if anything goes wrong. Your satisfaction is our priority.";
    }
    if (message.includes('price') || message.includes('cost') || message.includes('expensive')) {
      return "We pride ourselves on competitive pricing! Our devices are significantly cheaper than buying new, while still maintaining high quality. Check out our Buy page for current prices.";
    }
    if (message.includes('contact') || message.includes('support') || message.includes('help')) {
      return "You can reach our support team through the Contact page, or continue chatting with me! I'm here 24/7 to help with any questions about Quickbuy services.";
    }
    if (message.includes('account') || message.includes('login') || message.includes('signup')) {
      return "You can create an account or login through our Auth page. Having an account lets you track orders, save favorites, and get personalized recommendations!";
    }
    if (message.includes('cart') || message.includes('checkout')) {
      return "Your cart saves all the items you're interested in! You can view and manage your cart items by clicking the cart icon in the navigation. Ready to checkout when you are!";
    }
    
    return "I'm here to help with questions about Quickbuy! You can ask me about buying devices, selling your tech, repairs, orders, pricing, or anything else related to our services. What would you like to know?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      setIsTyping(false);
      const response = getBotResponse(inputValue);
      addBotMessage(response);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Chat Preview Card */}
          <div className="mb-4 rounded-2xl shadow-xl border border-orange-200 p-4 w-64 bg-[#ffea00]">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/lovable-uploads/035b95d1-aec7-425d-841a-b471202969a3.png" 
                  alt="Support Agent" 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium text-sm">We're online!</p>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button 
                onClick={() => setIsOpen(true)} 
                className="flex-1 text-xs py-2 px-3 rounded-lg flex items-center justify-center space-x-1 text-slate-50 bg-slate-950 hover:bg-slate-800"
              >
                <Phone className="w-3 h-3" />
                <span>Talk Now</span>
              </Button>
              <Button 
                onClick={() => setIsOpen(true)} 
                className="flex-1 border border-gray-300 text-xs py-2 px-3 rounded-lg flex items-center justify-center space-x-1 text-slate-50 bg-green-500 hover:bg-green-400"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Chat Us</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 ${isMinimized ? 'h-16' : 'h-[500px]'} bg-white shadow-2xl border border-orange-200 rounded-2xl transition-all duration-300`}>
        <CardHeader className="bg-[#ffea00] p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/lovable-uploads/035b95d1-aec7-425d-841a-b471202969a3.png" 
                  alt="Support Agent" 
                  className="w-10 h-10 rounded-full object-cover" 
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-zinc-950">Quickbot</h3>
                <p className="text-sm text-green-500">We're online!</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMinimized(!isMinimized)} 
                className="text-zinc-950 hover:bg-white/20 p-1"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)} 
                className="text-zinc-950 hover:bg-white/20 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm">
                  <p>👋 Hi! I'm Quickbot.</p>
                  <p>Ask me anything about Quickbuy!</p>
                </div>
              )}
              
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isUser 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..." 
                  className="flex-1" 
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3" 
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Chatbot;
