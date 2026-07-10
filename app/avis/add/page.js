'use client';
import { useState } from 'react';
import Navbar from "@/components/navbar";
import Toast from "@/components/toast";
import { addAvis } from '@/services/avis';
import { getCookie } from '@/services/cookie';

export default function AddAvisPage() {

    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const GetAuthor = (e) => { setAuthor(e.target.value); }
    const GetEmail = (e) => { setEmail(e.target.value); }
    const GetDescription = (e) => { setDescription(e.target.value); }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError('');

        if (rating === 0) {
            setError("Veuillez sélectionner une note");
            return;
        }

        const data = { author, email, rating, description };
        const token = getCookie('token');

        try {
            const result = await addAvis(data, token);
            if (result == true) {
                setError("Erreur de connexion au serveur");
            } else if (result.error) {
                setError(result.error);
            } else {
                document.location.href = '/';
            }
            console.log(result);
        } catch (err) {
            console.log(err);
            setError("Une erreur est survenue");
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Toast message={error} onClose={() => setError('')} />

            <main className="mx-auto w-full max-w-xl flex-1 px-6 py-12 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Laisser un avis</h1>
                    <p className="mt-1 text-sm text-gray-400">Votre avis sera visible après validation.</p>
                </div>

                <div className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-100">
                                Votre nom
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={GetAuthor}
                                    id="author"
                                    name="author"
                                    type="text"
                                    required
                                    placeholder="Jean Dupont"
                                    className="block w-full rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={GetEmail}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="vous@exemple.com"
                                    className="block w-full rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-100 mb-3">
                                Note
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="focus:outline-none"
                                        aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
                                    >
                                        <svg
                                            className={`size-9 transition-colors ${star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-600"}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </button>
                                ))}
                                {rating > 0 && (
                                    <span className="self-center ml-2 text-sm text-gray-400">
                                        {['', 'Très mauvais', 'Mauvais', 'Moyen', 'Bien', 'Excellent'][rating]}
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
                                    onChange={GetDescription}
                                    id="description"
                                    name="description"
                                    rows={5}
                                    required
                                    placeholder="Partagez votre expérience en détail..."
                                    className="block w-full rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                />
                            </div>
                        </div>

                        <button
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            className="flex w-full justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            Soumettre l'avis
                        </button>
                    </div>
                </div>
            </main>

            <footer className="border-t border-white/10 px-6 py-6 text-center">
                <p className="text-xs text-gray-500">© 2026 MDS Avis</p>
            </footer>
        </div>
    );
}
