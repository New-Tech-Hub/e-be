import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";

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
              <Route path="/clothing" element={<Products />} />
              <Route path="/accessories" element={<Products />} />
              <Route path="/groceries" element={<Products />} />
              <Route path="/household" element={<Products />} />
              <Route path="/specials" element={<Products />} />
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
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/:category" element={<Products />} />
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
