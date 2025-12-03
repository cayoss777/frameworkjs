'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Doctor {
    id: string
    email: string
    chat_id: string
    created_at?: string
}

export default function DoctorChatPage() {
    const params = useParams()
    const doctorId = params.id as string

    const [doctor, setDoctor] = useState<Doctor | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (doctorId) {
            fetchDoctor()
        }
    }, [doctorId])

    const fetchDoctor = async () => {
        try {
            const { data, error } = await supabase
                .from('doctors')
                .select('*')
                .eq('id', doctorId)
                .single()

            if (error) throw error

            setDoctor(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-20 h-20 mb-8 mx-auto">
                        <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-gray-300 text-lg font-medium">Cargando...</p>
                </div>
            </div>
        )
    }

    if (error || !doctor) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 text-center">
                    <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-3">Doctor no encontrado</h3>
                    <p className="text-gray-400 mb-6">{error || 'No se pudo cargar la información del doctor.'}</p>
                    <Link
                        href="/doctor"
                        className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
                    >
                        Volver a Doctores
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/doctor"
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Volver</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                                {doctor.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-white font-bold">Dr. {doctor.email.split('@')[0]}</h2>
                                <p className="text-gray-400 text-sm">{doctor.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="max-w-5xl mx-auto p-4 md:p-8">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 min-h-[600px] flex flex-col">
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-white text-2xl font-bold mb-3">Chat con Dr. {doctor.email.split('@')[0]}</h3>
                        <p className="text-gray-400 mb-8">La funcionalidad de chat estará disponible próximamente.</p>
                        <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-green-500/30">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-300 font-medium">Doctor disponible</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
