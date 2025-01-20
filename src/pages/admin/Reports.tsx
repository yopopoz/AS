import React, { useState } from 'react';
import { BarChart2, PieChart, TrendingUp, Download } from 'lucide-react';
import type { Claim, Insurance, SupportTicket } from '../../types';

interface ReportsProps {
  claims: Claim[];
  insurances: Insurance[];
  supportTickets: SupportTicket[];
}

export function Reports({ claims, insurances, supportTickets }: ReportsProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [reportType, setReportType] = useState<'claims' | 'contracts' | 'support'>('claims');

  const getClaimsStats = () => {
    const total = claims.length;
    const pending = claims.filter(c => c.status === 'pending').length;
    const resolved = claims.filter(c => c.status === 'resolved').length;
    const rejected = claims.filter(c => c.status === 'rejected').length;

    return {
      total,
      pending,
      resolved,
      rejected,
      resolutionRate: total ? ((resolved / total) * 100).toFixed(1) : '0',
    };
  };

  const getContractsStats = () => {
    const total = insurances.length;
    const active = insurances.filter(i => i.status === 'active').length;
    const pending = insurances.filter(i => i.status === 'pending').length;
    const expired = insurances.filter(i => i.status === 'expired').length;

    return {
      total,
      active,
      pending,
      expired,
      activeRate: total ? ((active / total) * 100).toFixed(1) : '0',
    };
  };

  const getSupportStats = () => {
    const total = supportTickets.length;
    const open = supportTickets.filter(t => t.status === 'open').length;
    const resolved = supportTickets.filter(t => t.status === 'resolved').length;
    const inProgress = supportTickets.filter(t => t.status === 'in_progress').length;

    return {
      total,
      open,
      resolved,
      inProgress,
      resolutionRate: total ? ((resolved / total) * 100).toFixed(1) : '0',
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rapports et Analyses</h1>
          <p className="mt-1 text-sm text-gray-500">
            Visualisez et analysez les performances de l'entreprise
          </p>
        </div>
        <div className="flex space-x-4">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as 'week' | 'month' | 'year')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Download className="h-5 w-5 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      {/* Navigation des rapports */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex space-x-4">
          <button
            onClick={() => setReportType('claims')}
            className={`flex-1 py-2 px-4 rounded-md ${
              reportType === 'claims'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Sinistres
          </button>
          <button
            onClick={() => setReportType('contracts')}
            className={`flex-1 py-2 px-4 rounded-md ${
              reportType === 'contracts'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Contrats
          </button>
          <button
            onClick={() => setReportType('support')}
            className={`flex-1 py-2 px-4 rounded-md ${
              reportType === 'support'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Support Client
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportType === 'claims' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getClaimsStats().total}</span>
              </div>
              <h3 className="text-gray-600 text-sm">Total des Sinistres</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <PieChart className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getClaimsStats().pending}</span>
              </div>
              <h3 className="text-gray-600 text-sm">En Attente</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getClaimsStats().resolved}</span>
              </div>
              <h3 className="text-gray-600 text-sm">Résolus</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getClaimsStats().resolutionRate}%</span>
              </div>
              <h3 className="text-gray-600 text-sm">Taux de Résolution</h3>
            </div>
          </>
        )}

        {reportType === 'contracts' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getContractsStats().total}</span>
              </div>
              <h3 className="text-gray-600 text-sm">Total des Contrats</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <PieChart className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getContractsStats().active}</span>
              </div>
              <h3 className="text-gray-600 text-sm">Contrats Actifs</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getContractsStats().pending}</span>
              </div>
              <h3 className="text-gray-600 text-sm">En Attente</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getContractsStats().activeRate}%</span>
              </div>
              <h3 className="text-gray-600 text-sm">Taux d'Activation</h3>
            </div>
          </>
        )}

        {reportType === 'support' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getSupportStats().total}</span>
              </div>
              <h3 className="text-gray-600 text-sm">Total des Tickets</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <PieChart className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getSupportStats().open}</span>
              </div>
              <h3 className="text-gray-600 text-sm">Tickets Ouverts</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getSupportStats().resolved}</span>
              </div>
              <h3 className="text-gray-600 text-sm">Tickets Résolus</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">{getSupportStats().resolutionRate}%</span>
              </div>
              <h3 className="text-gray-600 text-sm">Taux de Résolution</h3>
            </div>
          </>
        )}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Évolution sur la période</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <span className="text-gray-500">Graphique d'évolution</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Répartition par catégorie</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <span className="text-gray-500">Graphique de répartition</span>
          </div>
        </div>
      </div>
    </div>
  );
}