import { ExampleComponent } from "@/components/example-component";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Next.js Super Base</h1>
      <p className="text-muted-foreground mb-8">
        A modern Next.js starter with tRPC, Superjson, Zod, and shadcn/ui
      </p>
      <ExampleComponent />
    </div>
  );
}
