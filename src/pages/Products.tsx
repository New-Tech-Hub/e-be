import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import CustomerCare from "@/components/CustomerCare";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  gallery: any; // Change from any[] to any to match Json type
  stock_quantity: number;
  is_active: boolean;
  category_id: string;
  categories?: {
    name: string;
    slug: string;
  };
}

const Products = () => {
  const { category } = useParams();
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Get category from URL params or pathname for legacy routes
  const getCategorySlug = () => {
    if (category) return category;
    
    const pathname = window.location.pathname;
    // Legacy routes
    if (pathname === '/specials') return 'specials';
    if (pathname === '/clothing') return 'clothing';
    if (pathname === '/accessories') return 'accessories';
    if (pathname === '/groceries') return 'groceries';
    if (pathname === '/household') return 'household';
    
    // Current category routes - extract slug from pathname
    if (pathname.startsWith('/')) {
      const slug = pathname.slice(1); // Remove leading slash
      // Check if this matches a known category slug format
      if (slug.includes('-') || ['formal-wear', 'bags-luggage', 'beauty-personal-care', 'beverages', 'jewelries', 'fashion-clothing', 'food-beverages', 'make-up-kits', 'home-living', 'sports-fitness'].includes(slug)) {
        return slug;
      }
    }
    
    return null;
  };
  
  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    setCurrentPage(1);
    setProducts([]);
    fetchProducts(true);
  }, [category, window.location.pathname]);

  const fetchProducts = async (reset = false) => {
    const categorySlug = getCategorySlug();
    if (!categorySlug) {
      setLoading(false);
      return;
    }
    
    const pageToFetch = reset ? 1 : currentPage;
    setLoading(true);
    
    try {
      console.log('Fetching category:', categorySlug);
      
      // Single optimized query combining category and products
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id, name, slug, description')
        .eq('slug', categorySlug)
        .eq('is_active', true)
        .maybeSingle();

      console.log('Category data:', categoryData, 'Error:', categoryError);

      if (categoryError) throw categoryError;

      if (!categoryData) {
        console.log('Category not found:', categorySlug);
        setCategoryInfo(null);
        setProducts([]);
        setTotalProducts(0);
        setHasMore(false);
        setLoading(false);
        return;
      }

      setCategoryInfo(categoryData);

      // Get total count for pagination
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', categoryData.id)
        .eq('is_active', true);

      setTotalProducts(count || 0);

      // Get paginated products with optimized fields
      const from = (pageToFetch - 1) * PRODUCTS_PER_PAGE;
      const to = from + PRODUCTS_PER_PAGE - 1;

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          description,
          image_url,
          gallery,
          stock_quantity,
          is_active,
          category_id,
          categories!inner (
            name,
            slug
          )
        `)
        .eq('category_id', categoryData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (productsError) throw productsError;

      const newProducts = (productsData || []).map(product => ({
        ...product,
        gallery: product.gallery || []
      }));
      
      if (reset) {
        setProducts(newProducts);
        setCurrentPage(1);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      
      setHasMore(newProducts.length === PRODUCTS_PER_PAGE && (from + newProducts.length) < (count || 0));
      
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage(prev => prev + 1);
      fetchProducts(false);
    }
  };

  const getCategoryTitle = () => {
    return categoryInfo?.name || "Products";
  };

  const toggleLike = (itemId: string) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Products - Ebeth Boutique</title>
        </Helmet>
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading products...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!getCategorySlug() || !categoryInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Category Not Found - Ebeth Boutique</title>
        </Helmet>
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
            <Link to="/">
              <Button className="mt-4">Return Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>{getCategoryTitle()} - Ebeth Boutique</title>
        </Helmet>
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{getCategoryTitle()}</h1>
            <p className="text-muted-foreground mb-8">{categoryInfo.description}</p>
            <div className="bg-muted rounded-lg p-8">
              <h2 className="text-xl font-semibold mb-2">No Products Found</h2>
              <p className="text-muted-foreground">This category doesn't have any products yet. Check back soon!</p>
              <Link to="/">
                <Button className="mt-4">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getCategoryTitle()} - Ebeth Boutique</title>
        <meta 
          name="description" 
          content={categoryInfo.description || `Shop ${getCategoryTitle().toLowerCase()} at Ebeth Boutique. Premium quality products with exclusive deals.`} 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {getCategoryTitle()}
            </h1>
            <p className="text-muted-foreground text-lg">
              {categoryInfo.description || `Discover our curated collection of premium ${categoryInfo.name?.toLowerCase()}`}
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {products.length} of {totalProducts} products
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
                    src={product.image_url || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                  />
                  
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
                    {product.categories?.name || 'Uncategorized'}
                  </Badge>
                  
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">
                        ₦{Number(product.price).toLocaleString()}
                      </span>
                    </div>
                    <Badge variant={product.stock_quantity > 0 ? "default" : "destructive"} className="text-xs">
                      {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link to={`/product/${product.id}`} className="flex-1">
                      <Button className="w-full" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => addToCart(product.id, 1)}
                      disabled={product.stock_quantity === 0}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && products.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button 
                onClick={loadMore} 
                disabled={loading}
                className="px-8"
              >
                {loading ? "Loading..." : "Load More Products"}
              </Button>
            </div>
          )}
        </main>
        
        <Footer />
        <CustomerCare />
      </div>
    </>
  );
};

export default Products;