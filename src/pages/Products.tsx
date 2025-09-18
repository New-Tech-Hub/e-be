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

  // Mock products data - this would come from your database
  const getProductsByCategory = (cat: string) => {
    const productData = {
      clothing: [
        {
          id: "1",
          name: "Designer Summer Dress",
          price: 89.99,
          originalPrice: 120.00,
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 124,
          category: "Women's Fashion"
        },
        {
          id: "2", 
          name: "Classic Business Suit",
          price: 299.99,
          originalPrice: 399.99,
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 89,
          category: "Men's Fashion"
        },
        {
          id: "3",
          name: "Elegant Evening Gown",
          price: 159.99,
          originalPrice: 199.99,
          image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 156,
          category: "Women's Fashion"
        }
      ],
      accessories: [
        {
          id: "4",
          name: "Luxury Leather Handbag", 
          price: 199.99,
          originalPrice: 249.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 78,
          category: "Bags"
        },
        {
          id: "5",
          name: "Diamond Stud Earrings",
          price: 89.99,
          originalPrice: 120.00,
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 92,
          category: "Jewelry"
        }
      ],
      groceries: [
        {
          id: "6",
          name: "Organic Fresh Vegetables",
          price: 24.99,
          originalPrice: 29.99,
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop",
          rating: 4.5,
          reviews: 234,
          category: "Fresh Produce"
        },
        {
          id: "7",
          name: "Premium Coffee Beans",
          price: 18.99,
          originalPrice: 22.99,
          image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 167,
          category: "Beverages"
        }
      ],
      household: [
        {
          id: "8",
          name: "Premium Cleaning Kit",
          price: 39.99,
          originalPrice: 49.99,
          image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
          rating: 4.4,
          reviews: 89,
          category: "Cleaning"
        }
      ],
      specials: [
        {
          id: "9",
          name: "Weekly Deal Bundle",
          price: 99.99,
          originalPrice: 149.99,
          image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 203,
          category: "Bundle Deal"
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
                  
                  <Button className="w-full gap-2" size="sm">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
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