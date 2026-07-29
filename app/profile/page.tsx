import { redirect } from 'next/navigation';
import { getToken, getUser } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import type { Me } from '@/lib/types';

type Props = { searchParams: { error?: string; success?: string } };

export default async function ProfilePage({ searchParams }: Props) {
  const token = getToken();
  const user = getUser();
  if (!token || !user) redirect('/login?returnTo=/profile');

  let me: Me | null = null;
  try {
    me = await apiFetch('/me', {}, token) as unknown as Me;
  } catch { /* ignore */ }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-white mb-8">Mon profil</h1>

      {/* Infos */}
      <div className="bg-gray-800 border border-white/10 rounded-xl p-6 mb-6">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-400">Nom d'utilisateur</dt>
            <dd className="text-white font-medium">{me?.username ?? user.username}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">Email</dt>
            <dd className="text-white">{me?.email ?? user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">Membre depuis</dt>
            <dd className="text-white">
              {me ? new Date(me.createdAt).toLocaleDateString('fr-FR') : '—'}
            </dd>
          </div>
        </dl>
      </div>

      {/* Changer de mot de passe */}
      <div className="bg-gray-800 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-5">Changer le mot de passe</h2>

        {searchParams.success && (
          <div className="mb-4 rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
            {decodeURIComponent(searchParams.success)}
          </div>
        )}
        {searchParams.error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {decodeURIComponent(searchParams.error)}
          </div>
        )}

        <form action="/api/auth/change-password" method="POST" className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1.5">
              Mot de passe actuel
            </label>
            <input
              type="password" id="currentPassword" name="currentPassword" required
              className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1.5">
              Nouveau mot de passe
            </label>
            <input
              type="password" id="newPassword" name="newPassword" required
              className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-gray-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}
