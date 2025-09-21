import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsEvent {
  event_type: string;
  event_data?: Record<string, any>;
}

export const useAnalytics = () => {
  const { user } = useAuth();

  const trackEvent = async (event: AnalyticsEvent) => {
    try {
      const { error } = await supabase
        .from('analytics_events')
        .insert({
          user_id: user?.id || null,
          event_type: event.event_type,
          event_data: event.event_data || {}
        });

      if (error) {
        console.error('Analytics tracking error:', error);
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  // Predefined tracking functions for common events
  const trackProductView = (productId: string, productName: string, category: string) => {
    trackEvent({
      event_type: 'product_view',
      event_data: {
        product_id: productId,
        product_name: productName,
        category: category,
        timestamp: new Date().toISOString()
      }
    });
  };

  const trackAddToCart = (productId: string, productName: string, quantity: number, price: number) => {
    trackEvent({
      event_type: 'add_to_cart',
      event_data: {
        product_id: productId,
        product_name: productName,
        quantity: quantity,
        price: price,
        timestamp: new Date().toISOString()
      }
    });
  };

  const trackPurchase = (orderId: string, total: number, currency: string, items: any[]) => {
    trackEvent({
      event_type: 'purchase',
      event_data: {
        order_id: orderId,
        total: total,
        currency: currency,
        items: items,
        timestamp: new Date().toISOString()
      }
    });
  };

  const trackSearch = (query: string, results: number) => {
    trackEvent({
      event_type: 'search',
      event_data: {
        query: query,
        results_count: results,
        timestamp: new Date().toISOString()
      }
    });
  };

  const trackWishlistAdd = (productId: string, productName: string) => {
    trackEvent({
      event_type: 'wishlist_add',
      event_data: {
        product_id: productId,
        product_name: productName,
        timestamp: new Date().toISOString()
      }
    });
  };

  const trackPageView = (page: string, referrer?: string) => {
    trackEvent({
      event_type: 'page_view',
      event_data: {
        page: page,
        referrer: referrer || document.referrer,
        timestamp: new Date().toISOString()
      }
    });
  };

  return {
    trackEvent,
    trackProductView,
    trackAddToCart,
    trackPurchase,
    trackSearch,
    trackWishlistAdd,
    trackPageView
  };
};