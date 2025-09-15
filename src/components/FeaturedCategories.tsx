import { Link } from "react-router-dom";
import { ArrowRight, Shirt, Gem, ShoppingBasket, Home, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FeaturedCategories = () => {
  const categories = [
    {
      id: "clothing",
      title: "Clothing",
      description: "Fashion-forward pieces for every occasion",
      icon: Shirt,
      href: "/clothing",
      color: "pastel-pink",
      items: "500+ Items"
    },
    {
      id: "accessories", 
      title: "Accessories",
      description: "Complete your look with premium accessories",
      icon: Gem,
      href: "/accessories", 
      color: "pastel-blue",
      items: "200+ Items"
    },
    {
      id: "groceries",
      title: "Groceries",
      description: "Fresh produce & quality food essentials",
      icon: ShoppingBasket,
      href: "/groceries",
      color: "pastel-green", 
      items: "1000+ Items"
    },
    {
      id: "household",
      title: "Household Essentials", 
      description: "Everything you need for your home",
      icon: Home,
      href: "/household",
      color: "cream",
      items: "300+ Items"
    },
    {
      id: "specials",
      title: "Specials & Deals",
      description: "Weekly offers and exclusive discounts",
      icon: Tag,
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
            const IconComponent = category.icon;
            
            return (
              <Link key={category.id} to={category.href} className="group">
                <Card className="h-full p-6 border-0 shadow-card hover:shadow-elegant transition-smooth transform hover:-translate-y-1 bg-background">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full bg-${category.color} flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      {category.items}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-gold transition-smooth">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-gold group-hover:text-gold-dark transition-smooth">
                    <span className="text-sm font-medium mr-2">Explore Collection</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
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
            Get 30% off when you shop both fashion and grocery categories in a single order
          </p>
          <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-gold">
            Shop Mixed Collection
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;