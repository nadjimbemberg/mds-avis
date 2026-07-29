'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { AuthUser } from '@/lib/auth';

export default function Navbar({ user }: { user: AuthUser | null }) {
  const [open, setOpen] = useState(false);

  const linkClass = 'text-gray-300 hover:text-white transition-colors';
  const mobileLinkClass = 'block w-full py-3 px-1 text-base text-gray-300 hover:text-white border-b border-white/5 last:border-b-0';

  return (
    <nav className="border-b border-white/10 bg-gray-900/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white tracking-tight" onClick={() => setOpen(false)}>
          MDS Avis
        </Link>

        {/* Navigation desktop — visible à partir de sm: */}
        <div className="hidden sm:flex items-center gap-5 text-sm">
          <Link href="/avis/add" className={linkClass}>
            + Ajouter
          </Link>

          {user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin" className={linkClass}>
                  Admin
                </Link>
              )}
              <Link href="/profile" className={linkClass}>
                {user.username}
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass}>
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

        {/* Bouton menu mobile — masqué à partir de sm: */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="sm:hidden -mr-2 p-2.5 text-gray-300 hover:text-white"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Panneau mobile — visible seulement si ouvert, masqué à partir de sm: */}
      {open && (
        <div id="mobile-menu" className="sm:hidden border-t border-white/10 px-4 pb-3">
          <Link href="/avis/add" className={mobileLinkClass} onClick={() => setOpen(false)}>
            + Ajouter un avis
          </Link>

          {user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin" className={mobileLinkClass} onClick={() => setOpen(false)}>
                  Admin
                </Link>
              )}
              <Link href="/profile" className={mobileLinkClass} onClick={() => setOpen(false)}>
                {user.username}
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className={`${mobileLinkClass} text-left text-gray-400`}>
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={mobileLinkClass} onClick={() => setOpen(false)}>
                Connexion
              </Link>
              <Link href="/register" className={mobileLinkClass} onClick={() => setOpen(false)}>
                Inscription
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
