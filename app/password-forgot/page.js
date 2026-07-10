'use client';
import { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/navbar";
import Toast from "@/components/toast";
import ForgotPassword from '@/services/forgot-password';

export default function PasswordForgotPage() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const GetEmail = (e) => { setEmail(e.target.value); }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError('');
        setMessage('');

        const data = { email };

        try {
            const result = await ForgotPassword(data);
            if (result == true) {
                setError("Erreur de connexion au serveur");
            } else if (result.error) {
                setError(result.error);
            } else {
                setMessage(result.message);
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

            <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="rounded-2xl bg-white/5 px-8 py-10 ring-1 ring-white/10">
                        <div className="text-center">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-indigo-500/10">
                                <svg className="size-6 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
                                Mot de passe oublié ?
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Entrez votre email, on vous envoie un lien de réinitialisation.
                            </p>
                        </div>

                        {message && (
                            <div className="mt-6 rounded-lg bg-green-500/10 px-4 py-3 ring-1 ring-green-500/30">
                                <p className="text-sm text-green-400 text-center">{message}</p>
                            </div>
                        )}

                        <div className="mt-8 space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                                    Adresse email
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={GetEmail}
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="vous@exemple.com"
                                        className="block w-full rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={(e) => handleSubmit(e)}
                                type="submit"
                                className="flex w-full justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                Envoyer le lien
                            </button>
                        </div>

                        <p className="mt-6 text-center text-sm text-gray-400">
                            Vous vous souvenez ?{' '}
                            <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                Retour à la connexion
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
