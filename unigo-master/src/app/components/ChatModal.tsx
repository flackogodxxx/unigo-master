'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

interface Message {
    id: string;
    sender: 'user' | 'other';
    text: string;
    time: string;
}

export interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    driverName: string;
    rideOrigin: string;
    rideDestination: string;
    rideDate: string;
    rideTime: string;
    ridePrice: string;
}

export default function ChatModal({ isOpen, onClose, onConfirm, driverName, rideOrigin, rideDestination, rideDate, rideTime, ridePrice }: ChatModalProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isCombinar = ridePrice === 'A combinar';

    useEffect(() => {
        if (isOpen) {
            setMessages([
                {
                    id: '1',
                    sender: 'other',
                    text: `Olá! Tenho ${isCombinar ? 'uma vaga disponível' : `uma vaga por ${ridePrice}`} para ${rideDestination} no dia ${rideDate} às ${rideTime}. Tem interesse?`,
                    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                }
            ]);
            setIsConfirmed(false);
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, driverName, rideDestination, rideDate, rideTime, ridePrice, isCombinar]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const quickReplies = isCombinar
        ? ['Qual o valor?', 'Tenho interesse!', 'Saio do centro, serve?', 'Posso combinar o local?']
        : ['Tenho interesse!', 'Tem vaga ainda?', 'Pode me pegar no centro?', 'Que horas exatamente?'];

    const handleSend = () => {
        if (!newMessage.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: newMessage.trim(),
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setNewMessage('');

        // Simulated auto-reply
        setTimeout(() => {
            const replies = [
                'Pode sim! Combinado.',
                'Perfeito, te espero no ponto!',
                'Beleza, vou te mandar a localização exata.',
                'Show! Qualquer coisa me avisa.',
                'Tudo certo, até lá!'
            ];
            const autoReply: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'other',
                text: replies[Math.floor(Math.random() * replies.length)],
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, autoReply]);
        }, 1200);
    };

    const handleConfirmRide = () => {
        setIsConfirmed(true);
        onConfirm();
        setTimeout(() => {
            onClose();
        }, 2500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="bg-white sm:rounded-2xl shadow-2xl w-full sm:max-w-lg h-[85vh] sm:h-[600px] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 text-white flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {driverName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-sm truncate">{driverName}</h3>
                                    <p className="text-blue-200 text-xs">Online agora</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-white/70 hover:text-white p-2 rounded-full bg-white/10">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Ride Info Banner */}
                        <div className="bg-blue-50 border-b border-blue-100 px-4 py-3 flex-shrink-0">
                            <div className="flex items-center gap-2 text-xs text-blue-700">
                                <FaMapMarkerAlt className="flex-shrink-0" />
                                <span className="truncate">{rideOrigin} → {rideDestination}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-blue-600">
                                <span className="flex items-center gap-1">
                                    <FaCalendarAlt /> {rideDate} às {rideTime}
                                </span>
                                <span className="font-bold">{ridePrice}</span>
                            </div>
                        </div>

                        {isConfirmed ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring' }}
                                    className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4 text-3xl sm:text-4xl"
                                >
                                    ✓
                                </motion.div>
                                <h4 className="text-xl font-bold text-slate-800 mb-2">Carona Confirmada!</h4>
                                <p className="text-slate-500 text-sm">Combine os detalhes finais pelo chat. Boa viagem!</p>
                            </motion.div>
                        ) : (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50">
                                    {/* Info tip */}
                                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
                                        <FaInfoCircle className="mt-0.5 flex-shrink-0" />
                                        <span>Use o chat para combinar detalhes da carona. O app é gratuito — nenhuma taxa é cobrada.</span>
                                    </div>

                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                                                msg.sender === 'user'
                                                    ? 'bg-blue-600 text-white rounded-br-md'
                                                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md shadow-sm'
                                            }`}>
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                                <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                                                    {msg.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Quick Replies */}
                                <div className="px-4 py-2 border-t border-slate-100 flex gap-2 overflow-x-auto flex-shrink-0 bg-white">
                                    {quickReplies.map((reply, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setNewMessage(reply); inputRef.current?.focus(); }}
                                            className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 rounded-full text-xs border border-slate-200 transition-colors flex-shrink-0"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>

                                {/* Input + Confirm */}
                                <div className="px-4 py-3 border-t border-slate-200 flex-shrink-0 bg-white">
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Digite sua mensagem..."
                                            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <button
                                            onClick={handleSend}
                                            disabled={!newMessage.trim()}
                                            className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:bg-slate-300 transition-colors flex-shrink-0"
                                        >
                                            <FaPaperPlane className="text-sm" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleConfirmRide}
                                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm transition-colors shadow-md"
                                    >
                                        ✓ Confirmar Carona
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
