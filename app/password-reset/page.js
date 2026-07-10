'use client';
import { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/navbar";
import Toast from "@/components/toast";
import ResetPassword from '@/services/reset-password';

export default function PasswordResetPage() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const GetPassword = (e) => { setPassword(e.target.value); }
    const GetConfirmPassword = (e) => { setConfirmPassword(e.target.value); }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (!token) {
            setError("Lien invalide, demandez un nouveau lien de réinitialisation");
            return;
        }

        const data = { token, newPassword: password };

        try {
            const result = await ResetPassword(data);
            if (result == true) {
                setError("Erreur de connexion au serveur");
            } else if (result.error) {
                setError(result.error);
            } else {
                document.location.href = '/login';
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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </div>
                            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
                                Nouveau mot de passe
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Choisissez un nouveau mot de passe pour votre compte.
                            </p>
                        </div>

                        <div className="mt-8 space-y-5">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                                    Nouveau mot de passe
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={GetPassword}
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        placeholder="Min. 8 caractères, 1 majuscule, 1 chiffre"
                                        className="block w-full rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-100">
                                    Confirmer le mot de passe
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={GetConfirmPassword}
                                        id="password-confirm"
                                        name="password-confirm"
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        className="block w-full rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={(e) => handleSubmit(e)}
                                type="submit"
                                className="flex w-full justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                Réinitialiser le mot de passe
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
