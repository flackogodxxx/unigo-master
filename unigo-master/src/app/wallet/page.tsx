'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaRoute,
  FaCar,
  FaCalendarAlt,
  FaChartLine,
  FaArrowUp
} from 'react-icons/fa';

interface Activity {
  id: string;
  type: 'ride' | 'fixed';
  description: string;
  date: string;
  saved: number;
}

export default function WalletPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  const totalSaved = 186.50;
  const co2Avoided = 42;
  const ridesShared = 28;

  const [activities] = useState<Activity[]>([
    { id: '1', type: 'ride', description: 'Carona com Ana Silva (Praça Mello Peixoto → UNIFIO)', date: new Date().toISOString(), saved: 12.00 },
    { id: '2', type: 'fixed', description: 'Carona fixa mensal com Fernando (março)', date: new Date(Date.now() - 86400000).toISOString(), saved: 80.00 },
    { id: '3', type: 'ride', description: 'Carona com Carlos Souza (Ourinhos Plaza Shopping → UNIFIO)', date: new Date(Date.now() - 172800000).toISOString(), saved: 8.50 },
    { id: '4', type: 'ride', description: 'Carona com Mariana Costa (UNIFIO → Terminal Rodoviário de Ourinhos)', date: new Date(Date.now() - 259200000).toISOString(), saved: 6.00 },
  ]);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) { router.push('/login'); return; }
    setUserName(localStorage.getItem('userName') || 'Usuário');
  }, [router]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date(dateString));

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-3">
            <FaChartLine className="text-blue-600" />
            Minha Economia
          </h1>
          <p className="text-slate-600">Acompanhe quanto você economiza usando o UniGo, {userName}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl shadow-xl p-6 text-white">
            <p className="text-blue-200 text-sm mb-1">Total Economizado</p>
            <p className="text-2xl sm:text-3xl font-bold">{formatCurrency(totalSaved)}</p>
            <p className="text-blue-200 text-xs mt-2">comparado a transporte individual</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-emerald-700 to-teal-700 rounded-2xl shadow-xl p-6 text-white">
            <p className="text-emerald-200 text-sm mb-1">CO₂ Evitado</p>
            <p className="text-2xl sm:text-3xl font-bold">{co2Avoided} kg</p>
            <p className="text-emerald-200 text-xs mt-2">de emissões de carbono</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-indigo-700 to-purple-700 rounded-2xl shadow-xl p-6 text-white">
            <p className="text-indigo-200 text-sm mb-1">Caronas Compartilhadas</p>
            <p className="text-2xl sm:text-3xl font-bold">{ridesShared}</p>
            <p className="text-indigo-200 text-xs mt-2">viagens no total</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">✓</div>
          <p className="text-sm text-green-800">
            <strong>Sem custos de plataforma!</strong> O UniGo é gratuito para você. Os valores das caronas são combinados diretamente com o motorista pelo chat.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="border-b border-slate-100 p-6 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FaRoute className="text-slate-400" /> Histórico de Economia
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {activities.map((activity) => (
              <div key={activity.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ${activity.type === 'fixed' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'}`}>
                    {activity.type === 'fixed' ? <FaCalendarAlt /> : <FaCar />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{activity.description}</p>
                    <p className="text-sm text-slate-500">{formatDate(activity.date)}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-bold text-green-600 flex items-center gap-1">
                    <FaArrowUp className="text-xs" /> {formatCurrency(activity.saved)}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">economizou</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
