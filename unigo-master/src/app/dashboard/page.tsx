'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    FaMapMarkerAlt,
    FaClock,
    FaUser,
    FaCar,
    FaUserFriends,
    FaRoute,
    FaCalendarAlt,
    FaArrowRight,
    FaPlus,
    FaComments
} from 'react-icons/fa';
import dynamic from 'next/dynamic';

const BottomNavigation = dynamic(() => import('../components/BottomNavigation'), { ssr: false });

export default function Dashboard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [activeItem, setActiveItem] = useState<number | null>(null);

    useEffect(() => {
        // Verificar se o usuário está logado
        const userToken = localStorage.getItem('userToken');
        const storedUserName = localStorage.getItem('userName');

        if (!userToken) {
            router.push('/login');
            return;
        }

        if (storedUserName) {
            setUserName(storedUserName);
        }

        setIsLoading(false);
    }, [router]);

    // Simulação de dados de caronas próximas
    const nearbyRides = [
        {
            id: 1,
            origin: 'Praça Mello Peixoto, Centro',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            time: '07:15',
            remainingSeats: 3,
            driver: {
                name: 'Ana Silva',
                rating: 4.8,
                trips: 45
            },
            price: 4
        },
        {
            id: 2,
            origin: 'Ourinhos Plaza Shopping',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            time: '07:30',
            remainingSeats: 2,
            driver: {
                name: 'Carlos Souza',
                rating: 4.9,
                trips: 120
            },
            price: 6
        },
        {
            id: 3,
            origin: 'Santa Casa de Ourinhos',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            time: '18:15',
            remainingSeats: 3,
            driver: {
                name: 'Mariana Costa',
                rating: 4.7,
                trips: 37
            },
            price: 5
        }
    ];

    // Simulação de dados de destinos populares
    const popularDestinations = [
        {
            id: 1,
            name: 'UNIFIO - Centro Universitário de Ourinhos',
            rides: 125
        },
        {
            id: 2,
            name: 'Terminal Rodoviário de Ourinhos',
            rides: 78
        },
        {
            id: 3,
            name: 'Ourinhos Plaza Shopping',
            rides: 56
        }
    ];

    // Simulação de próximas caronas
    const upcomingRides = [
        {
            id: 1,
            type: 'passenger',
            route: 'Praça Mello Peixoto → UNIFIO',
            time: '07:15 • Hoje',
            seats: 1
        },
        {
            id: 2,
            type: 'driver',
            route: 'UNIFIO → Terminal Rodoviário',
            time: '12:30 • Hoje',
            seats: 3
        }
    ];

    // Simulação de carona atual
    const currentRide = {
        id: 1,
        route: 'Av. Rodrigues Alves → UNIFIO',
        driver: 'Você é o motorista',
        remainingTime: '15 minutos',
        passengers: 2
    };

    // Funções para navegação
    const navigateToPassengerDashboard = () => {
        router.push('/passenger-dashboard');
    };

    const navigateToDriverDashboard = () => {
        router.push('/driver-dashboard');
    };

    const navigateToRideDetails = (rideId: number) => {
        router.push(`/ride/${rideId}`);
    };

    const navigateToRideHistory = () => {
        router.push('/ride-history');
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleReserveRide = (e: React.MouseEvent, _rideId: number) => {
        e.stopPropagation();
        router.push('/passenger-dashboard');
    };

    // Variantes de animação
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <main className="pt-20 pb-12 px-3 sm:px-4">
                <motion.div
                    className="container mx-auto max-w-6xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header com gradiente — igual aos outros dashboards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl md:rounded-2xl shadow-lg p-5 md:p-8 mb-6 text-white relative overflow-hidden"
                    >
                        <div className="absolute right-0 top-0 opacity-10">
                            <FaCar size={100} className="transform -rotate-12" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center">
                                    <FaRoute className="text-xl sm:text-2xl text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Olá, {userName}!</h1>
                                    <p className="text-blue-100">Encontre caronas com colegas da UNIFIO — combine pelo chat.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                <motion.button
                                    className="bg-white/10 hover:bg-white/20 rounded-xl p-4 border border-white/30 flex items-center gap-3 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={navigateToPassengerDashboard}
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaRoute className="text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium">Buscar Carona</p>
                                        <p className="text-xs text-blue-100">Encontrar motoristas</p>
                                    </div>
                                </motion.button>

                                <motion.button
                                    className="bg-white/10 hover:bg-white/20 rounded-xl p-4 border border-white/30 flex items-center gap-3 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={navigateToDriverDashboard}
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaCar className="text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium">Oferecer Carona</p>
                                        <p className="text-xs text-blue-100">Criar nova oferta</p>
                                    </div>
                                </motion.button>

                                <motion.button
                                    className="bg-white/10 hover:bg-white/20 rounded-xl p-4 border border-white/30 flex items-center gap-3 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={navigateToRideHistory}
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaCalendarAlt className="text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium">Histórico</p>
                                        <p className="text-xs text-blue-100">Ver caronas anteriores</p>
                                    </div>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {/* Coluna da esquerda */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Carona atual */}
                            {currentRide && (
                                <motion.section
                                    className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200"
                                    variants={itemVariants}
                                >
                                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Sua carona atual</h2>
                                    <motion.div
                                        className="bg-blue-50 rounded-xl p-4 border border-blue-100"
                                        whileHover={{ borderColor: '#3B82F6', transition: { duration: 0.2 } }}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div className="min-w-0">
                                                <h3 className="font-medium text-blue-900 truncate">{currentRide.route}</h3>
                                                <p className="text-sm text-slate-600">{currentRide.driver}</p>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <p className="text-sm font-semibold text-blue-800">Chegada em:</p>
                                                <p className="text-sm text-slate-600">{currentRide.remainingTime}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                                            <div className="flex items-center text-sm text-slate-600">
                                                <FaUserFriends className="mr-1" />
                                                <span>{currentRide.passengers} passageiros</span>
                                            </div>
                                            <motion.button
                                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg font-medium border border-blue-700 shadow-sm"
                                                whileHover={{ scale: 1.05, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => navigateToRideDetails(currentRide.id)}
                                            >
                                                Ver detalhes
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.section>
                            )}

                            {/* Caronas próximas */}
                            <motion.section
                                className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200"
                                variants={itemVariants}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-slate-800">Caronas próximas</h2>
                                    <motion.button
                                        onClick={() => router.push('/passenger-dashboard')}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                        whileHover={{ x: 3 }}
                                    >
                                        Ver todas <FaArrowRight className="ml-1" size={12} />
                                    </motion.button>
                                </div>
                                <div className="space-y-4">
                                    {nearbyRides.map((ride) => (
                                        <motion.div
                                            key={ride.id}
                                            className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
                                            whileHover={{ y: -2, borderColor: '#93C5FD' }}
                                            whileTap={{ y: 0 }}
                                            onClick={() => navigateToRideDetails(ride.id)}
                                            onMouseEnter={() => setActiveItem(ride.id)}
                                            onMouseLeave={() => setActiveItem(null)}
                                        >
                                            <div className="flex flex-col sm:flex-row justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                                            <FaMapMarkerAlt size={16} />
                                                        </div>
                                                        <div className="max-w-full">
                                                            <p className="font-medium text-slate-800 truncate">{ride.origin}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start mt-2">
                                                        <div className="flex-shrink-0 mt-1 mr-2 text-red-500">
                                                            <FaMapMarkerAlt size={16} />
                                                        </div>
                                                        <div className="max-w-full">
                                                            <p className="font-medium text-slate-800 truncate">{ride.destination}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex mt-3 sm:mt-0 sm:flex-col justify-between sm:justify-start text-right sm:ml-4">
                                                    <div className="flex items-center mr-4 sm:mr-0">
                                                        <FaClock className="text-slate-400 mr-1" size={14} />
                                                        <span className="text-sm font-medium">{ride.time}</span>
                                                    </div>
                                                    <div className="flex items-center mr-4 sm:mr-0 sm:mt-1">
                                                        <FaUserFriends className="text-slate-400 mr-1" size={14} />
                                                        <span className="text-sm font-medium">{ride.remainingSeats} vagas</span>
                                                    </div>
                                                    <div className="sm:mt-2">
                                                        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                                                            R$ {ride.price},00
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                                                <div className="flex items-center min-w-0">
                                                    <motion.div
                                                        className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                                                        animate={{
                                                            backgroundColor: activeItem === ride.id ? '#DBEAFE' : '#EFF6FF',
                                                            scale: activeItem === ride.id ? 1.1 : 1
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <FaUser className="text-blue-700" size={14} />
                                                    </motion.div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium truncate">{ride.driver.name}</p>
                                                        <div className="flex items-center text-xs text-slate-500">
                                                            <span className="font-medium text-amber-600">{ride.driver.rating}</span>
                                                            <span className="mx-1">•</span>
                                                            <span>{ride.driver.trips} viagens</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <motion.button
                                                    className="px-4 py-2.5 bg-blue-600 text-white text-sm rounded-xl font-semibold border border-blue-700 shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
                                                    whileHover={{ scale: 1.05, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => handleReserveRide(e, ride.id)}
                                                >
                                                    <FaComments size={14} /> Conversar
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        </div>

                        {/* Coluna da direita */}
                        <div className="space-y-6">
                            {/* Próximas caronas */}
                            <motion.section
                                className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200"
                                variants={itemVariants}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-slate-800">Suas próximas caronas</h2>
                                    <motion.button
                                        onClick={navigateToRideHistory}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                        whileHover={{ x: 3 }}
                                    >
                                        Ver todas <FaArrowRight className="ml-1" size={12} />
                                    </motion.button>
                                </div>
                                {upcomingRides.length > 0 ? (
                                    <div className="space-y-3">
                                        {upcomingRides.map((ride) => (
                                            <motion.div
                                                key={ride.id}
                                                className="bg-white rounded-xl p-3 border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer"
                                                whileHover={{ y: -2, borderColor: '#93C5FD' }}
                                                whileTap={{ y: 0 }}
                                                onClick={() => navigateToRideDetails(ride.id)}
                                            >
                                                <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                                                    <div className="min-w-0">
                                                        <div className="flex items-center min-w-0">
                                                            {ride.type === 'driver' ? (
                                                                <motion.div
                                                                    className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2"
                                                                    whileHover={{ scale: 1.1, backgroundColor: '#DBEAFE' }}
                                                                >
                                                                    <FaCar className="text-blue-700" size={12} />
                                                                </motion.div>
                                                            ) : (
                                                                <motion.div
                                                                    className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2"
                                                                    whileHover={{ scale: 1.1, backgroundColor: '#D1FAE5' }}
                                                                >
                                                                    <FaUser className="text-green-700" size={12} />
                                                                </motion.div>
                                                            )}
                                                            <p className="font-medium text-sm truncate">{ride.route}</p>
                                                        </div>
                                                        <div className="flex items-center mt-1 ml-8">
                                                            <FaCalendarAlt className="text-slate-400 mr-1" size={12} />
                                                            <span className="text-xs text-slate-500">{ride.time}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center">
                                                            <FaUserFriends className="text-slate-400 mr-1" size={12} />
                                                            <span className="text-xs text-slate-500">
                                                                {ride.type === 'driver' ? `${ride.seats} oferecidas` : `${ride.seats} reservada`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-slate-500">Você não tem caronas agendadas</p>
                                        <div className="mt-3 flex justify-center gap-3">
                                            <motion.button
                                                onClick={navigateToPassengerDashboard}
                                                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg font-medium border border-blue-100"
                                                whileHover={{ scale: 1.05, backgroundColor: '#DBEAFE' }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Buscar Carona
                                            </motion.button>
                                            <motion.button
                                                onClick={navigateToDriverDashboard}
                                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg font-medium border border-blue-700"
                                                whileHover={{ scale: 1.05, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Oferecer Carona
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                            </motion.section>

                            {/* Destinos populares */}
                            <motion.section
                                className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200"
                                variants={itemVariants}
                            >
                                <h2 className="text-lg font-semibold text-slate-800 mb-4">Destinos populares</h2>
                                <div className="space-y-3">
                                    {popularDestinations.map((destination) => (
                                        <motion.div
                                            key={destination.id}
                                            className="bg-white rounded-xl p-3 border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all flex justify-between items-center cursor-pointer"
                                            whileHover={{ y: -2, borderColor: '#93C5FD' }}
                                            whileTap={{ y: 0 }}
                                            onClick={() => router.push(`/passenger-dashboard?destination=${encodeURIComponent(destination.name)}`)}
                                        >
                                            <div className="flex items-center min-w-0">
                                                <motion.div
                                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 flex items-center justify-center mr-2 flex-shrink-0"
                                                    whileHover={{ scale: 1.1, backgroundColor: '#DBEAFE' }}
                                                >
                                                    <FaMapMarkerAlt className="text-blue-700" size={14} />
                                                </motion.div>
                                                <p className="font-medium truncate">{destination.name}</p>
                                            </div>
                                            <span className="text-sm text-slate-500">{destination.rides} caronas</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <motion.button
                                        className="w-full py-2 px-4 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-50"
                                        whileHover={{ y: -1, backgroundColor: '#F9FAFB', borderColor: '#CBD5E1' }}
                                        whileTap={{ y: 0 }}
                                        onClick={() => router.push('/passenger-dashboard?new=true')}
                                    >
                                        <FaPlus size={12} />
                                        Adicionar Rota
                                    </motion.button>
                                </div>
                            </motion.section>

                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Barra de navegação inferior */}
            <BottomNavigation />
        </div>
    );
}
