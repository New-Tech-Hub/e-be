import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useSuperAdminAuth = () => {
  const { user, loading: authLoading } = useAuth();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [userRole, setUserRole] = useState<string>('customer');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRoles = async () => {
      if (!user) {
        setIsSuperAdmin(false);
        setIsAdmin(false);
        setIsManager(false);
        setUserRole('customer');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error checking user roles:', error);
          setIsSuperAdmin(false);
          setIsAdmin(false);
          setIsManager(false);
          setUserRole('customer');
        } else {
          const role = data?.role || 'customer';
          setUserRole(role);
          
          // Super admin check: jerryguma01@gmail.com with admin role
          const isSuperAdminUser = user.email === 'jerryguma01@gmail.com' && role === 'admin';
          setIsSuperAdmin(isSuperAdminUser);
          
          // Admin check (includes super admin)
          setIsAdmin(role === 'admin' || isSuperAdminUser);
          
          // Manager check (includes admin and super admin)
          setIsManager(['manager', 'admin'].includes(role) || isSuperAdminUser);
        }
      } catch (error) {
        console.error('Error checking user roles:', error);
        setIsSuperAdmin(false);
        setIsAdmin(false);
        setIsManager(false);
        setUserRole('customer');
      }

      setLoading(false);
    };

    if (!authLoading) {
      checkUserRoles();
    }
  }, [user, authLoading]);

  return {
    isSuperAdmin,
    isAdmin,
    isManager,
    userRole,
    loading: loading || authLoading,
    user,
    // Helper functions for role checks
    canManageUsers: isSuperAdmin || isAdmin,
    canManageProducts: isSuperAdmin || isAdmin || isManager,
    canViewAnalytics: isSuperAdmin || isAdmin,
    hasElevatedAccess: isSuperAdmin || isAdmin || isManager
  };
};