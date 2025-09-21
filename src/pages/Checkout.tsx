import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DeliverySlotSelector from "@/components/DeliverySlotSelector";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Textarea } from "@/components/ui/textarea";

interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  products?: {
    name: string;
    price: number;
    image_url: string;
    currency: string;
  };
}

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  notes: string;
}

const Checkout = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { trackPurchase } = useAnalytics();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState<string | null>(null);
  const [form, setForm] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria',
    postalCode: '',
    notes: ''
  });

  useEffect(() => {
    if (user) {
      fetchCartItems();
      fetchUserProfile();
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (
            name,
            price,
            image_url,
            currency
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const nameParts = data.full_name?.split(' ') || ['', ''];
        setForm(prev => ({
          ...prev,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          country: data.country || 'Nigeria'
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.products?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getShippingCost = () => {
    const total = getTotalPrice();
    return total >= 150000 ? 0 : 5000; // Free shipping over ₦150,000
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getShippingCost();
  };

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);
    
    try {
      // Create order record
      const orderData = {
        user_id: user!.id,
        order_number: `EB${Date.now()}`,
        total_amount: getFinalTotal(),
        currency: 'NGN',
        status: 'pending',
        payment_status: 'pending',
        payment_method: 'paystack',
        delivery_slot_id: selectedDeliverySlot,
        delivery_instructions: form.notes,
        shipping_address: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          country: form.country,
          postalCode: form.postalCode,
          notes: form.notes
        }
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.products?.price || 0,
        total_price: (item.products?.price || 0) * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      const { error: cartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user!.id);

      if (cartError) throw cartError;

      // Track purchase for analytics
      trackPurchase(
        order.id,
        getFinalTotal(),
        'NGN',
        cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.products?.price || 0
        }))
      );

      toast({
        title: "Order placed successfully!",
        description: `Order #${order.order_number} has been created.`
      });

      // In a real implementation, redirect to payment gateway
      navigate('/orders');
      
    } catch (error) {
      console.error('Error processing checkout:', error);
      toast({
        title: "Error",
        description: "Failed to process your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to checkout</h1>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - Ebeth Boutique & Exclusive Store</title>
        <meta 
          name="description" 
          content="Complete your purchase at Ebeth Boutique with secure checkout." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Checkout
            </h1>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
                <p className="text-muted-foreground mt-4">Loading checkout...</p>
              </div>
            ) : cartItems.length === 0 ? (
              <Card className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">Add some items to your cart to proceed with checkout.</p>
                <Link to="/">
                  <Button>Start Shopping</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Checkout Form */}
                <div>
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Shipping Information
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={form.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={form.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={form.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={form.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={form.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={form.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            value={form.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Order Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          value={form.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          placeholder="Any special instructions for your order"
                        />
                      </div>

                      {/* Delivery Slot Selection */}
                      <div className="mt-6">
                        <DeliverySlotSelector
                          selectedSlotId={selectedDeliverySlot}
                          onSlotSelect={setSelectedDeliverySlot}
                        />
                      </div>
                    </form>
                  </Card>
                </div>

                {/* Order Summary */}
                <div>
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          {item.products?.image_url && (
                            <img
                              src={item.products.image_url}
                              alt={item.products.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium">{item.products?.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × {formatCurrency(item.products?.price || 0)}
                            </p>
                          </div>
                          <p className="font-medium">
                            {formatCurrency((item.products?.price || 0) * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(getTotalPrice())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>
                          {getShippingCost() === 0 ? 'Free' : formatCurrency(getShippingCost())}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>{formatCurrency(getFinalTotal())}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6" 
                      onClick={handleSubmit}
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Place Order
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      By placing this order, you agree to our Terms & Conditions and Privacy Policy.
                    </p>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Checkout;