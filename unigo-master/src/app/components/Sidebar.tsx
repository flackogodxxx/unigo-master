'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaCog,
  FaCompass,
  FaHistory,
  FaSignOutAlt,
  FaTimes,
  FaUser,
  FaWallet,
} from 'react-icons/fa';
import BrandLogo from './BrandLogo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Inicio', path: '/dashboard', icon: FaCompass },
  { label: 'Impacto', path: '/wallet', icon: FaWallet },
  { label: 'Historico', path: '/ride-history', icon: FaHistory },
  { label: 'Minha conta', path: '/profile', icon: FaUser },
  { label: 'Configuracoes', path: '/settings', icon: FaCog },
] as const;

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState('Usuario UniFio');
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || 'Usuario UniFio');
    setUserImage(localStorage.getItem('userImage') || '');
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navigate = (path: string) => {
    router.push(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
    localStorage.removeItem('userEmail');
    router.push('/login');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px]"
            onClick={onClose}
            aria-label="Fechar menu lateral"
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 flex w-[18.5rem] flex-col border-r border-white/70 bg-white/95 shadow-[0_30px_60px_-36px_rgba(15,23,42,0.42)] backdrop-blur-xl"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)' }}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="text-left"
              >
                <BrandLogo size="sm" caption="Comunidade UniFio" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-slate-900"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const active = pathname === item.path;

                  return (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => navigate(item.path)}
                      className={`flex w-full items-center gap-3 rounded-[20px] px-3 py-3 text-left transition-colors ${
                        active
                          ? 'bg-blue-50 text-blue-800'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                          active
                            ? 'bg-white text-blue-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <item.icon className="text-sm" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{item.label}</div>
                        <div className="text-xs text-slate-500">
                          Navegacao principal do produto
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-200 px-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="flex w-full items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50/90 px-3 py-3 text-left"
              >
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-sm font-semibold text-blue-800">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt={userName}
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    userName.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {userName}
                  </div>
                  <div className="text-xs text-slate-500">
                    Conta verificada da comunidade
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[18px] border border-red-100 bg-red-50 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
              >
                <FaSignOutAlt />
                Sair
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
