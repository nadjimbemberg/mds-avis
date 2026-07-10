import Link from "next/link";
import Navbar from "@/components/navbar";
import AvisActions from "@/components/avis-actions";

const StarIcon = ({ filled }) => (
    <svg className={`size-5 ${filled ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

async function getAvisById(id) {
    try {
        const res = await fetch(`http://localhost:3000/avis/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export default async function AvisPage({ params }) {
    const { id } = await params;
    const avis = await getAvisById(id);

    if (!avis || avis.error) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                    <p className="text-4xl font-bold text-white">404</p>
                    <p className="mt-2 text-gray-400">Avis introuvable.</p>
                    <Link href="/" className="mt-6 text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                        ← Retour aux avis
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 lg:px-8">
                <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                    ← Retour aux avis
                </Link>

                <article className="mt-8 rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-lg font-bold text-white">
                                {avis.author.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-white">{avis.author}</h1>
                                <p className="text-sm text-gray-400">
                                    {new Date(avis.date).toLocaleDateString('fr-FR', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon key={star} filled={star <= avis.rating} />
                            ))}
                        </div>
                    </div>

                    {/* Séparateur */}
                    <div className="my-6 border-t border-white/10" />

                    {/* Contenu */}
                    <p className="text-base leading-7 text-gray-300">{avis.description}</p>

                    {/* Footer */}
                    {avis.user && (
                        <p className="mt-6 text-xs text-gray-500">
                            Publié par <span className="text-gray-400">{avis.user.username}</span>
                        </p>
                    )}

                    <AvisActions avisId={avis.id} avisUserId={avis.userId} />
                </article>
            </main>

            <footer className="border-t border-white/10 px-6 py-6 text-center">
                <p className="text-xs text-gray-500">© 2026 MDS Avis</p>
            </footer>
        </div>
    );
}
