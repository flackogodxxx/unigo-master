'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import {
    FaCar,
    FaTimes,
    FaTachometerAlt,
    FaRoute,
    FaHistory,
    FaUserCircle,
    FaSignOutAlt,
    FaCog,
    FaWallet
} from 'react-icons/fa';
import Image from 'next/image';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    // Fechar o sidebar quando mudar de página
    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    // Impedir o scroll quando o sidebar estiver aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const menuItems = [
        { label: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
        { label: 'Minha Carteira', path: '/wallet', icon: FaWallet },
        { label: 'Buscar Carona', path: '/passenger-dashboard', icon: FaRoute },
        { label: 'Oferecer Carona', path: '/driver-dashboard', icon: FaCar },
        { label: 'Histórico', path: '/ride-history', icon: FaHistory }
    ];

    const handleNavigation = (path: string) => {
        router.push(path);
        onClose();
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userImage');
        router.push('/login');
        onClose();
    };

    const goToProfile = () => {
        router.push('/profile');
        onClose();
    };

    // Obter dados do usuário do localStorage
    const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') || 'Usuário' : 'Usuário';
    const userImage = typeof window !== 'undefined' ? localStorage.getItem('userImage') || '' : '';
    const userRA = typeof window !== 'undefined' ? localStorage.getItem('userRA') || '000000' : '000000';

    // Variáveis de animação para os botões do menu
    const buttonVariants = {
        initial: { opacity: 0, y: 20 },
        animate: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 + index * 0.05, duration: 0.3 }
        }),
        hover: { scale: 1.03, backgroundColor: '#EFF6FF' },
        tap: { scale: 0.97 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-0 top-0 bottom-0 w-72 bg-white shadow-lg z-50 flex flex-col"
                    >
                        {/* Header with logo and close button */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-200">
                            <motion.div
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={() => handleNavigation('/dashboard')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                                    <FaCar className="text-white text-lg" />
                                </div>
                                <span className="text-xl font-bold text-blue-900">UniGo</span>
                            </motion.div>
                            <motion.button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                                whileHover={{ scale: 1.1, backgroundColor: '#E5E7EB' }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Fechar menu"
                            >
                                <FaTimes size={18} />
                            </motion.button>
                        </div>

                        {/* Navigation Menu */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {menuItems.map((item, index) => (
                                <motion.button
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${pathname === item.path
                                        ? 'bg-blue-50 text-blue-900 border border-blue-100'
                                        : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                                        }`}
                                    variants={buttonVariants}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="hover"
                                    whileTap="tap"
                                    custom={index}
                                >
                                    <item.icon className="text-lg" />
                                    <span className="font-medium">{item.label}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* User Profile */}
                        <div className="p-4 border-t border-slate-200">
                            <motion.div
                                className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-100 cursor-pointer"
                                onClick={goToProfile}
                                whileHover={{ scale: 1.02, backgroundColor: '#DBEAFE' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex-shrink-0 mr-3">
                                    {userImage ? (
                                        <motion.div
                                            className="w-12 h-12 rounded-full overflow-hidden border border-slate-200"
                                            whileHover={{ borderColor: '#3B82F6', borderWidth: '2px' }}
                                        >
                                            <Image
                                                src={userImage}
                                                alt={userName}
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center"
                                            whileHover={{ backgroundColor: '#E5E7EB' }}
                                        >
                                            <FaUserCircle className="text-slate-500 text-2xl" />
                                        </motion.div>
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium">{userName}</div>
                                    <div className="text-xs text-slate-500">RA: {userRA}</div>
                                </div>
                                <motion.div
                                    className="ml-auto p-1 rounded-full"
                                    whileHover={{ backgroundColor: '#DBEAFE' }}
                                >
                                    <FaCog size={14} className="text-blue-600" />
                                </motion.div>
                            </motion.div>

                            <motion.button
                                onClick={handleLogout}
                                className="w-full mt-3 p-3 rounded-lg text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 flex items-center justify-center gap-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                                whileHover={{ scale: 1.02, backgroundColor: '#FEF2F2' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaSignOutAlt />
                                <span>Sair</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
