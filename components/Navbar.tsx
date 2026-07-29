import Link from 'next/link';
import type { AuthUser } from '@/lib/auth';

export default function Navbar({ user }: { user: AuthUser | null }) {
  return (
    <nav className="border-b border-white/10 bg-gray-900/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white tracking-tight">
          MDS Avis
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <Link href="/avis/add" className="text-gray-300 hover:text-white transition-colors">
            + Ajouter
          </Link>

          {user ? (
            <>
              <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                {user.username}
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                Connexion
              </Link>
              <Link
                href="/register"
                className="bg-white text-gray-900 font-medium px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
