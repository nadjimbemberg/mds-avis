import Navbar from "@/components/navbar";
import Link from "next/link";

const StarIcon = ({ filled }) => (
    <svg className={`size-4 ${filled ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

async function getAvis() {
    try {
        const res = await fetch("http://localhost:3000/avis?authorized=true", { cache: 'no-store' });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export default async function Home() {
    const data = await getAvis();
    const avis = data?.data || [];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="border-b border-white/10 bg-gray-900 px-6 py-16 text-center lg:py-24">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Les avis de nos membres
                </h1>
                <p className="mt-4 text-lg text-gray-400">
                    Découvrez ce que nos membres pensent et partagez votre expérience.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/avis/add"
                        className="rounded-md bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
                    >
                        Laisser un avis
                    </Link>
                    <span className="text-sm text-gray-500">
                        {avis.length} avis publié{avis.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </section>

            {/* Liste */}
            <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 lg:px-8">
                {avis.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-white/5">
                            <svg className="size-8 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                        </div>
                        <p className="mt-4 text-gray-400">Aucun avis pour le moment.</p>
                        <Link href="/avis/add" className="mt-4 text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                            Soyez le premier à laisser un avis →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {avis.map((item) => (
                            <Link
                                key={item.id}
                                href={`/avis/${item.id}`}
                                className="group flex flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-white/20"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                                            {item.author.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="truncate text-sm font-semibold text-white">
                                            {item.author}
                                        </span>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon key={star} filled={star <= item.rating} />
                                        ))}
                                    </div>
                                </div>

                                <p className="mt-4 flex-1 text-sm text-gray-400 line-clamp-3">
                                    {item.description}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        {new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                    <span className="text-xs font-medium text-indigo-400 group-hover:text-indigo-300">
                                        Lire →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 px-6 py-6 text-center">
                <p className="text-xs text-gray-500">© 2026 MDS Avis — Tous droits réservés</p>
            </footer>
        </div>
    );
}
