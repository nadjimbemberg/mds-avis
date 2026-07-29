import { notFound } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';
import { getUser } from '@/lib/auth';
import type { Review } from '@/lib/types';
import DeleteAvisButton from '@/components/DeleteAvisButton';

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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {searchParams.success === '1' && (
        <div className="mb-6 rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
          Avis soumis avec succès — en attente de validation.
        </div>
      )}

      <div className="bg-gray-800 border border-white/10 rounded-xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h1 className="text-xl font-bold text-white break-words">{avis.author}</h1>
          <span className="text-yellow-400 text-xl">
            {'★'.repeat(avis.rating)}{'☆'.repeat(5 - avis.rating)}
          </span>
        </div>

        <p className="text-gray-300 leading-relaxed break-words">{avis.description}</p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-6 pt-4 border-t border-white/10">
          <p className="text-gray-500 text-xs">
            {new Date(avis.createdAt).toLocaleDateString('fr-FR')}
            {avis.user && <span> · par {avis.user.username}</span>}
          </p>
          {!avis.authorized && (
            <span className="text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded self-start sm:self-auto">
              En attente de validation
            </span>
          )}
        </div>
      </div>

      {isOwner && (
        <div className="flex flex-col gap-3 mt-4 sm:flex-row">
          <Link
            href={`/avis/${avis.id}/edit`}
            className="w-full sm:w-auto text-center text-sm text-gray-300 border border-white/10 hover:border-white/30 px-4 py-2.5 sm:py-2 rounded-md transition-colors"
          >
            Modifier
          </Link>
          <DeleteAvisButton formAction={`/api/avis/${avis.id}/delete`} />
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
