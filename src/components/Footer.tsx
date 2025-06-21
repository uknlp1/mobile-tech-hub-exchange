import { Link } from "react-router-dom";
import { Smartphone, Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-black/90 backdrop-blur-sm border-t border-lemon/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 bg-lemon rounded-lg">
                <Smartphone className="h-6 w-6 text-black" />
              </div>
              <span className="text-white font-poppins text-2xl font-bold">Quickbuy</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your trusted partner for buying and selling quality pre-owned devices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-lemon transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-lemon transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/buy" className="text-gray-400 hover:text-lemon transition-colors">
                  Buy
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-400 hover:text-lemon transition-colors">
                  Sell
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/repairs" className="text-gray-400 hover:text-lemon transition-colors">
                  Repairs
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-gray-400 hover:text-lemon transition-colors">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-lemon transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@quickbuy.co.za</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+27 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Johannesburg, South Africa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 Quickbuy. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;