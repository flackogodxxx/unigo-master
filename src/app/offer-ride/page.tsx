'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaCar,
  FaCheck,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUsers,
} from 'react-icons/fa';
import {
  DemoRidePriceType,
  saveStoredRide,
} from '../services/demoRideStore';

const BottomNavigation = dynamic(() => import('../components/BottomNavigation'), {
  ssr: false,
});

type RideDraft = {
  origin: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  price: string;
  priceType: DemoRidePriceType;
};

const routeSuggestions = [
  'Praça Mello Peixoto, Centro',
  'Ourinhos Plaza Shopping',
  'Terminal Rodoviário de Ourinhos',
  'Santa Casa de Ourinhos',
  'Campus UniFio',
] as const;

const seatOptions = [1, 2, 3, 4];

export default function OfferRidePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [driverName, setDriverName] = useState('Motorista UniGo');
  const [driverImage, setDriverImage] = useState('');
  const [form, setForm] = useState<RideDraft>({
    origin: '',
    destination: 'Campus UniFio',
    date: '',
    time: '',
    seats: 3,
    price: 'R$ 5,00',
    priceType: 'fixed',
  });

  useEffect(() => {
    const token = localStorage.getItem('userToken');

    if (!token) {
      router.push('/login');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    setDriverName(localStorage.getItem('userName') || 'Motorista UniGo');
    setDriverImage(localStorage.getItem('userImage') || '');
    setForm((current) => ({
      ...current,
      date: current.date || today,
    }));
    setIsLoading(false);
  }, [router]);

  const updateField = <Key extends keyof RideDraft>(key: Key, value: RideDraft[Key]) => {
    setIsSaved(false);
    setForm((current) => ({ ...current, [key]: value }));
  };

  const applySuggestion = (key: 'origin' | 'destination', value: string) => {
    updateField(key, value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    saveStoredRide({
      origin: form.origin,
      destination: form.destination,
      date: form.date,
      time: form.time,
      seats: form.seats,
      price: form.priceType === 'negotiate' ? 'A combinar' : form.price,
      priceType: form.priceType,
      driverName,
      driverImage,
    });

    setIsSaved(true);

    setTimeout(() => {
      router.push('/driver-dashboard');
    }, 1200);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <main className="px-4 pb-10 pt-20">
        <div className="container mx-auto max-w-5xl">
          <section className="brand-panel overflow-hidden px-5 py-6 sm:px-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="section-kicker">Motorista UniGo</span>
                <h1 className="font-display text-4xl text-slate-950 sm:text-5xl">
                  Publique uma rota com clareza e boa leitura no mobile.
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  Crie uma oferta objetiva para a comunidade UniFio, com origem,
                  horário, vagas e valor do jeito que os alunos entendem em poucos
                  segundos.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[23rem]">
                <div className="soft-panel px-4 py-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Origem
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">
                    Você define o ponto
                  </div>
                </div>
                <div className="soft-panel px-4 py-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Valor
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">
                    Fixo ou a combinar
                  </div>
                </div>
                <div className="soft-panel px-4 py-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Saída
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">
                    Direto para a UniFio
                  </div>
                </div>
              </div>
            </div>
          </section>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="soft-panel px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="feature-icon h-11 w-11 rounded-2xl">
                  <FaCar className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Nova oferta
                  </div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    Informações da carona
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Origem"
                  icon={<FaMapMarkerAlt className="text-blue-600" />}
                  hint="De onde você vai sair"
                >
                  <input
                    value={form.origin}
                    onChange={(event) => updateField('origin', event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    placeholder="Ex: Praça Mello Peixoto, Centro"
                    required
                  />
                </Field>

                <Field
                  label="Destino"
                  icon={<FaMapMarkerAlt className="text-blue-600" />}
                  hint="Para onde o trajeto vai"
                >
                  <input
                    value={form.destination}
                    onChange={(event) => updateField('destination', event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    placeholder="Ex: Campus UniFio"
                    required
                  />
                </Field>

                <Field
                  label="Data"
                  icon={<FaCalendarAlt className="text-blue-600" />}
                  hint="Quando a carona acontece"
                >
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) => updateField('date', event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    required
                  />
                </Field>

                <Field
                  label="Horário"
                  icon={<FaClock className="text-blue-600" />}
                  hint="Horário previsto de saída"
                >
                  <input
                    type="time"
                    value={form.time}
                    onChange={(event) => updateField('time', event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    required
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field
                  label="Vagas"
                  icon={<FaUsers className="text-blue-600" />}
                  hint="Quantos lugares você quer oferecer"
                >
                  <div className="grid grid-cols-4 gap-2">
                    {seatOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateField('seats', option)}
                        className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition-all ${
                          form.seats === option
                            ? 'border-blue-200 bg-blue-600 text-white shadow-[0_18px_36px_-24px_rgba(29,78,216,0.7)]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field
                  label="Como você quer cobrar"
                  icon={<FaMoneyBillWave className="text-blue-600" />}
                  hint="Escolha um valor fixo ou deixe para combinar depois"
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => updateField('priceType', 'fixed')}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                        form.priceType === 'fixed'
                          ? 'border-blue-200 bg-blue-50 text-blue-900'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <div className="text-sm font-semibold">Valor fixo</div>
                      <div className="mt-1 text-xs text-slate-500">
                        Já mostra a referência no card da rota
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('priceType', 'negotiate')}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                        form.priceType === 'negotiate'
                          ? 'border-blue-200 bg-blue-50 text-blue-900'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <div className="text-sm font-semibold">A combinar</div>
                      <div className="mt-1 text-xs text-slate-500">
                        O ajuste final continua no chat
                      </div>
                    </button>
                  </div>

                  <div className="mt-3">
                    <input
                      value={form.price}
                      onChange={(event) => updateField('price', event.target.value)}
                      disabled={form.priceType === 'negotiate'}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                      placeholder="Ex: R$ 5,00"
                      required={form.priceType === 'fixed'}
                    />
                  </div>
                </Field>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary flex-1">
                  <FaCheck />
                  Publicar carona
                </button>
              </div>

              {isSaved ? (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Oferta publicada com sucesso. Atualizando seu painel agora.
                </div>
              ) : null}
            </section>

            <section className="space-y-6">
              <div className="soft-panel px-5 py-5 sm:px-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Atalhos de rota
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-900">
                  Preencha mais rápido no celular
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {routeSuggestions.map((suggestion) => (
                    <button
                      key={`origin-${suggestion}`}
                      type="button"
                      onClick={() => applySuggestion('origin', suggestion)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-900"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dark-panel px-5 py-5 sm:px-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100/82">
                  Prévia
                </div>
                <div className="mt-3 rounded-[24px] border border-white/10 bg-white/8 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {driverName}
                      </div>
                      <div className="mt-1 text-xs text-blue-100/78">
                        Comunidade UniFio
                      </div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-blue-50">
                      {form.priceType === 'negotiate' ? 'A combinar' : 'Valor fixo'}
                    </div>
                  </div>

                  <div className="mt-4 rounded-[20px] bg-white px-4 py-4 text-slate-900 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)]">
                    <div className="flex items-center gap-3">
                      <div className="feature-icon h-10 w-10 rounded-2xl">
                        <FaCar className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-base font-semibold">
                          {form.origin || 'Sua origem'}
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          → {form.destination || 'Campus UniFio'}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="stat-chip px-3 py-1.5 text-xs">
                        {form.date || 'Hoje'}
                      </span>
                      <span className="stat-chip px-3 py-1.5 text-xs">
                        {form.time || 'Horário'}
                      </span>
                      <span className="stat-chip px-3 py-1.5 text-xs">
                        {form.seats} vagas
                      </span>
                    </div>

                    <div className="mt-4 text-sm font-semibold text-blue-700">
                      {form.priceType === 'negotiate' ? 'Valor a combinar no chat' : form.price}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </main>

      <BottomNavigation activeTab="driver" />
    </div>
  );
}

function Field({
  label,
  icon,
  hint,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        {icon}
        {label}
      </span>
      <span className="mb-3 block text-xs text-slate-500">{hint}</span>
      {children}
    </label>
  );
}
