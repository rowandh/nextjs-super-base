import { protectedProcedure, router } from '@/lib/trpc';
import { createClient } from '@/lib/supabase/server';

export const authRouter = router({
  // Get current user (no profile, just auth user)
  getUser: protectedProcedure.query(async () => {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      throw new Error('Unauthorized');
    }

    return user;
  }),

  // Sign out
  signOut: protectedProcedure.mutation(async () => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new Error('Failed to sign out');
    }

    return { success: true };
  }),
});