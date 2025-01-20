import React from 'react';
import { BarChart, Clock, CheckCircle, XCircle } from 'lucide-react';
import type { Claim } from '../types';

interface StatisticsProps {
  claims: Claim[];
}

export function Statistics({ claims }: StatisticsProps) {
  const totalClaims = claims.length;
  const resolvedClaims = claims.filter(c => c.status === 'resolved').length;
  const pendingClaims = claims.filter(c => c.status === 'pending').length;
  const rejectedClaims = claims.filter(c => c.status === 'rejected').length;

  const stats = [
    {
      label: 'Total des Sinistres',
      value: totalClaims,
      icon: BarChart,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'En Attente',
      value: pendingClaims,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      label: 'Résolus',
      value: resolvedClaims,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Rejetés',
      value: rejectedClaims,
      icon: XCircle,
      color: 'bg-red-100 text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <h3 className="text-gray-600 text-sm">{stat.label}</h3>
          </div>
        );
      })}
    </div>
  );
}