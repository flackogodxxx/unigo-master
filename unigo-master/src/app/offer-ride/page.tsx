'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaMoneyBillWave, FaCheck } from 'react-icons/fa';

type RideDraft = {
  origin: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  price: string;
};

const DRAFTS_KEY = 'unigoOfferedRidesDraft';

export default function OfferRidePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<RideDraft>({
    origin: '',
    destination: '',
    date: '',
    time: '',
    seats: 3,
    price: '5,00'
  });

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/login');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    setForm(prev => ({ ...prev, date: today }));
    setIsLoading(false);
  }, [router]);

  const update = (key: keyof RideDraft, value: string | number) => {
    setSaved(false);
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const raw = localStorage.getItem(DRAFTS_KEY);
    const existing: RideDraft[] = raw ? JSON.parse(raw) : [];
    localStorage.setItem(DRAFTS_KEY, JSON.stringify([{ ...form }, ...existing]));

    setSaved(true);
    setTimeout(() => router.push('/driver-dashboard'), 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-white mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaCar />
            Oferecer Nova Carona
          </h1>
          <p className="text-blue-100 mt-1">Preencha os detalhes. A oferta fica salva localmente para uso institucional offline.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <Field label="Origem" icon={<FaMapMarkerAlt className="text-blue-600" />}>
            <input
              value={form.origin}
              onChange={(e) => update('origin', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              placeholder="Ex: Praça Mello Peixoto, Centro"
              required
            />
          </Field>

          <Field label="Destino" icon={<FaMapMarkerAlt className="text-blue-600" />}>
            <input
              value={form.destination}
              onChange={(e) => update('destination', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              placeholder="Ex: UNIFIO - Centro Universitário de Ourinhos"
              required
            />
          </Field>

          <Field label="Data" icon={<FaCalendarAlt className="text-blue-600" />}>
            <input
              type="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </Field>

          <Field label="Horário" icon={<FaClock className="text-blue-600" />}>
            <input
              type="time"
              value={form.time}
              onChange={(e) => update('time', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </Field>

          <Field label="Vagas" icon={<FaUsers className="text-blue-600" />}>
            <input
              type="number"
              min={1}
              max={6}
              value={form.seats}
              onChange={(e) => update('seats', Number(e.target.value))}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </Field>

          <Field label="Preço por passageiro" icon={<FaMoneyBillWave className="text-blue-600" />}>
            <input
              value={form.price}
              onChange={(e) => update('price', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              placeholder="5,00"
              required
            />
          </Field>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center gap-2"
            >
              <FaCheck />
              Publicar Oferta
            </button>
          </div>

          {saved && <p className="md:col-span-2 text-sm text-green-600">Oferta salva com sucesso. Redirecionando...</p>}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-600 mb-1 inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}
