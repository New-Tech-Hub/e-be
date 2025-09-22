import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import SuperAdminRoute from "@/components/SuperAdminRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminUsers from "./pages/AdminUsers";
import AdminCoupons from "./pages/AdminCoupons";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminOrders from "./pages/AdminOrders";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Search from "./pages/Search";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/products/:category" element={<Products />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/wishlist" element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <SuperAdminRoute>
                  <Admin />
                </SuperAdminRoute>
              } />
              <Route path="/admin/products" element={
                <SuperAdminRoute>
                  <AdminProducts />
                </SuperAdminRoute>
              } />
              <Route path="/admin/categories" element={
                <SuperAdminRoute>
                  <AdminCategories />
                </SuperAdminRoute>
              } />
              <Route path="/admin/users" element={
                <SuperAdminRoute>
                  <AdminUsers />
                </SuperAdminRoute>
              } />
              <Route path="/admin/coupons" element={
                <SuperAdminRoute>
                  <AdminCoupons />
                </SuperAdminRoute>
              } />
              <Route path="/admin/analytics" element={
                <SuperAdminRoute>
                  <AdminAnalytics />
                </SuperAdminRoute>
              } />
              <Route path="/admin/orders" element={
                <SuperAdminRoute>
                  <AdminOrders />
                </SuperAdminRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              {/* Legacy category routes for backward compatibility */}
              <Route path="/clothing" element={<Products />} />
              <Route path="/accessories" element={<Products />} />
              <Route path="/groceries" element={<Products />} />
              <Route path="/household" element={<Products />} />
              <Route path="/specials" element={<Products />} />
              {/* Category routes for all active categories */}
              <Route path="/formal-wear" element={<Products />} />
              <Route path="/bags-luggage" element={<Products />} />
              <Route path="/beauty-personal-care" element={<Products />} />
              <Route path="/beverages" element={<Products />} />
              <Route path="/jewelries" element={<Products />} />
              <Route path="/fashion-clothing" element={<Products />} />
              <Route path="/food-beverages" element={<Products />} />
              <Route path="/make-up-kits" element={<Products />} />
              <Route path="/home-living" element={<Products />} />
              <Route path="/sports-fitness" element={<Products />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
