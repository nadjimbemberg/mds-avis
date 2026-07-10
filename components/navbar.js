'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { getCookie, deleteCookie } from '@/services/cookie'

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setIsLoggedIn(!!getCookie('token'))
    }, [])

    const handleLogout = () => {
        deleteCookie('token')
        document.location.href = '/login'
    }

    return (
        <header className="bg-gray-900 border-b border-white/10">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 text-white font-bold text-lg tracking-tight">
                        MDS Avis
                    </Link>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>

                <div className="hidden lg:flex lg:gap-x-10">
                    <Link href="/" className="text-sm/6 font-semibold text-gray-300 hover:text-white">
                        Accueil
                    </Link>
                    <Link href="/avis/add" className="text-sm/6 font-semibold text-gray-300 hover:text-white">
                        Ajouter un avis
                    </Link>
                    {isLoggedIn && (
                        <Link href="/profile" className="text-sm/6 font-semibold text-gray-300 hover:text-white">
                            Mon profil
                        </Link>
                    )}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="text-sm/6 font-semibold text-gray-300 hover:text-white"
                        >
                            Se déconnecter <span aria-hidden="true">&rarr;</span>
                        </button>
                    ) : (
                        <Link href="/login" className="text-sm/6 font-semibold text-gray-300 hover:text-white">
                            Se connecter <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )}
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5 text-white font-bold text-lg">
                            MDS Avis
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-400"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-300 hover:bg-white/5"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Accueil
                                </Link>
                                <Link
                                    href="/avis/add"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-300 hover:bg-white/5"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Ajouter un avis
                                </Link>
                                {isLoggedIn && (
                                    <Link
                                        href="/profile"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-300 hover:bg-white/5"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Mon profil
                                    </Link>
                                )}
                            </div>
                            <div className="py-6">
                                {isLoggedIn ? (
                                    <button
                                        onClick={handleLogout}
                                        className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-300 hover:bg-white/5"
                                    >
                                        Se déconnecter
                                    </button>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-300 hover:bg-white/5"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Se connecter
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
