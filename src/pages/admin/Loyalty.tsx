import React, { useState } from 'react';
import { Gift, Star, Award, TrendingUp, Users, Settings } from 'lucide-react';

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  type: 'discount' | 'service' | 'gift';
  status: 'active' | 'inactive';
}

interface LoyaltyLevel {
  id: string;
  name: string;
  minPoints: number;
  benefits: string[];
  color: string;
}

export function Loyalty() {
  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      name: 'Réduction de 10%',
      description: 'Sur votre prochaine prime d\'assurance',
      points: 1000,
      type: 'discount',
      status: 'active',
    },
    {
      id: '2',
      name: 'Assistance Premium',
      description: 'Service d\'assistance premium pendant 3 mois',
      points: 2000,
      type: 'service',
      status: 'active',
    },
  ]);

  const [levels] = useState<LoyaltyLevel[]>([
    {
      id: '1',
      name: 'Bronze',
      minPoints: 0,
      benefits: ['5% de réduction', 'Support prioritaire'],
      color: 'bg-amber-600',
    },
    {
      id: '2',
      name: 'Argent',
      minPoints: 1000,
      benefits: ['10% de réduction', 'Support VIP', 'Assistance gratuite'],
      color: 'bg-gray-400',
    },
    {
      id: '3',
      name: 'Or',
      minPoints: 5000,
      benefits: ['15% de réduction', 'Conciergerie dédiée', 'Assistance premium'],
      color: 'bg-yellow-500',
    },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Programme de Fidélité</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez votre programme de fidélisation client
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">1,234</span>
          </div>
          <h3 className="text-gray-600 text-sm">Membres Actifs</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Star className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">45,678</span>
          </div>
          <h3 className="text-gray-600 text-sm">Points Distribués</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Gift className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">567</span>
          </div>
          <h3 className="text-gray-600 text-sm">Récompenses Échangées</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">89%</span>
          </div>
          <h3 className="text-gray-600 text-sm">Taux d'Engagement</h3>
        </div>
      </div>

      {/* Niveaux de Fidélité */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Niveaux de Fidélité</h2>
            <button className="text-blue-600 hover:text-blue-800">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-6 grid gap-6 md:grid-cols-3">
          {levels.map((level) => (
            <div key={level.id} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-full ${level.color} mr-3`}></div>
                <div>
                  <h3 className="font-semibold text-gray-900">{level.name}</h3>
                  <p className="text-sm text-gray-500">{level.minPoints} points</p>
                </div>
              </div>
              <ul className="space-y-2">
                {level.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Award className="h-4 w-4 text-blue-600 mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Récompenses */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Récompenses Disponibles</h2>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Plus className="h-5 w-5 mr-2" />
              Ajouter
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {rewards.map((reward) => (
              <div key={reward.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="p-3 bg-white rounded-lg shadow mr-4">
                  <Gift className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{reward.name}</h3>
                      <p className="text-sm text-gray-500">{reward.description}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {reward.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-1" />
                      <span className="font-semibold">{reward.points} points</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}