'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FaBullhorn, FaExternalLinkAlt, FaTag } from 'react-icons/fa';

const highlights = [
  {
    id: 1,
    title: 'Xerox do Juca',
    description: 'Desconto rapido para quem precisa imprimir material antes da aula.',
    image:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=900&auto=format&fit=crop',
    tag: 'Servico local',
    tone:
      'from-[rgba(15,31,77,0.9)] via-[rgba(29,78,216,0.86)] to-[rgba(96,165,250,0.72)]',
  },
  {
    id: 2,
    title: 'Lanchonete Universitaria',
    description: 'Ponto rapido para combinar antes da carona ou depois da aula.',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=900&auto=format&fit=crop',
    tag: 'Alimentacao',
    tone:
      'from-[rgba(15,31,77,0.9)] via-[rgba(245,158,11,0.86)] to-[rgba(251,191,36,0.72)]',
  },
  {
    id: 3,
    title: 'Ponto de encontro sugerido',
    description: 'Ideia de local facil para alinhar embarques e encontros no centro.',
    image:
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=900&auto=format&fit=crop',
    tag: 'Rotina local',
    tone:
      'from-[rgba(15,31,77,0.9)] via-[rgba(16,185,129,0.82)] to-[rgba(52,211,153,0.7)]',
  },
] as const;

export default function LocalAds() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((current) => (current + 1) % highlights.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const currentItem = highlights[currentIndex];

  return (
    <section className="soft-panel overflow-hidden px-4 py-4 md:px-5 md:py-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
            Destaques da comunidade
          </div>
          <h2 className="mt-1 text-base font-semibold text-slate-900 md:text-lg">
            Pontos locais que combinam com a rotina UniGo
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <FaBullhorn className="text-sm" />
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-[26px]">
        <AnimatePresence mode="wait">
          <motion.article
            key={currentItem.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            className="relative min-h-[15rem] overflow-hidden rounded-[26px]"
          >
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />

            <div
              className={`absolute inset-0 bg-gradient-to-br ${currentItem.tone}`}
            />

            <div className="relative flex min-h-[15rem] flex-col justify-end px-5 py-5 text-white">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/16 bg-white/12 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-md">
                <FaTag className="text-[0.65rem]" />
                {currentItem.tag}
              </span>

              <h3 className="mt-4 max-w-[17ch] text-xl font-semibold leading-7 md:text-2xl">
                {currentItem.title}
              </h3>
              <p className="mt-2 max-w-[28ch] text-sm leading-6 text-white/86">
                {currentItem.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/92">
                <span>Referencia local</span>
                <FaExternalLinkAlt className="text-[0.7rem]" />
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {highlights.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex ? 'w-5 bg-white' : 'w-2.5 bg-white/45'
              }`}
              aria-label={`Abrir destaque ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-right text-[0.68rem] text-slate-400">
        Curadoria visual para demonstracao do ecossistema local.
      </p>
    </section>
  );
}
