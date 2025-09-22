import { ReactNode, useEffect } from 'react';
import { useSuperAdminAuth } from '@/hooks/useSuperAdminAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface SuperAdminRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const SuperAdminRoute = ({ children, redirectTo = '/' }: SuperAdminRouteProps) => {
  const { isSuperAdmin, loading, user } = useSuperAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this page.",
        variant: "destructive"
      });
      navigate(redirectTo);
    } else if (!loading && user && !isSuperAdmin) {
      toast({
        title: "Access Denied",
        description: "This area is restricted to the super administrator only.",
        variant: "destructive"
      });
      navigate(redirectTo);
    }
  }, [user, isSuperAdmin, loading, navigate, redirectTo, toast]);

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

  return <>{children}</>;
};

export default SuperAdminRoute;