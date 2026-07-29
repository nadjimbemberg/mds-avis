import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { getUser } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'MDS Avis',
  description: 'Site d\'avis MDS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const user = getUser();

  return (
    <html lang="fr" className="h-full bg-gray-900">
      <body className="h-full bg-gray-900 text-white antialiased flex flex-col min-h-screen">
        <Navbar user={user} />
        <main className="flex-1">{children}</main>
        <footer className="mt-auto border-t border-white/10 py-6 px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-500">© 2026 MDS Avis — Tous droits réservés</p>
        </footer>
      </body>
    </html>
  );
}
