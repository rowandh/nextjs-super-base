import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-red-600">
            Authentication Error
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Sorry, we couldn&apos;t log you in. The authentication link may have expired or been used already.
          </p>
          <Button asChild>
            <Link href="/login">Try Again</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}