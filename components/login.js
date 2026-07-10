'use client';
import { useState } from 'react';
import Link from "next/link";
import Login from '@/services/login';
import { setCookie } from '@/services/cookie';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const GetEmail = (e) => {
        setEmail(e.target.value);
        console.log(email);
    }

    const GetPassword = (e) => {
        setPassword(e.target.value);
        console.log(password);
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError('');

        const data = {
            email: email,
            password: password,
        }

        try {
            const result = await Login(data);
            if (result == true) {
                setError("Erreur de connexion au serveur");
            } else if (result.error) {
                setError(result.error);
            } else {
                console.log("Connexion réussie");
                setCookie('token', result.token);
                document.location.href = '/';
            }

            console.log(result);
        } catch (error) {
            console.log(error);
            setError("Une erreur est survenue");
        }

    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={GetEmail}
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                                Password
                            </label>
                            <div className="text-sm">
                                <Link href="/password-forgot" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={GetPassword}
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-400 text-center">{error}</p>
                    )}

                    <div>
                        <button
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Not a member?{" "}
                    <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
