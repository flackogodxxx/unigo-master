'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    FaHome,
    FaSearch,
    FaCar,
    FaHistory,
    FaUser
} from 'react-icons/fa';

interface BottomNavigationProps {
    activeTab?: string;
}

export default function BottomNavigation({ activeTab }: BottomNavigationProps) {
    const router = useRouter();
    const pathname = usePathname();

    // Definir itens de navegação com componentes de ícones diretamente
    const navItems = [
        {
            path: '/dashboard',
            label: 'Início',
            icon: () => <FaHome size={22} />
        },
        {
            path: '/passenger-dashboard',
            label: 'Buscar',
            icon: () => <FaSearch size={22} />
        },
        {
            path: '/driver-dashboard',
            label: 'Oferecer',
            icon: () => <FaCar size={22} />
        },
        {
            path: '/ride-history',
            label: 'Histórico',
            icon: () => <FaHistory size={22} />
        },
        {
            path: '/profile',
            label: 'Perfil',
            icon: () => <FaUser size={22} />
        }
    ];

    // Navegar para a página selecionada
    const navigateTo = (path: string) => {
        router.push(path);
    };

    // Verificar se o caminho atual corresponde ao item de navegação
    const isActive = (path: string) => {
        if (activeTab) {
            // Se activeTab foi fornecido, compare com a parte do caminho após a última '/'
            const tabName = path.split('/').pop() || '';
            return tabName === activeTab || (activeTab === 'passenger' && tabName === 'passenger-dashboard') ||
                (activeTab === 'driver' && tabName === 'driver-dashboard');
        }
        return pathname === path;
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30">
            <div className="flex justify-around py-2">
                {navItems.map((item) => {
                    const active = isActive(item.path);

                    return (
                        <button
                            key={item.path}
                            className="flex flex-col items-center justify-center w-1/5"
                            onClick={() => navigateTo(item.path)}
                        >
                            <div className={active ? 'text-blue-600' : 'text-slate-500'}>
                                {item.icon()}
                            </div>

                            <span className={`text-xs mt-1 ${active ? 'text-blue-600 font-medium' : 'text-slate-500'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Indicador sutil de página atual */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-100">
                <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: '20%', x: '0%' }}
                    animate={{
                        width: '20%',
                        x: `${navItems.findIndex(item => isActive(item.path)) * 100}%`
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
            </div>
        </div>
    );
}
