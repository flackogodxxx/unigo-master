'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaTimes,
  FaWhatsapp,
} from 'react-icons/fa';

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

const getTimeLabel = () =>
  new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

export default function ChatModal({
  isOpen,
  onClose,
  onConfirm,
  driverName,
  rideOrigin,
  rideDestination,
  rideDate,
  rideTime,
  ridePrice,
}: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const priceLabel = ridePrice || 'A combinar';
  const rideMoment = rideTime ? `${rideDate} · ${rideTime}` : rideDate;
  const quickReplies = useMemo(
    () =>
      priceLabel === 'A combinar'
        ? [
            'Tenho interesse nessa rota',
            'Qual valor você imagina?',
            'Podemos alinhar um ponto no centro?',
            'Conseguimos combinar ida e volta?',
          ]
        : [
            'Tenho interesse nessa vaga',
            'Esse horário ainda está disponível?',
            'Podemos alinhar o ponto de encontro?',
            'Consigo confirmar ainda hoje?',
          ],
    [priceLabel]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setMessages([
      {
        id: 'seed-1',
        sender: 'other',
        text:
          priceLabel === 'A combinar'
            ? `Oi! Tenho uma vaga nessa rota para ${rideDestination}. Se fizer sentido para você, podemos alinhar horário, ponto e valor por aqui.`
            : `Oi! Tenho uma vaga disponível para ${rideDestination} por ${priceLabel}. Se quiser, já alinhamos os detalhes da saída por aqui.`,
        time: getTimeLabel(),
      },
    ]);
    setNewMessage('');
    setIsConfirmed(false);

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 260);

    return () => window.clearTimeout(focusTimer);
  }, [isOpen, priceLabel, rideDestination]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isConfirmed]);

  const handleSend = () => {
    const trimmed = newMessage.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: trimmed,
        time: getTimeLabel(),
      },
    ]);
    setNewMessage('');

    window.setTimeout(() => {
      const cannedReplies = [
        'Perfeito, isso funciona para mim.',
        'Boa, consigo sair nesse horário.',
        'Fechado. Se quiser, também podemos continuar no WhatsApp.',
        'Tudo certo. Vou te mandar o ponto certinho.',
      ];

      setMessages((current) => [
        ...current,
        {
          id: `other-${Date.now()}`,
          sender: 'other',
          text: cannedReplies[Math.floor(Math.random() * cannedReplies.length)],
          time: getTimeLabel(),
        },
      ]);
    }, 850);
  };

  const handleConfirmRide = () => {
    setIsConfirmed(true);
    onConfirm();
  };

  const handleWhatsAppContinue = () => {
    const summary = `UniGo%0A${encodeURIComponent(
      `${driverName} · ${rideOrigin} → ${rideDestination} · ${rideMoment} · ${priceLabel}`
    )}`;
    window.open(`https://api.whatsapp.com/send?text=${summary}`, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/62 backdrop-blur-sm sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(42rem,100dvh-0.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-white shadow-[0_26px_70px_-28px_rgba(15,23,42,0.55)] sm:h-[40rem] sm:rounded-[28px]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-[linear-gradient(135deg,#0f1f4d_0%,#1d4ed8_100%)] px-5 py-4 text-white">
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100/78">
                  Conversa da rota
                </div>
                <div className="mt-1 text-lg font-semibold">{driverName}</div>
                <div className="mt-1 text-sm text-blue-100/84">
                  Combine pelo app e, se quiser, continue no WhatsApp.
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/18"
                aria-label="Fechar conversa"
              >
                <FaTimes />
              </button>
            </div>

            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="stat-chip px-3 py-1.5 text-xs">{priceLabel}</span>
                <span className="stat-chip px-3 py-1.5 text-xs">{rideMoment}</span>
              </div>
              <div className="mt-3 flex items-start gap-2 text-sm text-slate-700">
                <FaMapMarkerAlt className="mt-1 text-blue-600" />
                <div>
                  <div className="font-semibold">{rideOrigin}</div>
                  <div className="mt-1 text-slate-500">→ {rideDestination}</div>
                </div>
              </div>
            </div>

            {isConfirmed ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <FaCheckCircle className="h-9 w-9" />
                </div>
                <div className="mt-5 text-2xl font-semibold text-slate-900">
                  Carona confirmada
                </div>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                  A rota já está alinhada no UniGo. Se preferirem, vocês também podem
                  continuar a conversa no WhatsApp para fechar os detalhes finais.
                </p>
                <button onClick={handleWhatsAppContinue} className="btn-primary mt-6">
                  <FaWhatsapp />
                  Continuar no WhatsApp
                </button>
              </div>
            ) : (
              <>
                <div className="bg-amber-50 px-5 py-3 text-sm text-amber-700">
                  <div className="flex items-start gap-2">
                    <FaInfoCircle className="mt-1 shrink-0" />
                    <span>
                      Use esta conversa para alinhar horário, ponto de encontro e valor.
                      O UniGo não cobra taxa de plataforma.
                    </span>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 px-4 py-4 sm:px-5">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[86%] rounded-[22px] px-4 py-3 shadow-sm ${
                            message.sender === 'user'
                              ? 'rounded-br-md bg-blue-600 text-white'
                              : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'
                          }`}
                        >
                          <div className="text-sm leading-6">{message.text}</div>
                          <div
                            className={`mt-1 text-[0.68rem] ${
                              message.sender === 'user' ? 'text-blue-100/86' : 'text-slate-400'
                            }`}
                          >
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="border-t border-slate-200 bg-white px-4 py-3 sm:px-5">
                  <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => {
                          setNewMessage(reply);
                          inputRef.current?.focus();
                        }}
                        className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-900"
                        type="button"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={(event) => setNewMessage(event.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Escreva uma mensagem"
                      className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim()}
                      type="button"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      <FaPaperPlane className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <button onClick={handleConfirmRide} type="button" className="btn-primary w-full">
                      <FaCheckCircle />
                      Confirmar carona
                    </button>
                    <button
                      onClick={handleWhatsAppContinue}
                      type="button"
                      className="btn-secondary w-full"
                    >
                      <FaWhatsapp />
                      Levar para o WhatsApp
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
