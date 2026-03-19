'use client';

import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaCompass,
  FaHistory,
  FaHome,
  FaUser,
  FaWallet,
} from 'react-icons/fa';

interface BottomNavigationProps {
  activeTab?: string;
}

const navItems = [
  {
    path: '/dashboard',
    label: 'Inicio',
    icon: FaHome,
  },
  {
    path: '/passenger-dashboard',
    label: 'Rotas',
    icon: FaCompass,
  },
  {
    path: '/wallet',
    label: 'Impacto',
    icon: FaWallet,
  },
  {
    path: '/ride-history',
    label: 'Historico',
    icon: FaHistory,
  },
  {
    path: '/profile',
    label: 'Conta',
    icon: FaUser,
  },
] as const;

export default function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (!activeTab) {
      return pathname === path;
    }

    const currentKey = path.split('/').pop() || '';
    return (
      currentKey === activeTab ||
      (activeTab === 'passenger' && currentKey === 'passenger-dashboard') ||
      (activeTab === 'driver' && currentKey === 'dashboard')
    );
  };

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => isActive(item.path))
  );

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 px-3 md:hidden"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.7rem)' }}
    >
      <div className="mx-auto max-w-md rounded-[28px] border border-white/75 bg-white/88 px-2 py-2 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.42)] backdrop-blur-xl">
        <div className="relative grid grid-cols-5 gap-1">
          <motion.div
            className="absolute bottom-0 top-0 rounded-[22px] bg-blue-50"
            initial={false}
            animate={{
              width: `calc((100% - 1rem) / ${navItems.length})`,
              x: `calc(${activeIndex * 100}% + ${activeIndex * 0.25}rem)`,
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          />

          {navItems.map((item) => {
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => router.push(item.path)}
                className="relative z-10 flex min-h-[4.3rem] flex-col items-center justify-center gap-1 rounded-[22px] px-1"
                aria-current={active ? 'page' : undefined}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                    active ? 'bg-white text-blue-700' : 'text-slate-500'
                  }`}
                >
                  <item.icon className="text-[1rem]" />
                </div>
                <span
                  className={`text-[0.68rem] font-semibold tracking-[0.04em] ${
                    active ? 'text-blue-800' : 'text-slate-500'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
