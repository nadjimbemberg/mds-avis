import StarRating from '@/components/StarRating';
import { getUser } from '@/lib/auth';

type Props = { searchParams: { error?: string } };

export default function AddAvisPage({ searchParams }: Props) {
  const user = getUser();

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-white mb-8">Donner un avis</h1>

      {searchParams.error && (
        <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {decodeURIComponent(searchParams.error)}
        </div>
      )}

      <form action="/api/avis" method="POST" className="space-y-5 bg-gray-800 border border-white/10 rounded-xl p-6">
        {/* Honeypot anti-spam */}
        <input type="text" name="_website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1.5">
            Votre nom
          </label>
          <input
            type="text" id="author" name="author" required
            defaultValue={user?.username ?? ''}
            className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
            Votre email
          </label>
          <input
            type="email" id="email" name="email" required
            defaultValue={user?.email ?? ''}
            className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Note</label>
          <StarRating name="rating" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1.5">
            Votre avis
          </label>
          <textarea
            id="description" name="description" required rows={5}
            minLength={10}
            placeholder="Décrivez votre expérience (min. 10 caractères)"
            className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-gray-900 font-semibold py-2.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          Soumettre l'avis
        </button>
      </form>
    </div>
  );
}
