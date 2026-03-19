'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import EditProfileModal from '../components/EditProfileModal';
import userService, { UserData } from '../services/userService';
import {
    FaUser,
    FaEnvelope,
    FaIdCard,
    FaPhone,
    FaCar,
    FaStar,
    FaEdit,
    FaCamera,
    FaSignOutAlt,
    FaShieldAlt,
    FaBell,
    FaCog,
    FaHistory
} from 'react-icons/fa';
import dynamic from 'next/dynamic';

const BottomNavigation = dynamic(() => import('../components/BottomNavigation'), { ssr: false });

export default function Profile() {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        ra: '',
        phone: '',
        image: '',
        rating: 4.8,
        totalRides: 45,
        isDriver: true
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('userToken');
            if (!token) {
                router.push('/login');
                return;
            }

            const data = await userService.getUserData();
            setUserData(data);
            setIsLoading(false);
        };

        checkAuth();

        // Adicionar listener para atualizações
        const handleUserUpdate = (newData: UserData) => {
            setUserData(newData);
        };

        userService.addListener(handleUserUpdate);

        return () => {
            userService.removeListener(handleUserUpdate);
        };
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userImage');
        router.push('/login');
    };

    const handleEditProfile = () => {
        setIsEditModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-16 md:pb-0">
            <main className="pt-16 md:pt-20 pb-12 px-3 sm:px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Cabeçalho do Perfil */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 mb-6 text-white relative overflow-hidden"
                    >
                        <div className="absolute right-0 top-0 opacity-10">
                            <FaUser size={100} className="transform -rotate-12" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                                <div className="relative">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white/20">
                                        {userData.image ? (
                                            <Image
                                                src={userData.image}
                                                alt={userData.name}
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <FaUser className="w-full h-full p-4 text-white/60" />
                                        )}
                                    </div>
                                    <button
                                        onClick={handleEditProfile}
                                        className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg border-2 border-white"
                                    >
                                        <FaCamera className="text-white text-sm md:text-base" />
                                    </button>
                                </div>

                                <div className="text-center md:text-left flex-grow">
                                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{userData.name}</h1>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm md:text-base">
                                        {userData.isDriver && (
                                            <div className="flex items-center gap-1">
                                                <FaStar className="text-yellow-400" />
                                                <span>{userData.rating}</span>
                                                <span className="text-blue-200">({userData.totalRides} caronas)</span>
                                            </div>
                                        )}
                                        <button
                                            onClick={handleEditProfile}
                                            className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                        >
                                            <FaEdit className="text-sm" />
                                            <span>Editar Perfil</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Informações Pessoais */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-xl shadow-md p-4 md:p-6"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FaUser className="text-blue-600" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800">Informações Pessoais</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-slate-500">Nome Completo</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <FaUser className="text-slate-400" />
                                        <span className="text-slate-700">{userData.name}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-slate-500">E-mail</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <FaEnvelope className="text-slate-400" />
                                        <span className="text-slate-700">{userData.email}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-slate-500">RA</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <FaIdCard className="text-slate-400" />
                                        <span className="text-slate-700">{userData.ra}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-slate-500">Telefone</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <FaPhone className="text-slate-400" />
                                        <span className="text-slate-700">{userData.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Configurações e Ações */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                        >
                            {/* Menu de Ações */}
                            <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaCog className="text-blue-600" />
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-800">Menu Rápido</h2>
                                </div>

                                <div className="space-y-2">
                                    <button
                                        onClick={() => router.push('/ride-history')}
                                        className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
                                    >
                                        <FaHistory className="text-slate-400" />
                                        <span className="text-slate-700">Histórico de Caronas</span>
                                    </button>

                                    <button
                                        onClick={() => alert('Configurações de notificação em desenvolvimento')}
                                        className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
                                    >
                                        <FaBell className="text-slate-400" />
                                        <span className="text-slate-700">Notificações</span>
                                    </button>

                                    <button
                                        onClick={() => alert('Configurações de privacidade em desenvolvimento')}
                                        className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
                                    >
                                        <FaShieldAlt className="text-slate-400" />
                                        <span className="text-slate-700">Privacidade e Segurança</span>
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-left text-red-600"
                                    >
                                        <FaSignOutAlt className="text-red-500" />
                                        <span>Sair da Conta</span>
                                    </button>
                                </div>
                            </div>

                            {userData.isDriver && (
                                <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FaCar className="text-blue-600" />
                                        </div>
                                        <h2 className="text-lg font-bold text-slate-800">Status de Motorista</h2>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600">Avaliação Média</span>
                                            <div className="flex items-center gap-1">
                                                <FaStar className="text-yellow-400" />
                                                <span className="font-medium">{userData.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600">Total de Caronas</span>
                                            <span className="font-medium">{userData.totalRides}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>

            <BottomNavigation />

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                userData={userData}
            />
        </div>
    );
}
