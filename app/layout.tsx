'use client';

import { useEffect, useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import { Geist } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '@/components/errorBoundary';

// I choose Geist Font in this test because it's clean, modern, and easy to read.
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Cache will be valid until 24 hours
        gcTime: 1000 * 60 * 60 * 24,
      },
    },
  });

  // Data storage persister
  const persister = isClient
    ? createSyncStoragePersister({
        storage: window.localStorage,
      })
    : undefined;

  // Accessing localStorage directly in a client-side component can lead to errors during server-side rendering (SSR).
  // So I must check that client is available when we create the storage persister!
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {persister && (
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
          >
            <ErrorBoundary>{children}</ErrorBoundary>
          </PersistQueryClientProvider>
        )}
      </body>
    </html>
  );
}
