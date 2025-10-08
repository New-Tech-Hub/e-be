import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import clothingImage from "@/assets/categories/clothing-category.jpg";
import accessoriesImage from "@/assets/categories/accessories-category.jpg";
import householdImage from "@/assets/categories/household-category.jpg";
import specialsImage from "@/assets/categories/specials-category.jpg";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  product_count?: number;
}

const FeaturedCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback categories with local images
  const fallbackCategories = [
    {
      id: "clothing",
      name: "Clothing",
      slug: "clothing",
      description: "Fashion-forward pieces for every occasion",
      image_url: clothingImage,
      product_count: 500
    },
    {
      id: "accessories", 
      name: "Accessories",
      slug: "accessories",
      description: "Complete your look with premium accessories",
      image_url: accessoriesImage,
      product_count: 200
    },
    {
      id: "household",
      name: "Household Essentials",
      slug: "household", 
      description: "Everything you need for your home",
      image_url: householdImage,
      product_count: 300
    },
    {
      id: "specials",
      name: "Specials & Deals",
      slug: "specials",
      description: "Weekly offers and exclusive discounts",
      image_url: specialsImage,
      product_count: 0
    }
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug, description, image_url')
        .is('parent_id', null)
        .eq('is_active', true)
        .order('display_order')
        .order('name')
        .limit(4);

      if (error) throw error;

      if (data && data.length > 0) {
        // Get product counts for each category
        const categoriesWithCounts = await Promise.all(
          data.map(async (category) => {
            const { count } = await supabase
              .from('products')
              .select('*', { count: 'exact', head: true })
              .eq('category_id', category.id)
              .eq('is_active', true);

            return {
              ...category,
              product_count: count || 0
            };
          })
        );

        setCategories(categoriesWithCounts);
      } else {
        setCategories(fallbackCategories);
      }
    } catch (error) {
      setCategories(fallbackCategories);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop Our Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From haute couture to household essentials, discover everything you need 
            in our carefully curated categories
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`} className="group">
                <Card className="h-full border-0 shadow-card hover:shadow-elegant transition-smooth transform hover:-translate-y-1 bg-background overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-semibold text-white bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
                        {category.product_count ? `${category.product_count}+ Items` : 'Explore'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-gold transition-smooth">
                      {category.name}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {category.description || `Discover our ${category.name} collection`}
                    </p>
                    
                    <div className="flex items-center text-gold group-hover:text-gold-dark transition-smooth">
                      <span className="text-sm font-medium mr-2">Explore Collection</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Special Category Highlight */}
        <div className="bg-gradient-gold rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-black mb-4">
            Weekly Special: Mix & Match
          </h3>
          <p className="text-black/80 mb-6 max-w-md mx-auto">
            Get 30% off when you shop both fashion and household categories in a single order
          </p>
          <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-gold" asChild>
            <Link to="/specials">
              Shop Mixed Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;