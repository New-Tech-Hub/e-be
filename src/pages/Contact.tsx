import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import StoreMap from "@/components/StoreMap";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["Atlantic Mall, 40 Ajose Adeogun Street", "Utako-Abuja", "Near Peace Mass Park Utako"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["09092034816", "Available during store hours"]
    },
    {
      icon: Mail,
      title: "Email Us", 
      details: ["hello@ebethboutique.com", "Customer support available 24/7"]
    },
    {
      icon: Clock,
      title: "Store Hours",
      details: ["Monday - Saturday: 9:00 AM - 9:00 PM", "Sunday: 11:00 AM - 7:00 PM"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Ebeth Boutique & Exclusive Store</title>
        <meta 
          name="description" 
          content="Get in touch with Ebeth Boutique & Exclusive Store. Visit our Atlantic Mall location or contact us online for customer support." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="py-16 bg-gradient-elegant">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Contact Us
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We'd love to hear from you. Get in touch with our team for any questions, 
                  feedback, or assistance you may need.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Card key={index} className="p-6 text-center border-0 shadow-card hover:shadow-elegant transition-smooth">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-4">
                        <IconComponent className="h-8 w-8 text-gold" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground mb-1">
                          {detail}
                        </p>
                      ))}
                    </Card>
                  );
                })}
              </div>

              {/* Store Location Map */}
              <div className="max-w-6xl mx-auto mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Find Our Store
                  </h2>
                  <p className="text-muted-foreground">
                    Visit us at Atlantic Mall, Utako-Abuja for an exclusive shopping experience
                  </p>
                </div>
                <StoreMap />
              </div>

              {/* Contact Form */}
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-6">
                      Send Us a Message
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Have a question or feedback? We'd love to hear from you. 
                      Fill out the form and we'll get back to you as soon as possible.
                    </p>
                    
                    <Card className="p-6 bg-gradient-gold">
                      <h3 className="text-xl font-bold text-black mb-4">
                        Quick Response Guarantee
                      </h3>
                      <p className="text-black/80">
                        We respond to all inquiries within 24 hours during business days. 
                        For urgent matters, please call us directly.
                      </p>
                    </Card>
                  </div>

                  <Card className="p-8 border-0 shadow-elegant">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Full Name *
                          </label>
                          <Input
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Subject *
                        </label>
                        <Input
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          placeholder="What is this regarding?"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Message *
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Tell us how we can help you..."
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" size="lg">
                        Send Message
                      </Button>
                    </form>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;