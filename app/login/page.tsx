import Link from 'next/link';

type Props = { searchParams: { error?: string; success?: string; returnTo?: string } };

export default function LoginPage({ searchParams }: Props) {
  const { error, success, returnTo } = searchParams;

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-white mb-8">Se connecter</h1>

        {success === '1' && (
          <div className="mb-4 rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
            Compte créé avec succès ! Connectez-vous.
          </div>
        )}
        {success === 'reset' && (
          <div className="mb-4 rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
            Mot de passe réinitialisé. Connectez-vous.
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {decodeURIComponent(error)}
          </div>
        )}

        <form action="/api/auth/login" method="POST" className="space-y-5">
          <input type="hidden" name="returnTo" value={returnTo ?? '/'} />

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
              Adresse email
            </label>
            <input
              type="email" id="email" name="email" required autoComplete="email"
              className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
              Mot de passe
            </label>
            <input
              type="password" id="password" name="password" required autoComplete="current-password"
              className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-gray-900 font-semibold py-2.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-white underline">S'inscrire</Link>
        </p>
        <p className="text-center text-sm text-gray-500 mt-2">
          <Link href="/password-forgot" className="hover:text-gray-300">Mot de passe oublié ?</Link>
        </p>
      </div>
    </div>
  );
}
