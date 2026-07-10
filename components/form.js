'use client';
import { useState } from 'react';
import Register from '@/services/register';

export default function RegisterPages() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const GetName = (e) => {
        setName(e.target.value);
        console.log(name);
    }

    const GetEmail = (e) => {
        setEmail(e.target.value);
        console.log(email);
    }

    const GetPassword = (e) => {
        setPassword(e.target.value);
        console.log(password);
    }

    const GetConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        console.log(confirmPassword);
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        const data = {
            username: name,
            email: email,
            password: password,
        }

        try {
            const result = await Register(data);
            if (result == true) {
                setError("Erreur de connexion au serveur");
            } else if (result.error) {
                setError(result.error);
            } else {
                console.log("Inscription réussie");
                document.location.href = '/login';
            }

            console.log(result);
        } catch (error) {
            console.log(error);
            setError("Une erreur est survenue");
        }

    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Create your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="member-name" className="block text-sm/6 font-medium text-gray-100">
                                Member name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={GetName}
                                    id="member-name"
                                    name="member-name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

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
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={GetPassword}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-100">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={GetConfirmPassword}
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    required
                                    autoComplete="new-password"
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
                                Sign up
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
