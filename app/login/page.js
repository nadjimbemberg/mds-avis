'use client';
import { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/navbar";
import Toast from "@/components/toast";
import Login from '@/services/login';
import { setCookie } from '@/services/cookie';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const GetEmail = (e) => { setEmail(e.target.value); }
    const GetPassword = (e) => { setPassword(e.target.value); }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError('');

        const data = { email, password };

        try {
            const result = await Login(data);
            if (result == true) {
                setError("Erreur de connexion au serveur");
            } else if (result.error) {
                setError(result.error);
            } else {
                setCookie('token', result.token);
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

            <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-white">
                        Connexion
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Pas encore de compte ?{' '}
                        <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Créer un compte
                        </Link>
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-5">
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                                    Mot de passe
                                </label>
                                <Link href="/password-forgot" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={GetPassword}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
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
                            Se connecter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
