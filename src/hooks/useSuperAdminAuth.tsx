import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useSuperAdminAuth = () => {
  const { user, loading: authLoading } = useAuth();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSuperAdminStatus = async () => {
      if (!user) {
        setIsSuperAdmin(false);
        setLoading(false);
        return;
      }

      // Check if user is specifically jerryguma01@gmail.com with admin role
      if (user.email === 'jerryguma01@gmail.com') {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();

          if (error) {
            console.error('Error checking super admin status:', error);
            setIsSuperAdmin(false);
          } else {
            setIsSuperAdmin(data?.role === 'admin');
          }
        } catch (error) {
          console.error('Error checking super admin status:', error);
          setIsSuperAdmin(false);
        }
      } else {
        setIsSuperAdmin(false);
      }

      setLoading(false);
    };

    if (!authLoading) {
      checkSuperAdminStatus();
    }
  }, [user, authLoading]);

  return {
    isSuperAdmin,
    loading: loading || authLoading,
    user
  };
};