import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import clothingImage from "@/assets/categories/clothing-category.jpg";
import accessoriesImage from "@/assets/categories/accessories-category.jpg";
import householdImage from "@/assets/categories/household-category.jpg";
import specialsImage from "@/assets/categories/specials-category.jpg";

const FeaturedCategories = () => {
  const categories = [
    {
      id: "clothing",
      title: "Clothing",
      description: "Fashion-forward pieces for every occasion",
      image: clothingImage,
      alt: "Elegant Ankara dress and modern women's fashion on display.",
      href: "/clothing",
      color: "pastel-pink",
      items: "500+ Items"
    },
    {
      id: "accessories", 
      title: "Accessories",
      description: "Complete your look with premium accessories",
      image: accessoriesImage,
      alt: "Luxury jewelry, wristwatch, and designer sunglasses collection.",
      href: "/accessories", 
      color: "pastel-blue",
      items: "200+ Items"
    },
    {
      id: "household",
      title: "Household Essentials", 
      description: "Everything you need for your home",
      image: householdImage,
      alt: "Premium bedsheets, duvets, and stylish home essentials neatly arranged.",
      href: "/household",
      color: "cream",
      items: "300+ Items"
    },
    {
      id: "specials",
      title: "Specials & Deals",
      description: "Weekly offers and exclusive discounts",
      image: specialsImage,
      alt: "Shopping bags and gift packages representing special offers and discounts.",
      href: "/specials",
      color: "gold",
      items: "Hot Deals"
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => {
            return (
              <Link key={category.id} to={category.href} className="group">
                <Card className="h-full border-0 shadow-card hover:shadow-elegant transition-smooth transform hover:-translate-y-1 bg-background overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-semibold text-white bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
                        {category.items}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-gold transition-smooth">
                      {category.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-gold group-hover:text-gold-dark transition-smooth">
                      <span className="text-sm font-medium mr-2">Explore Collection</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

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