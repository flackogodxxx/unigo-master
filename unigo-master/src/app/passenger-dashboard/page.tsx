'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    FaCar,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaStar,
    FaRoute,
    FaSearch,
    FaHistory,
    FaBookmark,
    FaMapMarked,
    FaUniversity,
    FaPlus,
    FaComments,
    FaSync,
    FaUsers
} from 'react-icons/fa';
import dynamic from 'next/dynamic';
import ChatModal from '../components/ChatModal';
import LocalAds from '../components/LocalAds';

const BottomNavigation = dynamic(() => import('../components/BottomNavigation'), { ssr: false });

// Componente para buscar parâmetros com Suspense
function SearchParamHandler({ onParamFound }: { onParamFound: (destination: string | null) => void }) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const destinationParam = searchParams?.get('destination');
        onParamFound(destinationParam);
    }, [searchParams, onParamFound]);

    return null;
}

export default function PassengerDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [activeTab, setActiveTab] = useState<'avulsas' | 'fixas'>('avulsas');
    const router = useRouter();

    // Estado para busca de carona
    const [searchRide, setSearchRide] = useState({
        origin: '',
        destination: '',
        date: ''
    });

    // Gera data de hoje e amanhã para dados demo
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    // Estado para caronas disponíveis
    const [availableRides] = useState([
        {
            id: 1,
            driver: {
                name: 'Ana Silva',
                rating: 4.8,
                image: '/images/avatar1.jpg',
                totalRides: 45,
                isPrime: true
            },
            origin: 'Praça Mello Peixoto, Centro',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            date: today,
            time: '07:15',
            seats: 3,
            price: 'R$ 4,00',
            priceType: 'fixed' as const
        },
        {
            id: 2,
            driver: {
                name: 'Carlos Souza',
                rating: 4.9,
                image: '/images/avatar2.jpg',
                totalRides: 120
            },
            origin: 'Ourinhos Plaza Shopping',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            date: today,
            time: '07:30',
            seats: 2,
            price: 'R$ 6,00',
            priceType: 'fixed' as const
        },
        {
            id: 3,
            driver: {
                name: 'Mariana Costa',
                rating: 4.7,
                image: '/images/avatar3.jpg',
                totalRides: 37
            },
            origin: 'Santa Casa de Ourinhos',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            date: today,
            time: '18:15',
            seats: 3,
            price: 'A combinar',
            priceType: 'negotiate' as const
        },
        {
            id: 4,
            driver: {
                name: 'Roberto Almeida',
                rating: 4.6,
                image: '/images/avatar4.jpg',
                totalRides: 85
            },
            origin: 'Terminal Rodoviário de Ourinhos',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            date: tomorrow,
            time: '08:00',
            seats: 1,
            price: 'R$ 4,50',
            priceType: 'fixed' as const
        }
    ]);

    // Caronas fixas (mensais)
    const [fixedRides] = useState([
        {
            id: 101,
            driver: { name: 'Fernando Oliveira', rating: 4.9, image: '/images/avatar5.jpg', totalRides: 200 },
            origin: 'Av. Rodrigues Alves, Centro',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            schedule: 'Seg a Sex \u2022 07:00',
            seatsTotal: 4,
            seatsFilled: 3,
            seatsAvailable: 1,
            monthlyPrice: 'R$ 80,00/m\u00eas',
            priceType: 'fixed' as const,
            description: 'Carona fixa di\u00e1ria ida, saio do centro pontualmente \u00e0s 7h. Falta 1 pessoa para completar o carro e dividir os custos!'
        },
        {
            id: 102,
            driver: { name: 'Juliana Mendes', rating: 4.8, image: '/images/avatar6.jpg', totalRides: 150 },
            origin: 'Ourinhos Plaza Shopping',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            schedule: 'Seg a Sex \u2022 07:30 e 17:30',
            seatsTotal: 3,
            seatsFilled: 1,
            seatsAvailable: 2,
            monthlyPrice: 'R$ 120,00/m\u00eas',
            priceType: 'fixed' as const,
            description: 'Ida e volta todo dia. Procuro 2 pessoas para completar o carro. Valor j\u00e1 inclui ida e volta!'
        },
        {
            id: 103,
            driver: { name: 'Pedro Santos', rating: 4.7, image: '/images/avatar3.jpg', totalRides: 90 },
            origin: 'Santa Casa de Ourinhos',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            schedule: 'Seg, Qua, Sex \u2022 19:00',
            seatsTotal: 4,
            seatsFilled: 2,
            seatsAvailable: 2,
            monthlyPrice: 'A combinar',
            priceType: 'negotiate' as const,
            description: 'Carona para aulas noturnas, 3x por semana. Tenho 2 vagas, valor a combinar pelo chat!'
        }
    ]);

    // Chat modal state
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatTarget, setChatTarget] = useState<{ driverName: string; origin: string; destination: string; date: string; time: string; price: string } | null>(null);

    // Estado para caronas agendadas
    const [scheduledRides] = useState([
        {
            id: 1,
            driver: {
                name: 'Rafael Silva',
                rating: 4.7,
                image: '/images/avatar5.jpg'
            },
            origin: 'Praça Mello Peixoto, Centro',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            date: tomorrow,
            time: '07:30',
            price: 'R$ 8,00',
            status: 'confirmada'
        }
    ]);

    // Rotas favoritas
    const favoriteRoutes = [
        {
            id: 1,
            origin: 'Praça Mello Peixoto, Centro',
            destination: 'UNIFIO - Centro Universitário de Ourinhos',
            frequency: '15 caronas/semana'
        },
        {
            id: 2,
            origin: 'UNIFIO - Centro Universitário de Ourinhos',
            destination: 'Terminal Rodoviário de Ourinhos',
            frequency: '12 caronas/semana'
        }
    ];

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('userToken');
            const name = localStorage.getItem('userName');

            if (!token) {
                router.push('/login');
                return;
            }

            setUserName(name || 'Usuário');

            // Definir data padrão como hoje
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            setSearchRide(prev => ({ ...prev, date: formattedDate }));

            setIsLoading(false);
        };

        checkAuth();
    }, [router]);

    const handleDestinationParamFound = (destination: string | null) => {
        if (destination) {
            setSearchRide(prev => ({ ...prev, destination }));
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleOpenChat = (ride: { driver: { name: string }; origin: string; destination: string; date?: string; time: string; price: string; schedule?: string }) => {
        setChatTarget({
            driverName: ride.driver.name,
            origin: ride.origin,
            destination: ride.destination,
            date: ride.date || ride.schedule || '',
            time: ride.time || '',
            price: ride.price
        });
        setIsChatOpen(true);
    };

    const handleConfirmRide = () => {
        // ride confirmed via chat
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
        <div className="min-h-screen bg-slate-50 pb-16">
            <Suspense fallback={null}>
                <SearchParamHandler onParamFound={handleDestinationParamFound} />
            </Suspense>

            <main className="pt-20 pb-12 px-3 sm:px-4">
                <div className="container mx-auto max-w-6xl">
                    {/* Seção de boas-vindas e busca */}
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
                                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Encontre sua Carona</h1>
                                    <p className="text-blue-100">Olá, {userName}! Converse e combine diretamente pelo chat.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">Origem</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                                        <input
                                            type="text"
                                            value={searchRide.origin}
                                            onChange={(e) => setSearchRide({ ...searchRide, origin: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20"
                                            placeholder="De onde você está saindo?"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">Destino</label>
                                    <div className="relative">
                                        <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                                        <input
                                            type="text"
                                            value={searchRide.destination}
                                            onChange={(e) => setSearchRide({ ...searchRide, destination: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20"
                                            placeholder="Para onde você vai?"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">Data</label>
                                    <div className="relative">
                                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                                        <input
                                            type="date"
                                            value={searchRide.date}
                                            onChange={(e) => setSearchRide({ ...searchRide, date: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20 [color-scheme:dark]"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 md:col-span-3">
                                    <motion.button
                                        type="submit"
                                        className="w-full bg-white text-blue-900 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 mt-1 border border-white/50 shadow-md"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaSearch className="text-sm" />
                                        Buscar Caronas
                                    </motion.button>
                                </div>

                                {/* Campus Quick Select */}
                                <div className="sm:col-span-2 md:col-span-3">
                                    <p className="text-xs text-blue-200 mb-2">Destinos rápidos:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { label: 'UNIFIO - Centro Universitário de Ourinhos', icon: <FaUniversity className="text-xs" /> },
                                            { label: 'Terminal Rodoviário de Ourinhos', icon: <FaMapMarkerAlt className="text-xs" /> },
                                            { label: 'Ourinhos Plaza Shopping', icon: <FaMapMarkerAlt className="text-xs" /> },
                                            { label: 'Praça Mello Peixoto, Centro', icon: <FaMapMarkerAlt className="text-xs" /> }
                                        ].map((dest, idx) => (
                                            <motion.button
                                                key={idx}
                                                type="button"
                                                onClick={() => setSearchRide(prev => ({ ...prev, destination: dest.label }))}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs text-white transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {dest.icon}
                                                {dest.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    {/* Free tag */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3"
                    >
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">✓</div>
                        <p className="text-sm text-green-800">
                            <strong>App 100% gratuito!</strong> Sua instituição já cobre o UniGo. Combine valores diretamente com o motorista pelo chat.
                        </p>
                    </motion.div>

                    {/* Tabs: Avulsas / Fixas */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setActiveTab('avulsas')}
                            className={`flex-1 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base leading-tight flex items-center justify-center gap-2 sm:gap-2.5 transition-colors ${
                                activeTab === 'avulsas'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            <FaCar className="text-base" /> Caronas Avulsas
                        </button>
                        <button
                            onClick={() => setActiveTab('fixas')}
                            className={`flex-1 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base leading-tight flex items-center justify-center gap-2 sm:gap-2.5 transition-colors ${
                                activeTab === 'fixas'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            <FaSync className="text-base" /> Caronas Fixas (Mensais)
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
                        <div className="lg:col-span-2">
                          {activeTab === 'avulsas' ? (
                            <>
                            {/* Caronas Disponíveis */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-5 md:mb-8"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800">Caronas Disponíveis</h2>
                                    <motion.button
                                        className="text-blue-600 text-xs md:text-sm font-medium flex items-center"
                                        whileHover={{ x: 3 }}
                                    >
                                        Ver todas <FaRoute className="ml-1" />
                                    </motion.button>
                                </div>

                                <div className="space-y-4">
                                    {availableRides.map((ride) => (
                                        <motion.div
                                            key={ride.id}
                                            className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow relative overflow-hidden"
                                            whileHover={{ y: -2, backgroundColor: '#f8faff' }}
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                                                <div className="flex-shrink-0 flex justify-center mt-2 sm:mt-0">
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
                                                        <span className="text-xs text-slate-500">
                                                            {ride.driver.totalRides} caronas
                                                        </span>
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

                                                <div className="mt-3 sm:mt-0 text-center sm:text-right flex flex-col items-center sm:items-end">
                                                    {ride.priceType === 'negotiate' ? (
                                                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-1">A combinar</span>
                                                    ) : (
                                                        <p className="font-bold text-green-600 mb-1">{ride.price}</p>
                                                    )}
                                                    <p className="text-sm text-slate-600">{ride.seats} vagas</p>
                                                    <motion.button
                                                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium w-full sm:w-auto border border-blue-700 shadow-sm flex items-center gap-2 justify-center"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleOpenChat(ride)}
                                                    >
                                                        <FaComments /> Conversar
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Caronas Agendadas */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-xl shadow-md p-4 md:p-6"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800">Suas Caronas Agendadas</h2>
                                    <motion.button
                                        className="text-blue-600 text-xs md:text-sm font-medium flex items-center"
                                        whileHover={{ x: 3 }}
                                    >
                                        Ver histórico <FaHistory className="ml-1" />
                                    </motion.button>
                                </div>

                                <div className="space-y-4">
                                    {scheduledRides.map((ride) => (
                                        <motion.div
                                            key={ride.id}
                                            className="border border-slate-200 rounded-lg p-4"
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

                                                <div className="mt-3 sm:mt-0 text-center sm:text-right flex flex-col items-center sm:items-end">
                                                    <p className="font-bold text-green-600 mb-1">{ride.price}</p>
                                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                        {ride.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                            </>
                          ) : (
                            /* Caronas Fixas (Mensais) */
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-5"
                            >
                                <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 flex items-start gap-3">
                                    <FaSync className="text-indigo-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-indigo-800">Caronas Fixas Mensais</p>
                                        <p className="text-xs text-indigo-600 mt-1">
                                            Motoristas que fazem o mesmo trajeto todo dia e querem completar as vagas do carro para dividir custos. Ideal para quem tem horários regulares!
                                        </p>
                                    </div>
                                </div>

                                {fixedRides.map((ride) => (
                                    <motion.div
                                        key={ride.id}
                                        className="bg-white rounded-xl shadow-md p-5 border border-slate-200 hover:shadow-lg transition-shadow"
                                        whileHover={{ y: -2 }}
                                    >
                                        <div className="flex flex-col sm:flex-row items-start gap-4">
                                            <div className="flex-shrink-0 mx-auto sm:mx-0">
                                                <Image
                                                    src={ride.driver.image}
                                                    alt={ride.driver.name}
                                                    width={56}
                                                    height={56}
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="flex-grow min-w-0 w-full">
                                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                                    <span className="font-bold text-slate-800">{ride.driver.name}</span>
                                                    <div className="flex items-center text-yellow-500">
                                                        <FaStar className="text-xs" />
                                                        <span className="text-xs ml-1">{ride.driver.rating}</span>
                                                    </div>
                                                    <span className="text-xs text-slate-500">{ride.driver.totalRides} caronas</span>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm mb-2 min-w-0">
                                                    <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                                    <span className="font-medium truncate">{ride.origin} → {ride.destination}</span>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                                                    <FaCalendarAlt className="text-slate-400 flex-shrink-0" />
                                                    <span>{ride.schedule}</span>
                                                </div>

                                                <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 mb-3">{ride.description}</p>

                                                <div className="flex flex-wrap items-center gap-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <FaUsers className="text-blue-500" />
                                                        <div className="flex gap-0.5">
                                                            {Array.from({ length: ride.seatsTotal }).map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`w-3 h-3 rounded-full ${i < ride.seatsFilled ? 'bg-blue-500' : 'bg-slate-200 border border-dashed border-slate-300'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-slate-500">
                                                            {ride.seatsAvailable} {ride.seatsAvailable === 1 ? 'vaga' : 'vagas'}
                                                        </span>
                                                    </div>

                                                    {ride.priceType === 'negotiate' ? (
                                                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">A combinar</span>
                                                    ) : (
                                                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">{ride.monthlyPrice}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 border-t border-slate-100 pt-4">
                                            <motion.button
                                                className="w-full py-3 px-3 bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-md"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleOpenChat({
                                                    driver: ride.driver,
                                                    origin: ride.origin,
                                                    destination: ride.destination,
                                                    schedule: ride.schedule,
                                                    time: '',
                                                    price: ride.monthlyPrice
                                                })}
                                            >
                                                <FaComments /> Conversar com {ride.driver.name.split(' ')[0]}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                          )}
                        </div>

                        <div>
                            {/* Ads Locais */}
                            <LocalAds />

                            {/* Rotas Favoritas */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-xl shadow-md p-4 md:p-6 lg:sticky lg:top-24"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaBookmark className="text-blue-600" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800">Rotas Favoritas</h2>
                                </div>

                                <div className="space-y-3">
                                    {favoriteRoutes.map((route) => (
                                        <motion.div
                                            key={route.id}
                                            className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                                            whileHover={{ x: 3 }}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <FaMapMarked className="text-blue-500 flex-shrink-0" />
                                                <span className="font-medium text-sm truncate">{route.origin}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                                <span className="font-medium text-sm truncate">{route.destination}</span>
                                            </div>
                                            <p className="text-xs text-slate-500">{route.frequency}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <motion.button
                                        className="w-full bg-blue-50 text-blue-700 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 border border-blue-100 shadow-sm"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaPlus className="text-sm" />
                                        Adicionar Rota
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Barra de navegação inferior */}
            <BottomNavigation activeTab="passenger" />

            {/* Chat Modal */}
            {chatTarget && (
                <ChatModal
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    onConfirm={handleConfirmRide}
                    driverName={chatTarget.driverName}
                    rideOrigin={chatTarget.origin}
                    rideDestination={chatTarget.destination}
                    rideDate={chatTarget.date}
                    rideTime={chatTarget.time}
                    ridePrice={chatTarget.price}
                />
            )}
        </div>
    );
}
