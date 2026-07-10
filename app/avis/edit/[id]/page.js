'use client';
import { useState, useEffect, use } from 'react';
import Link from "next/link";
import Navbar from "@/components/navbar";
import Toast from "@/components/toast";
import { getCookie } from '@/services/cookie';
import { editAvis } from '@/services/avis';

const LABELS = { 1: 'Très mauvais', 2: 'Mauvais', 3: 'Correct', 4: 'Bien', 5: 'Excellent' };

const StarIcon = ({ filled }) => (
    <svg className={`size-7 transition-colors ${filled ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const decodeToken = (token) => {
    if (!token) return null;
    try {
        const payload = token.split('.')[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch {
        return null;
    }
};

export default function EditAvisPage({ params }) {
    const { id } = use(params);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const token = getCookie('token');
        if (!token) {
            document.location.href = '/login';
            return;
        }

        fetch(`http://localhost:3000/avis/${id}`, { cache: 'no-store' })
            .then(res => res.json())
            .then(avis => {
                if (!avis || avis.error) {
                    document.location.href = '/';
                    return;
                }
                const user = decodeToken(token);
                if (!user || user.id !== avis.userId) {
                    document.location.href = `/avis/${id}`;
                    return;
                }
                setRating(avis.rating);
                setDescription(avis.description);
                setLoading(false);
            })
            .catch(() => { document.location.href = '/'; });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (rating === 0) {
            setError("Veuillez sélectionner une note");
            return;
        }
        if (!description.trim()) {
            setError("Veuillez écrire un avis");
            return;
        }

        setSubmitting(true);
        const token = getCookie('token');
        const result = await editAvis(id, { rating, description }, token);
        setSubmitting(false);

        if (result === true) {
            setError("Erreur de connexion au serveur");
        } else if (result.error) {
            setError(result.error);
        } else {
            document.location.href = `/avis/${id}`;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex flex-1 items-center justify-center">
                    <div className="size-8 animate-spin rounded-full border-2 border-white/10 border-t-indigo-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Toast message={error} onClose={() => setError('')} />

            <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 lg:px-8">
                <Link href={`/avis/${id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                    ← Retour à l'avis
                </Link>

                <div className="mt-8 rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
                    <h1 className="text-2xl font-bold text-white">Modifier l'avis</h1>
                    <p className="mt-1 text-sm text-gray-400">Votre avis sera soumis à validation après modification.</p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-100 mb-3">
                                Note
                            </label>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        className="p-1 focus:outline-none"
                                        aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
                                    >
                                        <StarIcon filled={star <= (hover || rating)} />
                                    </button>
                                ))}
                                {(hover || rating) > 0 && (
                                    <span className="ml-3 text-sm text-gray-400">
                                        {LABELS[hover || rating]}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-100">
                                Votre avis
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    rows={5}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    placeholder="Décrivez votre expérience..."
                                    className="block w-full rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex flex-1 justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-50"
                            >
                                {submitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                            </button>
                            <Link
                                href={`/avis/${id}`}
                                className="flex flex-1 justify-center rounded-lg bg-white/5 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
                            >
                                Annuler
                            </Link>
                        </div>
                    </form>
                </div>
            </main>

            <footer className="border-t border-white/10 px-6 py-6 text-center">
                <p className="text-xs text-gray-500">© 2026 MDS Avis</p>
            </footer>
        </div>
    );
}
