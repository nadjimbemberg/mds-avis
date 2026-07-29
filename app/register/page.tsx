import Link from 'next/link';

type Props = { searchParams: { error?: string; username?: string; email?: string } };

export default function RegisterPage({ searchParams }: Props) {
  const { error, username, email } = searchParams;

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-white mb-8">Créer un compte</h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {decodeURIComponent(error)}
          </div>
        )}

        <form action="/api/auth/register" method="POST" className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1.5">
              Nom d'utilisateur
            </label>
            <input
              type="text" id="username" name="username" required defaultValue={username}
              className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
              Adresse email
            </label>
            <input
              type="email" id="email" name="email" required autoComplete="email" defaultValue={email}
              className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
              Mot de passe
            </label>
            <input
              type="password" id="password" name="password" required autoComplete="new-password"
              className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
            />
            <p className="text-xs text-gray-500 mt-1">Min. 8 caractères, 1 majuscule, 1 chiffre</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5">
              Confirmer le mot de passe
            </label>
            <input
              type="password" id="confirmPassword" name="confirmPassword" required autoComplete="new-password"
              className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-gray-900 font-semibold py-2.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            Créer mon compte
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-white underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
