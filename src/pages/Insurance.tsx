import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, AlertCircle } from 'lucide-react';
import type { Insurance } from '../types';

interface InsurancePageProps {
  insurances: Insurance[];
}

export function Insurance({ insurances }: InsurancePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Insurance>('endDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredInsurances = insurances
    .filter(insurance => 
      insurance.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insurance.contractNumber.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  const handleSort = (field: keyof Insurance) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mes Assurances</h2>
          <p className="mt-2 text-gray-600">
            Gérez vos contrats d'assurance et suivez leurs échéances
          </p>
        </div>
        <Link
          to="/nouvelle-souscription"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle Souscription
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une assurance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  Type d'Assurance
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Numéro de Contrat
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('startDate')}
                >
                  Date de Début
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('endDate')}
                >
                  Date d'Échéance
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('premium')}
                >
                  Prime
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInsurances.map((insurance) => {
                const expirationDate = new Date(insurance.endDate);
                const today = new Date();
                const daysUntilExpiration = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                const isNearExpiration = daysUntilExpiration <= 30 && daysUntilExpiration > 0;

                return (
                  <tr key={insurance.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {insurance.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {insurance.contractNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(insurance.startDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">
                          {new Date(insurance.endDate).toLocaleDateString()}
                        </span>
                        {isNearExpiration && (
                          <AlertCircle className="ml-2 h-5 w-5 text-yellow-500" title="Expiration proche" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {insurance.premium.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${insurance.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                        ${insurance.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${insurance.status === 'expired' ? 'bg-red-100 text-red-800' : ''}
                        ${insurance.status === 'cancelled' ? 'bg-gray-100 text-gray-800' : ''}
                      `}>
                        {insurance.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}