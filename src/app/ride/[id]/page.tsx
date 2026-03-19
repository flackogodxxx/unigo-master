'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaMapMarkerAlt, FaClock, FaUserFriends, FaUser, FaMoneyBillWave, FaShieldAlt, FaStar, FaCheckCircle } from 'react-icons/fa';

const fallbackRides = [
  {
    id: 1,
    origin: 'Praça Mello Peixoto, Centro',
    destination: 'UNIFIO - Centro Universitário de Ourinhos',
    time: '07:15',
    seats: 3,
    driver: 'Ana Silva',
    price: 4,
    rating: 4.8,
    trips: 45,
    verified: true
  },
  {
    id: 2,
    origin: 'Ourinhos Plaza Shopping',
    destination: 'UNIFIO - Centro Universitário de Ourinhos',
    time: '07:30',
    seats: 2,
    driver: 'Carlos Souza',
    price: 6,
    rating: 4.9,
    trips: 120,
    verified: true
  },
  {
    id: 3,
    origin: 'Santa Casa de Ourinhos',
    destination: 'UNIFIO - Centro Universitário de Ourinhos',
    time: '18:15',
    seats: 3,
    driver: 'Mariana Costa',
    price: 5,
    rating: 4.7,
    trips: 37,
    verified: true
  }
];

export default function RideDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const ride = useMemo(() => fallbackRides.find(item => item.id === id), [id]);

  if (!ride) {
    return (
      <div className="min-h-screen bg-slate-50 pt-20 px-4">
        <div className="container mx-auto max-w-3xl bg-white border border-slate-200 rounded-2xl p-6">
          <h1 className="text-xl font-bold text-slate-800 mb-2">Carona não encontrada</h1>
          <p className="text-slate-600 mb-4">A carona selecionada pode ter sido removida.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Voltar para o Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <button
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
        >
          <FaArrowLeft />
          Voltar
        </button>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-5">Detalhes da Carona #{ride.id}</h1>

          <div className="space-y-4 text-slate-700">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600" />
              <span className="font-medium">{ride.origin} {'→'} {ride.destination}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaClock className="text-blue-600" />
              <span>Saída prevista: {ride.time}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaUserFriends className="text-blue-600" />
              <span>Vagas disponíveis: {ride.seats}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaUser className="text-blue-600" />
              <span>Motorista: {ride.driver}</span>
              {ride.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                  <FaCheckCircle className="text-green-500" /> Verificado
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <FaStar className="text-amber-500" />
              <span>{ride.rating} ({ride.trips} viagens realizadas)</span>
            </div>

            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-blue-600" />
              <span className="font-semibold">Valor: R$ {ride.price},00</span>
            </div>
          </div>

          {/* Trust & Safety Card */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <FaShieldAlt className="text-blue-700" />
              <span className="font-semibold text-blue-800 text-sm">Segurança UniGo</span>
            </div>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                Motorista com e-mail institucional verificado
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                Rota compartilhada com contato de emergência
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                Avaliações de outros passageiros disponíveis
              </li>
            </ul>
          </div>

          <button
            onClick={() => router.push('/passenger-dashboard')}
            className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Reservar nesta rota
          </button>
        </div>
      </div>
    </div>
  );
}
