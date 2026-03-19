'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCar, FaUser, FaAngleDown, FaBell, FaCamera, FaEdit, FaCrown } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type UserProfileProps = {
    userName: string;
    userImage?: string;
};

export default function UserProfile({ userName, userImage }: UserProfileProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasNotification] = useState(true); // Simulando notificação
    const [profileImage, setProfileImage] = useState(userImage || '');
    const [isPrime, setIsPrime] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        setIsPrime(localStorage.getItem('userPrime') === 'true');
    }, []);

    // Imagem de perfil padrão caso nenhuma seja fornecida
    const defaultImage = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userName) + '&background=0D8ABC&color=fff';

    // Fechar o menu quando clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleModeSelect = (mode: 'driver' | 'passenger') => {
        setIsMenuOpen(false);
        // Aqui você pode redirecionar para as páginas específicas
        if (mode === 'driver') {
            router.push('/driver-dashboard');
        } else {
            router.push('/passenger-dashboard');
        }
    };

    const handleLogout = () => {
        setIsMenuOpen(false);

        // Limpar as informações do usuário no localStorage
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userImage');

        // Criar um evento para notificar outras partes da aplicação sobre o logout
        const logoutEvent = new Event('storage');
        window.dispatchEvent(logoutEvent);

        // Redirecionar para a página de login
        router.push('/login');
    };

    const handleProfilePictureClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Verificar se o arquivo é uma imagem e se tem tamanho adequado
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecione uma imagem válida.');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('A imagem deve ter menos de 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                setProfileImage(imageUrl);

                // Salvar no localStorage para persistir
                localStorage.setItem('userImage', imageUrl);

                // Disparar evento padrão do localStorage para atualizar em outros componentes
                const storageEvent = new Event('storage');
                window.dispatchEvent(storageEvent);

                // Disparar evento personalizado para componentes que estão ouvindo
                const imageUpdateEvent = new CustomEvent('userimageupdate');
                window.dispatchEvent(imageUpdateEvent);

                // Feedback de sucesso
                const successElement = document.createElement('div');
                successElement.className = 'fixed bottom-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md z-50';
                successElement.textContent = 'Foto atualizada com sucesso!';
                document.body.appendChild(successElement);

                // Remover depois de 3 segundos
                setTimeout(() => {
                    document.body.removeChild(successElement);
                }, 3000);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Botão de perfil */}
            <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="relative">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500 shadow-sm flex items-center justify-center relative">
                        {isPrime && (
                            <div className="absolute -top-1 -left-1 z-30 bg-amber-400 text-white p-[2px] rounded-full shadow-lg border border-white">
                                <FaCrown size={10} />
                            </div>
                        )}
                        <div className="absolute inset-0">
                            <Image
                                src={profileImage || defaultImage}
                                alt={userName}
                                fill
                                className="object-cover rounded-full z-10"
                                sizes="36px"
                                priority
                            />
                        </div>
                    </div>
                    {hasNotification && (
                        <div className="absolute -top-1 -right-1">
                            <motion.div
                                className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border border-white shadow-sm"
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <span className="text-white text-[8px] font-bold">1</span>
                            </motion.div>
                        </div>
                    )}
                </div>
                <span className="font-medium text-slate-700 hidden sm:inline truncate max-w-[100px]">
                    {userName}
                </span>
                <FaAngleDown
                    className={`text-slate-500 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                />
            </motion.button>

            {/* Menu dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-slate-200"
                        style={{ transform: 'translateX(0)', right: 0 }}
                    >
                        {/* Cabeçalho do perfil com opção para mudar foto */}
                        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-slate-50">
                            <div className="flex flex-col items-center">
                                <div
                                    className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 shadow-md mb-4 group cursor-pointer flex items-center justify-center"
                                    onClick={handleProfilePictureClick}
                                >
                                    {hasNotification && (
                                        <div className="absolute -top-1 -right-1 z-20">
                                            <motion.div
                                                className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                                                animate={{ scale: [1, 1.15, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                            >
                                                <span className="text-white text-[9px] font-bold">1</span>
                                            </motion.div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={profileImage || defaultImage}
                                            alt={userName}
                                            fill
                                            className="object-cover rounded-full"
                                            sizes="96px"
                                            priority
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                                        <div className="bg-white bg-opacity-90 p-2 rounded-full">
                                            <FaCamera className="text-blue-700 text-lg" />
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <p className="font-semibold text-slate-800 text-center text-lg">{userName}</p>
                                <div className="flex items-center mt-1 text-blue-600 text-xs font-medium">
                                    <FaEdit className="mr-1" size={12} />
                                    <span>Clique na foto para alterar</span>
                                </div>
                            </div>
                        </div>

                        {/* Notificações */}
                        {hasNotification && (
                            <motion.div
                                className="px-4 py-3 bg-red-50 border-b border-slate-100"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <div className="flex items-center space-x-2 text-sm">
                                    <FaBell className="text-red-500 flex-shrink-0" />
                                    <p className="text-slate-700">Você tem caronas pendentes</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Opções de modo */}
                        <div className="p-4 space-y-3">
                            <p className="text-sm text-slate-500 mb-1 px-2 font-medium">Escolha seu modo:</p>
                            <motion.button
                                onClick={() => handleModeSelect('driver')}
                                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors text-left border border-transparent hover:border-blue-100"
                                whileHover={{ x: 4, backgroundColor: '#eff6ff' }}
                            >
                                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-md shadow-blue-200 flex-shrink-0">
                                    <FaCar className="text-white text-lg" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-800">Motorista</p>
                                    <p className="text-xs text-slate-500">Ofereça caronas</p>
                                </div>
                            </motion.button>

                            <motion.button
                                onClick={() => handleModeSelect('passenger')}
                                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors text-left border border-transparent hover:border-purple-100"
                                whileHover={{ x: 4, backgroundColor: '#faf5ff' }}
                            >
                                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-purple-700 to-purple-500 flex items-center justify-center shadow-md shadow-purple-200 flex-shrink-0">
                                    <FaUser className="text-white text-lg" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-800">Passageiro</p>
                                    <p className="text-xs text-slate-500">Encontre caronas</p>
                                </div>
                            </motion.button>
                        </div>

                        {/* Rodapé com opções adicionais */}
                        <div className="p-4 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50">
                            <motion.button
                                onClick={handleLogout}
                                className="w-full py-2.5 text-center text-sm text-red-500 hover:text-red-600 transition-colors rounded-md hover:bg-red-50 border border-transparent hover:border-red-100"
                                whileHover={{ scale: 1.02 }}
                            >
                                Sair
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
