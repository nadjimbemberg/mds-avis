import Link from 'next/link';
import { apiFetch } from '@/lib/api';
import type { ReviewsResponse } from '@/lib/types';

export default async function Home() {
  let reviews: ReviewsResponse['data'] = [];
  try {
    const data = await apiFetch('/avis?authorized=true&limit=50&sortBy=createdAt&sortOrder=desc') as unknown as ReviewsResponse;
    reviews = data.data ?? [];
  } catch { /* API indisponible */ }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">Avis récents</h1>
          <p className="text-gray-400 mt-1">{reviews.length} avis publiés</p>
        </div>
        <Link
          href="/avis/add"
          className="bg-white text-gray-900 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
        >
          + Donner mon avis
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-24 text-gray-500">
          <p className="text-lg">Aucun avis pour le moment.</p>
          <Link href="/avis/add" className="text-white underline mt-2 inline-block">Soyez le premier !</Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((a) => (
            <Link
              key={a.id}
              href={`/avis/${a.id}`}
              className="block bg-gray-800 border border-white/10 rounded-xl p-5 hover:border-white/25 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white">{a.author}</span>
                <span className="text-yellow-400 text-lg">{'★'.repeat(a.rating)}{'☆'.repeat(5 - a.rating)}</span>
              </div>
              <p className="text-gray-300 text-sm line-clamp-3">{a.description}</p>
              <p className="text-gray-500 text-xs mt-3">
                {new Date(a.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
