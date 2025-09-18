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
        // Corporate Wear
        {
          id: "1",
          name: "Premium Business Suit - Charcoal Grey",
          price: 45999.99,
          originalPrice: 52999.99,
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 189,
          category: "Men's Corporate"
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
          name: "Corporate Polo Shirt - Navy Blue",
          price: 5999.99,
          originalPrice: 7999.99,
          image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 145,
          category: "Men's Casual"
        },
        {
          id: "4",
          name: "Premium Cotton Singlet - 3 Pack",
          price: 3999.99,
          originalPrice: 5999.99,
          image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 298,
          category: "Men's Undergarments"
        },
        {
          id: "5",
          name: "Elegant Cocktail Dress - Black",
          price: 15999.99,
          originalPrice: 22999.99,
          image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 198,
          category: "Women's Formal"
        },
        {
          id: "6",
          name: "Professional Blazer - Navy Blue",
          price: 25999.99,
          originalPrice: 32999.99,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 145,
          category: "Women's Corporate"
        },
        {
          id: "7",
          name: "Casual Denim Jeans - Slim Fit",
          price: 12999.99,
          originalPrice: 16999.99,
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 356,
          category: "Casual Wear"
        },
        {
          id: "8",
          name: "Designer T-Shirt - Premium Cotton",
          price: 6999.99,
          originalPrice: 9999.99,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
          rating: 4.5,
          reviews: 287,
          category: "Casual Wear"
        }
      ],
      accessories: [
        // Bags
        {
          id: "9",
          name: "Luxury Leather Handbag - Italian Crafted", 
          price: 35999.99,
          originalPrice: 45999.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 189,
          category: "Women's Bags"
        },
        {
          id: "10",
          name: "Executive Travel Briefcase",
          price: 28999.99,
          originalPrice: 35999.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 156,
          category: "Men's Bags"
        },
        {
          id: "11",
          name: "Rolling Travel Suitcase - Hard Shell",
          price: 45999.99,
          originalPrice: 55999.99,
          image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 234,
          category: "Travel Bags"
        },
        {
          id: "12",
          name: "Designer Backpack - Premium Leather",
          price: 22999.99,
          originalPrice: 29999.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 178,
          category: "Casual Bags"
        },
        // Watches & Jewelry
        {
          id: "13",
          name: "Swiss Movement Wrist Watch - Gold",
          price: 125999.99,
          originalPrice: 149999.99,
          image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 267,
          category: "Luxury Watches"
        },
        {
          id: "14",
          name: "Diamond Stud Earrings - 14K Gold",
          price: 89999.99,
          originalPrice: 119999.99,
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 134,
          category: "Fine Jewelry"
        },
        {
          id: "15",
          name: "Pearl Necklace Set - Cultured",
          price: 15999.99,
          originalPrice: 22999.99,
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 198,
          category: "Fine Jewelry"
        },
        {
          id: "16",
          name: "African Hand Beads - Traditional Design",
          price: 3999.99,
          originalPrice: 5999.99,
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
          rating: 4.5,
          reviews: 89,
          category: "Traditional Jewelry"
        },
        {
          id: "17",
          name: "Waist Beads Set - Colorful African Style",
          price: 2999.99,
          originalPrice: 4999.99,
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 145,
          category: "Traditional Jewelry"
        },
        // Belts, Ties & Eyewear
        {
          id: "18",
          name: "Genuine Leather Belt - Italian Crafted",
          price: 8999.99,
          originalPrice: 12999.99,
          image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 234,
          category: "Men's Accessories"
        },
        {
          id: "19",
          name: "Silk Tie Collection - Executive 3 Pack",
          price: 7999.99,
          originalPrice: 11999.99,
          image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 321,
          category: "Men's Formal"
        },
        {
          id: "20",
          name: "Designer Sunglasses - UV Protection",
          price: 15999.99,
          originalPrice: 19999.99,
          image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 189,
          category: "Eyewear"
        },
        {
          id: "21",
          name: "Prescription Eyeglasses - Designer Frame",
          price: 25999.99,
          originalPrice: 32999.99,
          image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 156,
          category: "Eyewear"
        },
        // Footwear
        {
          id: "22",
          name: "Italian Leather Dress Shoes",
          price: 18999.99,
          originalPrice: 25999.99,
          image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 278,
          category: "Men's Shoes"
        },
        {
          id: "23",
          name: "Designer High Heels - Patent Leather",
          price: 12999.99,
          originalPrice: 17999.99,
          image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
          rating: 4.5,
          reviews: 156,
          category: "Women's Shoes"
        },
        {
          id: "24",
          name: "Premium Leather Slippers - Handcrafted",
          price: 8999.99,
          originalPrice: 12999.99,
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 198,
          category: "Casual Footwear"
        },
        {
          id: "25",
          name: "Palm Sandals - Traditional Nigerian",
          price: 5999.99,
          originalPrice: 8999.99,
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          rating: 4.4,
          reviews: 134,
          category: "Traditional Footwear"
        }
      ],
      groceries: [
        // Wines & Beverages
        {
          id: "26",
          name: "Premium Red Wine - French Bordeaux",
          price: 15999.99,
          originalPrice: 19999.99,
          image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 145,
          category: "Fine Wines"
        },
        {
          id: "27",
          name: "Champagne - Dom Pérignon Vintage",
          price: 89999.99,
          originalPrice: 109999.99,
          image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 67,
          category: "Premium Wines"
        },
        {
          id: "28",
          name: "Artisanal Coffee Beans - Ethiopian Premium",
          price: 3999.99,
          originalPrice: 4999.99,
          image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 287,
          category: "Premium Beverages"
        },
        {
          id: "29",
          name: "Imported Sparkling Water - San Pellegrino",
          price: 2499.99,
          originalPrice: 2999.99,
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 198,
          category: "Luxury Beverages"
        },
        // Supplements & Health
        {
          id: "30",
          name: "Premium Multivitamin Complex",
          price: 8999.99,
          originalPrice: 11999.99,
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 234,
          category: "Health Supplements"
        },
        {
          id: "31",
          name: "Omega-3 Fish Oil - High Potency",
          price: 6999.99,
          originalPrice: 8999.99,
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 189,
          category: "Health Supplements"
        },
        {
          id: "32",
          name: "Protein Powder - Whey Isolate",
          price: 12999.99,
          originalPrice: 15999.99,
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 345,
          category: "Fitness Supplements"
        }
      ],
      household: [
        // Towels & Bathroom
        {
          id: "33",
          name: "Egyptian Cotton Towel Set - 6 Pieces",
          price: 15999.99,
          originalPrice: 19999.99,
          image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 167,
          category: "Bath Towels"
        },
        {
          id: "34",
          name: "Luxury Spa Towel Collection",
          price: 25999.99,
          originalPrice: 32999.99,
          image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 123,
          category: "Premium Towels"
        },
        // Makeup & Beauty
        {
          id: "35",
          name: "Professional Makeup Kit - Complete Set",
          price: 35999.99,
          originalPrice: 45999.99,
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 289,
          category: "Makeup Kits"
        },
        {
          id: "36",
          name: "Designer Lipstick Collection - 12 Shades",
          price: 18999.99,
          originalPrice: 24999.99,
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
          rating: 4.6,
          reviews: 198,
          category: "Beauty Products"
        },
        // Perfumes
        {
          id: "37",
          name: "Designer Perfume - Chanel No. 5",
          price: 45999.99,
          originalPrice: 55999.99,
          image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 456,
          category: "Designer Perfumes"
        },
        {
          id: "38",
          name: "Men's Cologne - Dior Sauvage",
          price: 38999.99,
          originalPrice: 45999.99,
          image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 334,
          category: "Designer Perfumes"
        },
        // Kitchen & Cups
        {
          id: "39",
          name: "Royal Bone China Tea Set - 12 Pieces",
          price: 89999.99,
          originalPrice: 119999.99,
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 89,
          category: "Luxury Tableware"
        },
        {
          id: "40",
          name: "Crystal Wine Glasses - Hand Blown Set of 6",
          price: 25999.99,
          originalPrice: 32999.99,
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 156,
          category: "Premium Glassware"
        },
        {
          id: "41",
          name: "Professional Kitchen Knife Set - German Steel",
          price: 35999.99,
          originalPrice: 45999.99,
          image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 234,
          category: "Kitchen Accessories"
        },
        {
          id: "42",
          name: "Marble Cutting Board - Italian Carrara",
          price: 15999.99,
          originalPrice: 19999.99,
          image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 178,
          category: "Kitchen Accessories"
        }
      ],
      specials: [
        {
          id: "43",
          name: "Executive Wardrobe Bundle - Complete Set",
          price: 189999.99,
          originalPrice: 249999.99,
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
          rating: 4.9,
          reviews: 67,
          category: "Premium Bundle"
        },
        {
          id: "44",
          name: "Luxury Lifestyle Gift Set",
          price: 299999.99,
          originalPrice: 399999.99,
          image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 45,
          category: "VIP Collection"
        },
        {
          id: "45",
          name: "Beauty & Wellness Complete Package",
          price: 125999.99,
          originalPrice: 159999.99,
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 89,
          category: "Gift Sets"
        },
        {
          id: "46",
          name: "Home Entertainment & Kitchen Bundle",
          price: 159999.99,
          originalPrice: 199999.99,
          image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
          rating: 4.8,
          reviews: 134,
          category: "Home Collections"
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