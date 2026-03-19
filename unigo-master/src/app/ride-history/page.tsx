'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    FaCar,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaStar,
    FaRoute,
    FaArrowLeft,
    FaHistory,
    FaClock,
    FaUser,
    FaFilter,
    FaAngleDown,
    FaMoneyBillWave,
    FaDownload
} from 'react-icons/fa';
import dynamic from 'next/dynamic';

const BottomNavigation = dynamic(() => import('../components/BottomNavigation'), { ssr: false });

export default function RideHistory() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'passenger' | 'driver'>('passenger');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('Todos');
    const router = useRouter();

    // Datas dinâmicas para demo
    const d = (daysAgo: number) => new Date(Date.now() - daysAgo * 86400000).toISOString().split('T')[0];

    // Estado para histórico de caronas como passageiro
    const [passengerRides] = useState([
        {
            id: 1001,
            origin: 'Praça Mello Peixoto, Centro',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            date: d(1),
            time: '07:30',
            price: 'R$ 4,00',
            status: 'Concluída',
            driver: {
                name: 'Carlos Souza',
                rating: 4.9,
                image: '/images/avatar2.jpg'
            }
        },
        {
            id: 1002,
            origin: 'UNIFIO - Centro Universitário de Ourinhos',
            destination: 'Terminal Rodoviário de Ourinhos',
            date: d(1),
            time: '18:00',
            price: 'R$ 4,00',
            status: 'Concluída',
            driver: {
                name: 'Mariana Costa',
                rating: 4.7,
                image: '/images/avatar3.jpg'
            }
        },
        {
            id: 1003,
            origin: 'Ourinhos Plaza Shopping',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            date: d(2),
            time: '07:15',
            price: 'R$ 5,00',
            status: 'Concluída',
            driver: {
                name: 'Ricardo Alves',
                rating: 4.8,
                image: '/images/avatar5.jpg'
            }
        },
        {
            id: 1004,
            origin: 'Av. Rodrigues Alves, Centro',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            date: d(3),
            time: '07:30',
            price: 'R$ 4,00',
            status: 'Cancelada',
            driver: {
                name: 'Ana Silva',
                rating: 4.8,
                image: '/images/avatar1.jpg'
            }
        }
    ]);

    // Estado para histórico de caronas como motorista
    const [driverRides] = useState([
        {
            id: 2001,
            origin: 'Praça Mello Peixoto, Centro',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            date: d(1),
            time: '07:30',
            passengers: 3,
            earnings: 'R$ 12,00',
            status: 'Concluída'
        },
        {
            id: 2002,
            origin: 'UNIFIO - Centro Universitário de Ourinhos',
            destination: 'Terminal Rodoviário de Ourinhos',
            date: d(1),
            time: '18:00',
            passengers: 4,
            earnings: 'R$ 16,00',
            status: 'Concluída'
        },
        {
            id: 2003,
            origin: 'Santa Casa de Ourinhos',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            date: d(2),
            time: '07:15',
            passengers: 2,
            earnings: 'R$ 10,00',
            status: 'Concluída'
        },
        {
            id: 2004,
            origin: 'Av. Rodrigues Alves, Centro',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            date: d(4),
            time: '07:30',
            passengers: 0,
            earnings: 'R$ 0,00',
            status: 'Cancelada'
        }
    ]);

    // Estatísticas
    const driverStats = {
        totalRides: driverRides.filter(ride => ride.status === 'Concluída').length,
        totalEarnings: 'R$ 38,00',
        totalPassengers: driverRides.reduce((acc, ride) => acc + ride.passengers, 0),
        avgRating: 4.8
    };

    const passengerStats = {
        totalRides: passengerRides.filter(ride => ride.status === 'Concluída').length,
        totalSpent: 'R$ 17,00',
        averagePrice: 'R$ 4,25',
        favoriteDriver: 'Mariana Costa'
    };

    // Opções de mês para filtro
    const monthOptions = ['Todos', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('userToken');

            if (!token) {
                router.push('/login');
                return;
            }

            setIsLoading(false);
        };

        checkAuth();
    }, [router]);

    const getRideStatusClass = (status: string) => {
        switch (status) {
            case 'Concluída':
                return 'bg-green-100 text-green-800';
            case 'Em andamento':
                return 'bg-blue-100 text-blue-800';
            case 'Cancelada':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-slate-100 text-slate-800';
        }
    };

    const handleBackClick = () => {
        router.back();
    };

    const handleFilterToggle = () => {
        setFilterOpen(!filterOpen);
    };

    const handleMonthSelect = (month: string) => {
        setSelectedMonth(month);
        setFilterOpen(false);
    };

    const handleExportData = () => {
        alert('Relatório de histórico exportado com sucesso!');
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
        <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
            <main className="pt-16 md:pt-20 pb-12 px-3 sm:px-4">
                <div className="container mx-auto max-w-6xl">
                    {/* Cabeçalho */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 mb-6 text-white relative overflow-hidden"
                    >
                        <div className="absolute right-0 top-0 opacity-10">
                            <FaHistory size={100} className="transform -rotate-12" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 md:mb-5">
                                <button
                                    onClick={handleBackClick}
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    <FaArrowLeft className="text-white text-sm md:text-base" />
                                </button>
                                <div>
                                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Histórico de Caronas</h1>
                                    <p className="text-sm md:text-base text-amber-100">Visualize todas as suas caronas anteriores</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                                    <motion.button
                                        className={`px-3 md:px-4 py-2 rounded-lg font-medium whitespace-nowrap ${activeTab === 'passenger' ? 'bg-white text-amber-700' : 'bg-white/20 text-white hover:bg-white/30'} transition-colors`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setActiveTab('passenger')}
                                    >
                                        <span className="flex items-center gap-2">
                                            <FaUser className="text-sm" />
                                            Como Passageiro
                                        </span>
                                    </motion.button>
                                    <motion.button
                                        className={`px-3 md:px-4 py-2 rounded-lg font-medium whitespace-nowrap ${activeTab === 'driver' ? 'bg-white text-amber-700' : 'bg-white/20 text-white hover:bg-white/30'} transition-colors`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setActiveTab('driver')}
                                    >
                                        <span className="flex items-center gap-2">
                                            <FaCar className="text-sm" />
                                            Como Motorista
                                        </span>
                                    </motion.button>
                                </div>

                                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                                    <div className="relative">
                                        <motion.button
                                            className="px-3 md:px-4 py-2 rounded-lg font-medium bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center gap-2 whitespace-nowrap"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleFilterToggle}
                                        >
                                            <FaFilter className="text-sm" />
                                            {selectedMonth}
                                            <FaAngleDown className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
                                        </motion.button>

                                        {filterOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-20 w-48 border border-slate-200 max-h-64 overflow-y-auto"
                                            >
                                                {monthOptions.map((month) => (
                                                    <button
                                                        key={month}
                                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${selectedMonth === month ? 'bg-amber-50 text-amber-700 font-medium' : 'text-slate-700'}`}
                                                        onClick={() => handleMonthSelect(month)}
                                                    >
                                                        {month}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>

                                    <motion.button
                                        className="px-3 md:px-4 py-2 rounded-lg font-medium bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center gap-2 whitespace-nowrap"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleExportData}
                                    >
                                        <FaDownload className="text-sm" />
                                        Exportar
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        <div className="lg:col-span-2 space-y-4 md:space-y-6 order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-xl shadow-md p-4 md:p-6"
                            >
                                <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between mb-4">
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800">
                                        {activeTab === 'passenger' ? 'Caronas como Passageiro' : 'Caronas como Motorista'}
                                    </h2>
                                    <p className="text-slate-500 text-sm">
                                        {activeTab === 'passenger'
                                            ? `${passengerRides.length} ${passengerRides.length === 1 ? 'carona' : 'caronas'}`
                                            : `${driverRides.length} ${driverRides.length === 1 ? 'carona' : 'caronas'}`}
                                    </p>
                                </div>

                                {activeTab === 'passenger' ? (
                                    <div className="space-y-4">
                                        {passengerRides.map((ride) => (
                                            <motion.div
                                                key={ride.id}
                                                className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                                whileHover={{ y: -2, backgroundColor: '#f8faff' }}
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                                                    <div className="flex-shrink-0 flex justify-center">
                                                        <Image
                                                            src={ride.driver.image}
                                                            alt={ride.driver.name}
                                                            width={48}
                                                            height={48}
                                                            className="rounded-full"
                                                        />
                                                    </div>

                                                    <div className="flex-grow">
                                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                                            <span className="font-medium">{ride.driver.name}</span>
                                                            <div className="flex items-center text-yellow-500">
                                                                <FaStar className="text-xs" />
                                                                <span className="text-xs ml-1">{ride.driver.rating}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center text-sm text-slate-500 mb-2">
                                                            <FaCalendarAlt className="mr-2 text-slate-400 flex-shrink-0" />
                                                            {new Date(ride.date).toLocaleDateString('pt-BR')} às {ride.time}
                                                        </div>

                                                        <div className="flex items-center gap-2 text-sm max-w-full">
                                                            <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                                            <span className="font-medium truncate">{ride.origin} → {ride.destination}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 sm:mt-0 text-left sm:text-right flex flex-col items-start sm:items-end">
                                                        <p className="font-bold text-green-600 mb-1">{ride.price}</p>
                                                        <span className={`inline-block px-3 py-1 ${getRideStatusClass(ride.status)} text-xs rounded-full`}>
                                                            {ride.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}

                                        {passengerRides.length === 0 && (
                                            <div className="text-center py-8">
                                                <FaUser className="mx-auto text-slate-300 text-4xl mb-3" />
                                                <p className="text-slate-500">Você ainda não utilizou nenhuma carona como passageiro</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                                {driverRides.map((ride) => (
                                                    <motion.div
                                                        key={ride.id}
                                                        className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                                        whileHover={{ y: -2, backgroundColor: '#f8faff' }}
                                                    >
                                                        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                                                            <div className="flex-grow">
                                                                <div className="flex items-center text-sm text-slate-500 mb-2">
                                                                    <FaClock className="mr-2 text-slate-400 flex-shrink-0" />
                                                                    {new Date(ride.date).toLocaleDateString('pt-BR')} às {ride.time}
                                                                </div>

                                                                <div className="flex items-center gap-2 text-sm max-w-full">
                                                                    <FaRoute className="text-blue-500 flex-shrink-0" />
                                                                    <span className="font-medium truncate">{ride.origin} → {ride.destination}</span>
                                                                </div>

                                                                <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                                                                    <FaUser className="flex-shrink-0 text-slate-400" />
                                                                    <span>{ride.passengers} passageiros</span>
                                                                </div>
                                                            </div>

                                                            <div className="mt-3 sm:mt-0 flex flex-row sm:flex-col items-center sm:items-end gap-2">
                                                                <p className="font-bold text-green-600">{ride.earnings}</p>
                                                                <span className={`inline-block px-2 py-1 ${getRideStatusClass(ride.status)} text-xs rounded-full`}>
                                                                    {ride.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}

                                        {driverRides.length === 0 && (
                                            <div className="text-center py-8">
                                                <FaCar className="mx-auto text-slate-300 text-4xl mb-3" />
                                                <p className="text-slate-500">Você ainda não ofereceu nenhuma carona</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:sticky lg:top-24 space-y-4 md:space-y-6 order-1 lg:order-2"
                        >
                            <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <FaHistory className="text-amber-600" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800">Resumo de Atividades</h2>
                                </div>

                                {activeTab === 'passenger' ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-slate-50 rounded-lg p-3 text-center">
                                                <p className="text-xs text-slate-500 mb-1">Total de Caronas</p>
                                                <p className="text-xl font-bold text-amber-700">{passengerStats.totalRides}</p>
                                            </div>
                                            <div className="bg-slate-50 rounded-lg p-3 text-center">
                                                <p className="text-xs text-slate-500 mb-1">Total Gasto</p>
                                                <p className="text-xl font-bold text-amber-700">{passengerStats.totalSpent}</p>
                                            </div>
                                        </div>

                                        <div className="bg-amber-50 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaCar className="text-amber-600" />
                                                <h3 className="font-medium text-amber-800">Estatísticas de Uso</h3>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm flex justify-between">
                                                    <span>Preço médio:</span>
                                                    <span className="font-medium">{passengerStats.averagePrice}</span>
                                                </p>
                                                <p className="text-sm flex justify-between">
                                                    <span>Motorista favorito:</span>
                                                    <span className="font-medium">{passengerStats.favoriteDriver}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mt-4">
                                            <p className="text-sm text-slate-600 font-medium">Distribuição de Status:</p>
                                            <div className="w-full bg-slate-100 rounded-full h-2.5">
                                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-slate-500">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span>Concluídas (75%)</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                    <span>Canceladas (25%)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-slate-50 rounded-lg p-3 text-center">
                                                <p className="text-xs text-slate-500 mb-1">Caronas</p>
                                                <p className="text-xl font-bold text-amber-700">{driverStats.totalRides}</p>
                                            </div>
                                            <div className="bg-slate-50 rounded-lg p-3 text-center">
                                                <p className="text-xs text-slate-500 mb-1">Passageiros</p>
                                                <p className="text-xl font-bold text-amber-700">{driverStats.totalPassengers}</p>
                                            </div>
                                        </div>

                                        <div className="bg-amber-50 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaMoneyBillWave className="text-amber-600" />
                                                <h3 className="font-medium text-amber-800">Ganhos</h3>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm flex justify-between">
                                                    <span>Total ganho:</span>
                                                    <span className="font-medium">{driverStats.totalEarnings}</span>
                                                </p>
                                                <p className="text-sm flex justify-between">
                                                    <span>Avaliação média:</span>
                                                    <span className="font-medium flex items-center">
                                                        {driverStats.avgRating}
                                                        <FaStar className="text-yellow-500 ml-1 text-xs" />
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mt-4">
                                            <p className="text-sm text-slate-600 font-medium">Distribuição de Status:</p>
                                            <div className="w-full bg-slate-100 rounded-full h-2.5">
                                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-slate-500">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span>Concluídas (75%)</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                    <span>Canceladas (25%)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <BottomNavigation />
        </div>
    );
}
