import { ExampleComponent } from "@/components/example-component";
import DashboardExample from "@/components/dashboard-example";
import TRPCTest from "@/components/trpc-test";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Next.js Super Base</h1>
      <p className="text-muted-foreground mb-8">
        A modern Next.js starter with tRPC, authentication, and modern tooling
      </p>
      
      <div className="space-y-8">
        <ExampleComponent />
        
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">tRPC Connection Test</h2>
          <TRPCTest />
        </div>
        
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Authentication Dashboard</h2>
          <DashboardExample />
        </div>
      </div>
    </div>
  );
}
