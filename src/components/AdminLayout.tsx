import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSuperAdminAuth } from "@/hooks/useSuperAdminAuth";
import { useToast } from "@/components/ui/use-toast";
import { AdminSidebar } from "@/components/AdminSidebar";
import Header from "@/components/Header";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isSuperAdmin, loading, user } = useSuperAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access the admin panel.",
        variant: "destructive"
      });
      navigate("/");
    } else if (!loading && user && !isSuperAdmin) {
      toast({
        title: "Access Denied - Super Admin Only",
        description: "This backend dashboard is restricted to the super administrator.",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [user, isSuperAdmin, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        <p className="ml-4 text-muted-foreground">Verifying super admin access...</p>
      </div>
    );
  }

  if (!user || !isSuperAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}