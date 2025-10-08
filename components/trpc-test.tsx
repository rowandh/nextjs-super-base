'use client';

import { trpc } from '@/lib/trpc-provider';

export default function TRPCTest() {
  // Test the basic tRPC connection
  const { data: helloData, isLoading: helloLoading } = trpc.test.hello.useQuery({ 
    name: 'tRPC' 
  });

  if (helloLoading) {
    return <div>Loading tRPC test...</div>;
  }

  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-lg font-semibold mb-4">tRPC Connection Test</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Hello Query:</h4>
          <p className="text-green-600">{helloData?.message}</p>
        </div>
      </div>
    </div>
  );
}