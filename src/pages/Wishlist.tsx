import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "1",
      name: "Designer Summer Dress",
      price: 89.99,
      originalPrice: 120.00,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
      category: "Clothing",
      inStock: true
    },
    {
      id: "2",
      name: "Luxury Leather Handbag", 
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category: "Accessories",
      inStock: true
    },
    {
      id: "3",
      name: "Premium Coffee Beans",
      price: 18.99,
      originalPrice: 22.99,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
      category: "Groceries",
      inStock: false
    }
  ]);

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <>
      <Helmet>
        <title>My Wishlist - Ebeth Boutique & Exclusive Store</title>
        <meta 
          name="description" 
          content="View and manage your saved items at Ebeth Boutique. Never lose track of your favorite products." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <Heart className="h-8 w-8 text-gold" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                My Wishlist
              </h1>
              <Badge variant="secondary" className="ml-2">
                {wishlistItems.length} items
              </Badge>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Your wishlist is empty
                </h2>
                <p className="text-muted-foreground mb-6">
                  Start adding items you love to your wishlist
                </p>
                <Button asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="group overflow-hidden border-0 shadow-card hover:shadow-elegant transition-smooth">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                      />
                      
                      {item.originalPrice > item.price && (
                        <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                      
                      {!item.inStock && (
                        <Badge className="absolute top-3 right-12 bg-gray-500">
                          Out of Stock
                        </Badge>
                      )}
                      
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-smooth"
                      >
                        <X className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {item.category}
                      </Badge>
                      
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-foreground">
                            ₦{item.price.toFixed(2)}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₦{item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      
              <Button 
                className="w-full gap-2" 
                size="sm"
                disabled={!item.inStock}
                asChild={item.inStock}
              >
                {item.inStock ? (
                  <Link to={`/${item.category.toLowerCase()}`}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Link>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Out of Stock
                  </>
                )}
              </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Wishlist;