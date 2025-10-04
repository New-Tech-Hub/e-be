import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, User, Heart, X, UserPlus, LogOut, Shield, Facebook, Instagram, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/ebeth-logo.jpg";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import CartButton from "./CartButton";
import SearchBar from "./SearchBar";
import { useAuth } from "@/hooks/useAuth";
import { useSuperAdminAuth } from "@/hooks/useSuperAdminAuth";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: Category[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const { isSuperAdmin } = useSuperAdminAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSwitchToLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const handleSwitchToSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Fetch major categories (parent_id IS NULL)
      const { data: majorCategories } = await supabase
        .from('categories')
        .select('id, name, slug')
        .is('parent_id', null)
        .eq('is_active', true)
        .order('display_order')
        .order('name');
      
      if (!majorCategories) return;

      // Fetch subcategories for each major category
      const categoriesWithSubs = await Promise.all(
        majorCategories.map(async (major) => {
          const { data: subs } = await supabase
            .from('categories')
            .select('id, name, slug')
            .eq('parent_id', major.id)
            .eq('is_active', true)
            .order('display_order')
            .order('name');
          
          return {
            ...major,
            subcategories: subs || []
          };
        })
      );

      setCategories(categoriesWithSubs);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top announcement bar */}
      <div className="bg-gradient-gold py-2 text-center">
        <p className="text-sm font-medium text-black">
          Free shipping on orders over ₦150,000 • New arrivals weekly!
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <img 
              src={logo} 
              alt="Ebeth Boutique & Exclusive Store" 
              className="h-12 w-12 rounded-full object-cover"
              loading="eager"
              decoding="async"
              width="48"
              height="48"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">Ebeth Boutique</h1>
              <p className="text-xs text-muted-foreground">& Exclusive Store</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.id}>
                  {category.subcategories && category.subcategories.length > 0 ? (
                    <>
                      <NavigationMenuTrigger className="text-sm font-medium">
                        {category.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background border border-border shadow-lg">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/products/${category.slug}`}
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-muted/80 transition-colors"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  View All {category.name}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Browse all products in this category
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          {category.subcategories.map((sub) => (
                            <li key={sub.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={`/products/${sub.slug}`}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">{sub.name}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      to={`/products/${category.slug}`}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {category.name}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <SearchBar className="w-full" />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            {/* Social Media Icons - Desktop */}
            <div className="hidden md:flex items-center space-x-1 mr-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('https://www.facebook.com/ebethstores', '_blank', 'noopener,noreferrer')}
                aria-label="Visit our Facebook page"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('https://www.instagram.com/ebeth_stores/', '_blank', 'noopener,noreferrer')}
                aria-label="Visit our Instagram page"
              >
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <>
                  <Link to="/account" className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  {isSuperAdmin && (
                    <Link to="/admin">
                      <Badge variant="destructive" className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>Super Admin</span>
                      </Badge>
                    </Link>
                  )}
                  <Link to="/wishlist">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="icon" disabled={loading}>
                    <User className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" disabled={loading}>
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsLoginOpen(true)}
                    disabled={loading}
                  >
                    Login
                  </Button>
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => setIsSignupOpen(true)}
                    disabled={loading}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
            
            {/* Mobile User Icon */}
            {user ? (
              <Link to="/account">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsLoginOpen(true)}
                disabled={loading}
              >
                <User className="h-5 w-5" />
              </Button>
            )}
            
            <CartButton />
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
          <SearchBar />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="space-y-3">
              {categories.map((category) => (
                <div key={category.id}>
                  {category.subcategories && category.subcategories.length > 0 ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setMobileOpenCategory(mobileOpenCategory === category.id ? null : category.id)}
                        className="flex items-center justify-between w-full py-2 text-foreground hover:text-gold transition-smooth font-medium"
                      >
                        <span>{category.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpenCategory === category.id ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileOpenCategory === category.id && (
                        <div className="pl-4 space-y-2">
                          <Link
                            to={`/products/${category.slug}`}
                            className="block py-2 text-sm text-muted-foreground hover:text-gold transition-smooth"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            View All {category.name}
                          </Link>
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.id}
                              to={`/products/${sub.slug}`}
                              className="block py-2 text-sm text-muted-foreground hover:text-gold transition-smooth"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={`/products/${category.slug}`}
                      className="block py-2 text-foreground hover:text-gold transition-smooth font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  )}
                </div>
              ))}
              <hr className="border-border" />
              
              {/* Social Media Links - Mobile */}
              <div className="py-2">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Follow Us</p>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://www.facebook.com/ebethstores', '_blank', 'noopener,noreferrer')}
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://www.instagram.com/ebeth_stores/', '_blank', 'noopener,noreferrer')}
                    aria-label="Visit our Instagram page"
                  >
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </Button>
                </div>
              </div>
              <hr className="border-border" />
              
              {user ? (
                <>
                  <Link to="/account" className="block py-2 text-foreground hover:text-gold transition-smooth" onClick={() => setIsMenuOpen(false)}>
                    My Account
                  </Link>
                  {isSuperAdmin && (
                    <Link to="/admin" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                      <Badge variant="destructive" className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white inline-flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>Super Admin Dashboard</span>
                      </Badge>
                    </Link>
                  )}
                  <Link to="/wishlist" className="block py-2 text-foreground hover:text-gold transition-smooth" onClick={() => setIsMenuOpen(false)}>
                    Wishlist
                  </Link>
                  <Button 
                    className="w-full mt-3" 
                    variant="outline"
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    className="w-full mb-3" 
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMenuOpen(false);
                    }}
                    disabled={loading}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => {
                      setIsSignupOpen(true);
                      setIsMenuOpen(false);
                    }}
                    disabled={loading}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Auth Modals */}
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />
    </header>
  );
};

export default Header;