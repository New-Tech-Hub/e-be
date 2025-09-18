import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import WeeklyDeals from "@/components/WeeklyDeals";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Ebeth Boutique & Exclusive Store - Luxury Fashion & Quality Groceries</title>
        <meta 
          name="description" 
          content="Shop premium fashion, accessories, and fresh groceries at Ebeth Boutique. Where boutique elegance meets everyday convenience. Free shipping over $75." 
        />
        <meta name="keywords" content="boutique fashion, luxury clothing, fresh groceries, accessories, household essentials, weekly deals" />
        <meta property="og:title" content="Ebeth Boutique & Exclusive Store - Premium Shopping Experience" />
        <meta property="og:description" content="Discover luxury fashion and quality essentials in one elegant destination. Shop curated collections with boutique-level service." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://ebethboutique.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection />
          <FeaturedCategories />
          <WeeklyDeals />
          <Testimonials />
        {/* Instagram Feed */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <InstagramFeed />
          </div>
        </section>

        <Newsletter />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;