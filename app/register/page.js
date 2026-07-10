'use client';
import { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/navbar";
import Toast from "@/components/toast";
import Register from '@/services/register';

export default function RegisterPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const GetName = (e) => { setName(e.target.value); }
    const GetEmail = (e) => { setEmail(e.target.value); }
    const GetPassword = (e) => { setPassword(e.target.value); }
    const GetConfirmPassword = (e) => { setConfirmPassword(e.target.value); }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        const data = { username: name, email, password };

        try {
            const result = await Register(data);
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
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-white">
                        Créer un compte
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Déjà membre ?{' '}
                        <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Se connecter
                        </Link>
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="member-name" className="block text-sm font-medium text-gray-100">
                                Nom d'utilisateur
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={GetName}
                                    id="member-name"
                                    name="member-name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    placeholder="johndoe"
                                    className="block w-full rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

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

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                                Mot de passe
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
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-100">
                                Confirmer le mot de passe
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={GetConfirmPassword}
                                    id="confirm-password"
                                    name="confirm-password"
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
                            className="mt-2 flex w-full justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            Créer mon compte
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
