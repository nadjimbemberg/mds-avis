type Props = { searchParams: { error?: string; success?: string } };

export default function ForgotPasswordPage({ searchParams }: Props) {
  const { error, success } = searchParams;

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-white mb-2">Mot de passe oublié</h1>
        <p className="text-center text-gray-400 text-sm mb-8">
          Entrez votre email, nous vous enverrons un lien de réinitialisation.
        </p>

        {success && (
          <div className="mb-4 rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
            {decodeURIComponent(success)}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {decodeURIComponent(error)}
          </div>
        )}

        {!success && (
          <form action="/api/auth/forgot-password" method="POST" className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                Adresse email
              </label>
              <input
                type="email" id="email" name="email" required autoComplete="email"
                className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-gray-900 font-semibold py-2.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              Envoyer le lien
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
