'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import Link from 'next/link'

interface Doctor {
    id: string
    email: string
    chat_id: string
    created_at?: string
}

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchDoctors()
    }, [])

    const fetchDoctors = async () => {
        try {
            const { data, error } = await supabase
                .from('doctors')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            setDoctors(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Generar color único basado en el email
    const getGradientColors = (email: string) => {
        const colors = [
            'from-purple-500 to-pink-500',
            'from-blue-500 to-cyan-500',
            'from-green-500 to-emerald-500',
            'from-orange-500 to-red-500',
            'from-indigo-500 to-purple-500',
            'from-pink-500 to-rose-500',
        ]
        const index = email.charCodeAt(0) % colors.length
        return colors[index]
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Premium */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-6">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text text-sm font-bold tracking-wider uppercase">
                            Atención Médica Premium
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                        Encuentra tu <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Especialista</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Conecta con profesionales de la salud certificados. Agenda tu cita en segundos y recibe atención personalizada.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="relative w-20 h-20 mb-8">
                            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-300 text-lg font-medium">Cargando especialistas...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-red-400 font-semibold text-lg mb-1">Error al cargar</h3>
                                    <p className="text-red-300/80 text-sm">{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Doctors Grid */}
                {!loading && !error && doctors.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {doctors.map((doctor, index) => (
                                <div
                                    key={doctor.id}
                                    className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2"
                                    style={{
                                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                                    }}
                                >
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-3xl transition-all duration-500"></div>

                                    <div className="relative z-10">
                                        {/* Avatar */}
                                        <div className="flex justify-center mb-6">
                                            <div className="relative">
                                                <div className={`w-32 h-32 bg-gradient-to-br ${getGradientColors(doctor.email)} rounded-2xl flex items-center justify-center text-white text-5xl font-bold shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                                    {doctor.email.charAt(0).toUpperCase()}
                                                </div>
                                                {/* Online badge */}
                                                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                                Dr. {doctor.email.split('@')[0]}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4">{doctor.email}</p>

                                            <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-500/30">
                                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                                <span className="text-purple-300 text-sm font-medium">Disponible Ahora</span>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-3 mb-6">
                                            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                                                <p className="text-2xl font-bold text-white mb-1">5+</p>
                                                <p className="text-gray-400 text-xs">Años</p>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                                                <p className="text-2xl font-bold text-white mb-1">500+</p>
                                                <p className="text-gray-400 text-xs">Pacientes</p>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                                                <p className="text-2xl font-bold text-white mb-1">4.9</p>
                                                <p className="text-gray-400 text-xs">Rating</p>
                                            </div>
                                        </div>

                                        {/* CTA Button - Destacado */}
                                        <Link
                                            href={`/doctor/${doctor.id}/chat`}
                                            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 group-hover:animate-pulse"
                                        >
                                            <span className="flex items-center justify-center gap-3">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                                <span className="text-lg">Agendar Cita</span>
                                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Stats */}
                        <div className="text-center">
                            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/10">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-gray-300">
                                    <span className="font-bold text-white text-xl">{doctors.length}</span> especialistas disponibles
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* Empty State */}
                {!loading && !error && doctors.length === 0 && (
                    <div className="text-center py-32">
                        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
                            <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-white text-2xl font-bold mb-3">No hay doctores disponibles</h3>
                            <p className="text-gray-400">Vuelve pronto para ver nuestros especialistas.</p>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    )
}
