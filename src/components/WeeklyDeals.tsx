import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Timer, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const WeeklyDeals = () => {
  const [likedItems, setLikedItems] = useState<string[]>([]);

  const deals = [
    {
      id: "1",
      name: "Designer Summer Dress",
      category: "Clothing",
      originalPrice: 89.99,
      salePrice: 62.99,
      discount: 30,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
      badge: "Limited Edition",
      timeLeft: "2 days left"
    },
    {
      id: "2", 
      name: "Premium Vitamin Supplements",
      category: "Health & Wellness",
      originalPrice: 45.99,
      salePrice: 29.99,
      discount: 35,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
      badge: "Health Boost",
      timeLeft: "Today only"
    },
    {
      id: "3",
      name: "Luxury Skincare Set",
      category: "Household",
      originalPrice: 156.99,
      salePrice: 109.99,
      discount: 30,
      rating: 4.9,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
      badge: "Bestseller",
      timeLeft: "3 days left"
    },
    {
      id: "4",
      name: "Artisan Coffee Beans 1kg",
      category: "Groceries", 
      originalPrice: 24.99,
      salePrice: 17.99,
      discount: 28,
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
      badge: "Premium Quality",
      timeLeft: "5 days left"
    },
    {
      id: "5",
      name: "Gold Layered Necklace Set",
      category: "Accessories",
      originalPrice: 45.99,
      salePrice: 27.99,
      discount: 39,
      rating: 4.5,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      badge: "Trending",
      timeLeft: "1 day left"
    },
    {
      id: "6",
      name: "Eco-Friendly Cleaning Kit",
      category: "Household",
      originalPrice: 32.99,
      salePrice: 19.99,
      discount: 39,
      rating: 4.4,
      reviews: 91,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop", 
      badge: "Eco-Friendly",
      timeLeft: "4 days left"
    }
  ];

  const toggleLike = (itemId: string) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Tag className="h-6 w-6 text-gold" />
            <Badge className="bg-gradient-gold text-black font-semibold px-4 py-1">
              Weekly Deals
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            This Week's Hot Deals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing discounts on our curated selection. Updated every Monday!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="group overflow-hidden border-0 shadow-card hover:shadow-elegant transition-smooth">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-destructive text-destructive-foreground text-xs font-bold">
                    -{deal.discount}%
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-gold text-black text-xs font-medium">
                    {deal.badge}
                  </Badge>
                </div>
                <button
                  onClick={() => toggleLike(deal.id)}
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-smooth"
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      likedItems.includes(deal.id) 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-gray-600'
                    }`} 
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {deal.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Timer className="h-3 w-3 text-gold" />
                    <span className="text-xs text-gold font-medium">{deal.timeLeft}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-sm text-foreground mb-2 line-clamp-2 group-hover:text-gold transition-smooth">
                  {deal.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-gold fill-gold" />
                    <span className="text-xs font-medium text-foreground ml-1">{deal.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({deal.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-foreground">${deal.salePrice}</span>
                  <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
                </div>

                {/* Add to Cart Button */}
                <Button variant="gold" size="sm" className="w-full text-xs">
                  <ShoppingCart className="mr-2 h-3 w-3" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Deals */}
        <div className="text-center mt-12">
          <Button variant="gold-outline" size="lg" asChild>
            <Link to="/specials">
              View All Weekly Deals
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WeeklyDeals;