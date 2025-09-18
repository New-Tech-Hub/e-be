import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, Search, User, Heart, X, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/ebeth-logo.jpg";
import SignupModal from "./SignupModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Mock cart count
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const navigation = [
    { name: "Clothing", href: "/clothing" },
    { name: "Accessories", href: "/accessories" },
    { name: "Groceries", href: "/groceries" },
    { name: "Household", href: "/household" },
    { name: "Specials", href: "/specials" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top announcement bar */}
      <div className="bg-gradient-gold py-2 text-center">
        <p className="text-sm font-medium text-black">
          Free shipping on orders over $75 • New arrivals weekly!
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Ebeth Boutique & Exclusive Store" 
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">Ebeth Boutique</h1>
              <p className="text-xs text-muted-foreground">& Exclusive Store</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-gold transition-smooth font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search boutique & grocery items..."
                className="pl-10 bg-secondary/50 border-border focus:border-gold"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm">
                Login
              </Button>
              <Button 
                size="sm" 
                variant="default"
                onClick={() => setIsSignupOpen(true)}
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Sign Up
              </Button>
            </div>
            
            {/* Mobile User Icon */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <User className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3 border-t border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              className="pl-10 bg-secondary/50"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block py-2 text-foreground hover:text-gold transition-smooth font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-border" />
              <Button 
                className="w-full mb-3" 
                onClick={() => {
                  setIsSignupOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
              <Link to="/account" className="block py-2 text-foreground hover:text-gold transition-smooth" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/account" className="block py-2 text-foreground hover:text-gold transition-smooth" onClick={() => setIsMenuOpen(false)}>
                My Account
              </Link>
              <Link to="/wishlist" className="block py-2 text-foreground hover:text-gold transition-smooth" onClick={() => setIsMenuOpen(false)}>
                Wishlist
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
    </header>
  );
};

export default Header;