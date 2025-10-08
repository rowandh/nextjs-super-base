'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { trpc } from '@/lib/trpc-provider';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { User } from '@supabase/supabase-js';

export default function DashboardExample() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const signOutMutation = trpc.auth.signOut.useMutation({
    onSuccess: () => {
      setUser(null);
    },
  });

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Welcome</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Please sign in to continue</p>
            <Button asChild>
              <a href="/login">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            disabled={signOutMutation.isPending}
          >
            {signOutMutation.isPending ? 'Signing out...' : 'Sign Out'}
          </Button>
        </div>

        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <strong className="text-sm font-medium text-gray-700">Email:</strong>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <strong className="text-sm font-medium text-gray-700">User ID:</strong>
                <p className="text-gray-900 font-mono text-sm">{user.id}</p>
              </div>
              <div>
                <strong className="text-sm font-medium text-gray-700">Signed up:</strong>
                <p className="text-gray-900">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <strong className="text-sm font-medium text-gray-700">Last sign in:</strong>
                <p className="text-gray-900">
                  {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Welcome Message */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Welcome to Next.js Super Base!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You are successfully logged in! This starter pack includes:
            </p>
            <ul className="mt-3 space-y-1 text-gray-600">
              <li>• User authentication with Supabase</li>
              <li>• tRPC for type-safe API calls</li>
              <li>• Modern UI with shadcn/ui components</li>
              <li>• TypeScript for better development experience</li>
              <li>• Tailwind CSS for styling</li>
            </ul>
            <p className="mt-4 text-gray-600">
              Ready to build your next project!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}