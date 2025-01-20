import React from 'react';
import { Users, FileText, Bell, TrendingUp, Settings, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Claim, Insurance, SupportTicket } from '../../types';

interface AdminDashboardProps {
  claims: Claim[];
  insurances: Insurance[];
  supportTickets: SupportTicket[];
}

export function AdminDashboard({ claims, insurances, supportTickets }: AdminDashboardProps) {
  const stats = [
    {
      title: 'Sinistres en Attente',
      value: claims.filter(c => c.status === 'pending').length,
      icon: FileText,
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      title: 'Nouvelles Souscriptions',
      value: insurances.filter(i => i.status === 'pending').length,
      icon: Shield,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Tickets Support',
      value: supportTickets.filter(t => t.status === 'open').length,
      icon: Bell,
      color: 'bg-red-100 text-red-800',
    },
    {
      title: 'Clients Actifs',
      value: insurances.filter(i => i.status === 'active').length,
      icon: Users,
      color: 'bg-green-100 text-green-800',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Administrateur</h1>
          <p className="mt-1 text-sm text-gray-500">
            Vue d'ensemble de l'activité
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/admin/settings"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Link>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 p-3 rounded-md ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Graphiques et KPIs */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Performance des Produits */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Performance des Produits</h3>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-4">
              {/* Graphique à implémenter */}
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <span className="text-gray-500">Graphique de performance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activité Récente */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Activité Récente</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {[...claims, ...supportTickets]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((item, itemIdx) => (
                    <li key={item.id}>
                      <div className="relative pb-8">
                        {'type' in item ? (
                          // C'est un ticket de support
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Bell className="h-5 w-5 text-blue-600" />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Nouveau ticket de support
                                  <span className="ml-2 font-medium text-gray-900">
                                    {item.type}
                                  </span>
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                  {new Date(item.createdAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // C'est une déclaration de sinistre
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-yellow-600" />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Nouvelle déclaration de sinistre
                                  <span className="ml-2 font-medium text-gray-900">
                                    {item.type}
                                  </span>
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                  {new Date(item.createdAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}