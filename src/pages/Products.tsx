import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Filter } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

const Products = () => {
  const { category } = useParams();
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const { addToCart } = useCart();

  // Demo products data - inspired by hero section categories
  const getProductsByCategory = (cat: string) => {
    const productData = {
      clothing: [
        {
          id: "1",
          name: "Premium Business Suit - Charcoal Grey",
          price: 45999.99,
          originalPrice: 52999.99,
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 189,
          category: "Men's Formal Wear"
        },
        {
          id: "2", 
          name: "Executive Dress Shirt - Egyptian Cotton",
          price: 8999.99,
          originalPrice: 12999.99,
          image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 267,
          category: "Men's Shirts"
        },
        {
          id: "3",
          name: "Elegant Cocktail Dress - Black",
          price: 15999.99,
          originalPrice: 22999.99,
          image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 198,
          category: "Women's Formal"
        },
        {
          id: "4",
          name: "Professional Blazer - Navy Blue",
          price: 25999.99,
          originalPrice: 32999.99,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 145,
          category: "Women's Business"
        },
        {
          id: "5",
          name: "Silk Tie Collection - 3 Pack",
          price: 7999.99,
          originalPrice: 11999.99,
          image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 321,
          category: "Men's Accessories"
        },
        {
          id: "6",
          name: "Italian Leather Dress Shoes",
          price: 18999.99,
          originalPrice: 25999.99,
          image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 278,
          category: "Men's Shoes"
        },
        {
          id: "7",
          name: "Designer High Heels - Patent Leather",
          price: 12999.99,
          originalPrice: 17999.99,
          image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
          rating: 4.5,
          reviews: 156,
          category: "Women's Shoes"
        },
        {
          id: "8",
          name: "Casual Sneakers - Premium White",
          price: 9999.99,
          originalPrice: 13999.99,
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 432,
          category: "Casual Shoes"
        }
      ],
      accessories: [
        {
          id: "9",
          name: "Luxury Leather Handbag - Italian Crafted", 
          price: 35999.99,
          originalPrice: 45999.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 189,
          category: "Premium Bags"
        },
        {
          id: "10",
          name: "Executive Travel Briefcase",
          price: 28999.99,
          originalPrice: 35999.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 156,
          category: "Business Bags"
        },
        {
          id: "11",
          name: "Designer Watch - Swiss Movement",
          price: 125999.99,
          originalPrice: 149999.99,
          image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 267,
          category: "Luxury Watches"
        },
        {
          id: "12",
          name: "Pearl Necklace Set",
          price: 15999.99,
          originalPrice: 22999.99,
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 198,
          category: "Fine Jewelry"
        }
      ],
      groceries: [
        {
          id: "13",
          name: "Premium Wine Collection - Vintage Red",
          price: 8999.99,
          originalPrice: 12999.99,
          image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 145,
          category: "Fine Wines"
        },
        {
          id: "14",
          name: "Artisanal Coffee Beans - Ethiopian Origin",
          price: 3999.99,
          originalPrice: 4999.99,
          image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 287,
          category: "Premium Beverages"
        },
        {
          id: "15",
          name: "Imported Sparkling Water - 12 Pack",
          price: 2499.99,
          originalPrice: 2999.99,
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 198,
          category: "Luxury Beverages"
        },
        {
          id: "16",
          name: "Organic Fruit Basket - Premium Selection",
          price: 5999.99,
          originalPrice: 7999.99,
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop",
          rating: 4.5,
          reviews: 167,
          category: "Fresh Organic"
        }
      ],
      household: [
        {
          id: "17",
          name: "Premium Home Cleaning Set",
          price: 8999.99,
          originalPrice: 11999.99,
          image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 123,
          category: "Household Care"
        },
        {
          id: "18",
          name: "Luxury Bathroom Essentials Kit",
          price: 12999.99,
          originalPrice: 16999.99,
          image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 189,
          category: "Personal Care"
        }
      ],
      specials: [
        {
          id: "19",
          name: "Executive Wardrobe Bundle",
          price: 89999.99,
          originalPrice: 129999.99,
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 267,
          category: "Premium Bundle"
        },
        {
          id: "20",
          name: "Luxury Lifestyle Package",
          price: 199999.99,
          originalPrice: 249999.99,
          image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 156,
          category: "VIP Collection"
        }
      ]
    };

    return productData[cat as keyof typeof productData] || [];
  };

  const products = getProductsByCategory(category || "");

  const getCategoryTitle = (cat: string) => {
    const titles = {
      clothing: "Fashion & Clothing",
      accessories: "Premium Accessories", 
      groceries: "Fresh Groceries",
      household: "Household Essentials",
      specials: "Special Deals"
    };
    return titles[cat as keyof typeof titles] || "Products";
  };

  const toggleLike = (itemId: string) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  if (!category || products.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Products - Ebeth Boutique</title>
        </Helmet>
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground">The category you're looking for doesn't exist or has no products yet.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getCategoryTitle(category)} - Ebeth Boutique</title>
        <meta 
          name="description" 
          content={`Shop ${getCategoryTitle(category).toLowerCase()} at Ebeth Boutique. Premium quality products with exclusive deals.`} 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {getCategoryTitle(category)}
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover our curated collection of premium {category}
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {products.length} products
            </p>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter & Sort
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-0 shadow-card hover:shadow-elegant transition-smooth">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                  />
                  
                  {product.originalPrice > product.price && (
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                  
                  <button
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-smooth"
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        likedItems.includes(product.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">
                        ₦{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₦{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full gap-2" 
                    size="sm"
                    onClick={() => window.location.href = `/product/${product.id}`}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Products;