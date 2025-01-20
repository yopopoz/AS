import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Insurance } from '../../types';

interface ContractsManagementProps {
  insurances: Insurance[];
  onUpdateContract: (id: string, status: string) => void;
}

export function ContractsManagement({ insurances, onUpdateContract }: ContractsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredContracts = insurances.filter(insurance => {
    const matchesSearch = 
      insurance.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insurance.contractNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || insurance.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Contrats</h1>
          <p className="mt-1 text-sm text-gray-500">
            Suivi et validation des contrats d'assurance
          </p>
        </div>
      </div>

      {/* Filtres et Recherche */}
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un contrat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="active">Actif</option>
              <option value="expired">Expiré</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des Contrats */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contrat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prime
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContracts.map((contract) => {
              const expirationDate = new Date(contract.endDate);
              const today = new Date();
              const daysUntilExpiration = Math.ceil(
                (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
              );
              const isNearExpiration = daysUntilExpiration <= 30 && daysUntilExpiration > 0;

              return (
                <tr key={contract.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {contract.contractNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Du {new Date(contract.startDate).toLocaleDateString()}
                      <br />
                      Au {new Date(contract.endDate).toLocaleDateString()}
                      {isNearExpiration && (
                        <span className="ml-2 inline-flex items-center">
                          <AlertCircle className="h-4 w-4 text-yellow-500" title="Expiration proche" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {contract.premium.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${contract.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      ${contract.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${contract.status === 'expired' ? 'bg-red-100 text-red-800' : ''}
                      ${contract.status === 'cancelled' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onUpdateContract(contract.id, 'active')}
                        className="text-green-600 hover:text-green-900"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onUpdateContract(contract.id, 'cancelled')}
                        className="text-red-600 hover:text-red-900"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}