'use client';
import { useState, useEffect } from 'react';
import { getCookie } from '@/services/cookie';
import { deleteAvis } from '@/services/avis';

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

export default function AvisActions({ avisId, avisUserId }) {
    const [isOwner, setIsOwner] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = getCookie('token');
        if (!token) return;
        const user = decodeToken(token);
        if (user && user.id === avisUserId) {
            setIsOwner(true);
        }
    }, [avisUserId]);

    if (!isOwner) return null;

    const handleDelete = async () => {
        setDeleting(true);
        setError('');
        const token = getCookie('token');
        const result = await deleteAvis(avisId, token);
        if (result === true || result.error) {
            setError(result.error || "Erreur lors de la suppression");
            setDeleting(false);
            setShowConfirm(false);
        } else {
            document.location.href = '/';
        }
    };

    return (
        <div className="mt-6 border-t border-white/10 pt-6">
            {error && (
                <p className="mb-4 text-sm text-red-400">{error}</p>
            )}

            {!showConfirm ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                        href={`/avis/edit/${avisId}`}
                        className="flex justify-center items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
                    >
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                        </svg>
                        Modifier
                    </a>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="flex justify-center items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 ring-1 ring-red-500/30 hover:bg-red-500/20"
                    >
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        Supprimer
                    </button>
                </div>
            ) : (
                <div className="rounded-xl bg-red-500/10 p-4 ring-1 ring-red-500/30">
                    <p className="text-sm text-red-300 font-medium">Confirmer la suppression ?</p>
                    <p className="mt-1 text-xs text-red-400">Cette action est irréversible.</p>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="flex justify-center rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400 disabled:opacity-50"
                        >
                            {deleting ? 'Suppression...' : 'Oui, supprimer'}
                        </button>
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="flex justify-center rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 ring-1 ring-white/10 hover:bg-white/10"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
