'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function ExampleComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const helloQuery = trpc.example.hello.useQuery({ name: name || undefined });
  const getUserQuery = trpc.example.getUser.useQuery({ id: 1 });
  const createUserMutation = trpc.example.createUser.useMutation();

  const handleCreateUser = () => {
    if (name && email) {
      createUserMutation.mutate({ name, email });
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>tRPC Query Example</CardTitle>
          <CardDescription>
            Test a simple tRPC query with Zod validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="rounded-md bg-muted p-4">
            <p className="font-mono text-sm">
              {helloQuery.data?.greeting || 'Loading...'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Get User Example</CardTitle>
          <CardDescription>
            Fetch user data using tRPC
          </CardDescription>
        </CardHeader>
        <CardContent>
          {getUserQuery.isLoading && <p>Loading user...</p>}
          {getUserQuery.data && (
            <div className="space-y-2">
              <p><strong>ID:</strong> {getUserQuery.data.id}</p>
              <p><strong>Name:</strong> {getUserQuery.data.name}</p>
              <p><strong>Email:</strong> {getUserQuery.data.email}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Create User (Mutation)</CardTitle>
          <CardDescription>
            Create a new user with Zod schema validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {createUserMutation.data && (
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm font-semibold mb-2">User Created:</p>
              <pre className="text-xs">
                {JSON.stringify(createUserMutation.data, null, 2)}
              </pre>
            </div>
          )}
          
          {createUserMutation.error && (
            <div className="rounded-md bg-destructive/10 text-destructive p-4">
              <p className="text-sm">{createUserMutation.error.message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleCreateUser}
            disabled={createUserMutation.isPending || !name || !email}
          >
            {createUserMutation.isPending ? 'Creating...' : 'Create User'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
