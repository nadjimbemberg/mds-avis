import { notFound } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';
import { getUser } from '@/lib/auth';
import type { Review } from '@/lib/types';

type Props = { params: { id: string }; searchParams: { success?: string } };

export default async function AvisDetailPage({ params, searchParams }: Props) {
  const user = getUser();
  let avis: Review | null = null;

  try {
    const data = await apiFetch(`/avis/${params.id}`) as unknown as (Review & { error?: string });
    if (data.error) return notFound();
    avis = data;
  } catch {
    return notFound();
  }

  const isOwner = user !== null && user.id === avis.userId;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {searchParams.success === '1' && (
        <div className="mb-6 rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
          Avis soumis avec succès — en attente de validation.
        </div>
      )}

      <div className="bg-gray-800 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">{avis.author}</h1>
          <span className="text-yellow-400 text-xl">
            {'★'.repeat(avis.rating)}{'☆'.repeat(5 - avis.rating)}
          </span>
        </div>

        <p className="text-gray-300 leading-relaxed">{avis.description}</p>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          <p className="text-gray-500 text-xs">
            {new Date(avis.createdAt).toLocaleDateString('fr-FR')}
            {avis.user && <span> · par {avis.user.username}</span>}
          </p>
          {!avis.authorized && (
            <span className="text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
              En attente de validation
            </span>
          )}
        </div>
      </div>

      {isOwner && (
        <div className="flex gap-3 mt-4">
          <Link
            href={`/avis/${avis.id}/edit`}
            className="text-sm text-gray-300 border border-white/10 hover:border-white/30 px-4 py-2 rounded-md transition-colors"
          >
            Modifier
          </Link>
          <form action={`/api/avis/${avis.id}/delete`} method="POST">
            <button
              type="submit"
              className="text-sm text-red-400 border border-red-500/20 hover:border-red-400/50 px-4 py-2 rounded-md transition-colors"
              onClick={(e) => {
                if (!confirm('Supprimer cet avis ?')) e.preventDefault();
              }}
            >
              Supprimer
            </button>
          </form>
        </div>
      )}

      <div className="mt-6">
        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Retour aux avis
        </Link>
      </div>
    </div>
  );
}
