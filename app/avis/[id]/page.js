import Link from "next/link";
import Navbar from "@/components/navbar";

export default async function AvisPage({ params }) {
  const { id } = await params;

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <div className="mb-6">
          <Link href="/" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
            &larr; Back to all reviews
          </Link>
        </div>

        <article className="rounded-2xl bg-white/5 p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Avis #{id}
            </h1>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`size-5 ${star <= 4 ? "text-yellow-400" : "text-gray-600"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
              U
            </div>
            <div>
              <p className="text-sm font-medium text-white">User</p>
              <p className="text-xs text-gray-400">Published on June 29, 2026</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-base/7 text-gray-300">
              This is a placeholder review for avis #{id}. Replace this content with real data from your database.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
