'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaTag, FaBullhorn } from 'react-icons/fa';
import Image from 'next/image';

const adsData = [
    {
        id: 1,
        title: 'Xerox do Juca',
        description: '10% de desconto na impressão da sua monografia!',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
        tag: 'Serviços',
        color: 'from-blue-500 to-indigo-600',
        link: '#'
    },
    {
        id: 2,
        title: 'Lanchonete Universitária',
        description: 'Compre 1 Salgado Maromba, ganhe 1 Suco.',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop',
        tag: 'Alimentação',
        color: 'from-orange-500 to-red-600',
        link: '#'
    },
    {
        id: 3,
        title: 'Bar do Zé',
        description: 'Happy Hour pós-aula: Chopp em dobro das 18h às 20h.',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop',
        tag: 'Entretenimento',
        color: 'from-amber-400 to-orange-500',
        link: '#'
    }
];

export default function LocalAds() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % adsData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-5 md:mb-8 overflow-hidden relative">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaBullhorn className="text-purple-600" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-800">Parceiros UniGo</h2>
            </div>

            <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden group cursor-pointer">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${adsData[currentIndex].color} opacity-90 z-10 mix-blend-multiply`} />

                        <Image
                            src={adsData[currentIndex].image}
                            alt={adsData[currentIndex].title}
                            fill
                            className="object-cover z-0"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />

                        <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end text-white">
                            <div className="mb-2">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold border border-white/30">
                                    <FaTag size={10} /> {adsData[currentIndex].tag}
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-1 shadow-sm leading-tight">
                                {adsData[currentIndex].title}
                            </h3>
                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                {adsData[currentIndex].description}
                            </p>
                        </div>

                        <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                            <FaExternalLinkAlt className="text-white text-xs" />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Indicators */}
                <div className="absolute bottom-3 right-4 z-30 flex gap-1.5">
                    {adsData.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-3 text-right">Espaço Patrocinado</p>
        </div>
    );
}
