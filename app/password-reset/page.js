import Link from "next/link";
import Navbar from "@/components/navbar";

export default function PasswordResetPage() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="rounded-2xl bg-white/5 px-6 py-12 shadow-sm ring-1 ring-white/10 sm:px-12">
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-indigo-500/10">
                <svg className="size-6 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h2 className="mt-6 text-2xl/9 font-bold tracking-tight text-white">
                Reset your password
              </h2>
              <p className="mt-2 text-sm/6 text-gray-400">
                Choose a new password for your account.
              </p>
            </div>

            <form action="#" method="POST" className="mt-8 space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  New password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="new-password"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password-confirm" className="block text-sm/6 font-medium text-gray-100">
                  Confirm new password
                </label>
                <div className="mt-2">
                  <input
                    id="password-confirm"
                    name="password-confirm"
                    type="password"
                    required
                    autoComplete="new-password"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Reset password
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm/6 text-gray-400">
              Remember your password?{" "}
              <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Back to sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
