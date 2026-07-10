'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import Navbar from "@/components/navbar";
import Toast from "@/components/toast";
import { getCookie } from '@/services/cookie';
import ChangePassword from '@/services/change-password';

export default function ProfilePage() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [pwError, setPwError] = useState('');
    const [pwSuccess, setPwSuccess] = useState('');
    const [pwLoading, setPwLoading] = useState(false);

    useEffect(() => {
        const token = getCookie('token');
        if (!token) {
            document.location.href = '/login';
            return;
        }

        fetch("http://localhost:3000/me", {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    document.location.href = '/login';
                } else {
                    setUser(data);
                    setLoading(false);
                }
            })
            .catch(() => {
                document.location.href = '/login';
            });
    }, []);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPwError('');
        setPwSuccess('');

        if (newPassword !== confirmNewPassword) {
            setPwError("Les nouveaux mots de passe ne correspondent pas");
            return;
        }

        setPwLoading(true);
        const token = getCookie('token');
        const result = await ChangePassword({ oldPassword, newPassword }, token);
        setPwLoading(false);

        if (result === true) {
            setPwError("Erreur de connexion au serveur");
        } else if (result.error) {
            setPwError(result.error);
        } else {
            setPwSuccess("Mot de passe modifié avec succès !");
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
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
            <Toast message={pwError} onClose={() => setPwError('')} />

            <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 lg:px-8">
                <h1 className="text-2xl font-bold text-white mb-8">Mon profil</h1>

                {/* Infos du compte */}
                <div className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
                    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                        <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-3xl font-bold text-white">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-white">{user.username}</h2>
                            <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl bg-white/5 p-4">
                            <p className="text-xs text-gray-500">Membre depuis</p>
                            <p className="mt-1 text-sm font-medium text-white">
                                {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </p>
                        </div>
                        <div className="rounded-xl bg-white/5 p-4">
                            <p className="text-xs text-gray-500">Statut</p>
                            <p className="mt-1 text-sm font-medium">
                                {user.isVerified ? (
                                    <span className="text-green-400">Vérifié ✓</span>
                                ) : (
                                    <span className="text-yellow-400">Non vérifié</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions rapides */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/avis/add"
                        className="flex justify-center rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
                    >
                        Laisser un avis
                    </Link>
                    <Link
                        href="/"
                        className="flex justify-center rounded-lg bg-white/5 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
                    >
                        Voir tous les avis
                    </Link>
                </div>

                {/* Changer le mot de passe */}
                <div className="mt-8 rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
                    <h3 className="text-lg font-semibold text-white">Changer le mot de passe</h3>
                    <p className="mt-1 text-sm text-gray-400">Votre nouveau mot de passe doit contenir au moins 8 caractères.</p>

                    {pwSuccess && (
                        <div className="mt-4 rounded-lg bg-green-500/10 px-4 py-3 ring-1 ring-green-500/30">
                            <p className="text-sm text-green-400">{pwSuccess}</p>
                        </div>
                    )}

                    <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="old-password" className="block text-sm font-medium text-gray-100">
                                Mot de passe actuel
                            </label>
                            <div className="mt-2">
                                <input
                                    id="old-password"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="block w-full rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-100">
                                Nouveau mot de passe
                            </label>
                            <div className="mt-2">
                                <input
                                    id="new-password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    placeholder="Min. 8 caractères"
                                    className="block w-full rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-100">
                                Confirmer le nouveau mot de passe
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirm-new-password"
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="block w-full rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={pwLoading}
                                className="flex w-full justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-50 sm:w-auto"
                            >
                                {pwLoading ? 'Enregistrement...' : 'Mettre à jour le mot de passe'}
                            </button>
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
