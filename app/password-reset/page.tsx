type Props = { searchParams: { error?: string; token?: string } };

export default function ResetPasswordPage({ searchParams }: Props) {
  const { error, token } = searchParams;

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-white mb-8">Nouveau mot de passe</h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {decodeURIComponent(error)}
          </div>
        )}

        <form action="/api/auth/reset-password" method="POST" className="space-y-5">
          <input type="hidden" name="token" value={token ?? ''} />

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1.5">
              Nouveau mot de passe
            </label>
            <input
              type="password" id="newPassword" name="newPassword" required autoComplete="new-password"
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
            Réinitialiser
          </button>
        </form>
      </div>
    </div>
  );
}
