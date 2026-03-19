'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientLayout({
    children,
    className,
}: {
    children: React.ReactNode;
    className: string;
}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={className}>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-effect py-2' : 'bg-transparent py-4'
                    }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <motion.div
                        className="text-2xl font-bold gradient-text"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        UniGo
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 items-center">
                        <motion.a
                            href="#beneficios"
                            className="nav-link"
                            whileHover={{ scale: 1.05 }}
                        >
                            Benefícios
                        </motion.a>
                        <motion.a
                            href="#como-funciona"
                            className="nav-link"
                            whileHover={{ scale: 1.05 }}
                        >
                            Como Funciona
                        </motion.a>
                        <motion.button
                            className="btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Entrar
                        </motion.button>
                        <motion.button
                            className="btn-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Cadastrar
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden text-gray-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden glass-effect"
                        >
                            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                                <motion.a
                                    href="#beneficios"
                                    className="nav-link"
                                    whileHover={{ x: 10 }}
                                >
                                    Benefícios
                                </motion.a>
                                <motion.a
                                    href="#como-funciona"
                                    className="nav-link"
                                    whileHover={{ x: 10 }}
                                >
                                    Como Funciona
                                </motion.a>
                                <motion.button
                                    className="btn-primary w-full"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Entrar
                                </motion.button>
                                <motion.button
                                    className="btn-secondary w-full"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Cadastrar
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {children}

            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-2xl font-bold mb-4 gradient-text">UniGo</h3>
                            <p className="text-gray-400">Sua carona universitária segura e econômica</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
                            <ul className="space-y-2">
                                <li><motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={{ x: 5 }}>Sobre Nós</motion.a></li>
                                <li><motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={{ x: 5 }}>Segurança</motion.a></li>
                                <li><motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={{ x: 5 }}>FAQ</motion.a></li>
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h4 className="text-lg font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={{ x: 5 }}>Termos de Uso</motion.a></li>
                                <li><motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={{ x: 5 }}>Privacidade</motion.a></li>
                                <li><motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={{ x: 5 }}>Cookies</motion.a></li>
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h4 className="text-lg font-semibold mb-4">Contato</h4>
                            <ul className="space-y-2">
                                <li><motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={{ x: 5 }}>suporte@unigo.com</motion.a></li>
                                <li><motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={{ x: 5 }}>(11) 9999-9999</motion.a></li>
                            </ul>
                        </motion.div>
                    </div>
                    <motion.div
                        className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p>&copy; 2024 UniGo. Todos os direitos reservados.</p>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
}
