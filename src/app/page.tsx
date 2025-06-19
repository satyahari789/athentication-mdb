 
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Welcome to the Home Page</h1>
      <Link href="/register" className="text-blue-500 underline">
        Go to Register Page
      </Link>
    </main>
  );
}
