import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, MapPin, FileText } from 'lucide-react';
import type { Insurance } from '../../types';

interface ClientsProps {
  insurances: Insurance[];
}

export function Clients({ insurances }: ClientsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Simuler des données clients basées sur les contrats
  const clients = Array.from(new Set(insurances.map(i => i.contractNumber))).map(contractNumber => {
    const clientInsurances = insurances.filter(i => i.contractNumber === contractNumber);
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: `Client ${contractNumber}`,
      email: `client${contractNumber}@example.com`,
      phone: '+33 1 23 45 67 89',
      address: 'Paris, France',
      insurances: clientInsurances,
      status: clientInsurances.some(i => i.status === 'active') ? 'active' : 'inactive',
      joinDate: clientInsurances[0].startDate,
    };
  });

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
          <p className="mt-1 text-sm text-gray-500">
            Vue d'ensemble et gestion de la clientèle
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
                placeholder="Rechercher un client..."
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
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des Clients */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contrats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">
                        Client depuis {new Date(client.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <div className="flex items-center mb-1">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {client.email}
                    </div>
                    <div className="flex items-center mb-1">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {client.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {client.address}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {client.insurances.map((insurance) => (
                      <div key={insurance.id} className="mb-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {insurance.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  `}>
                    {client.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    <FileText className="h-5 w-5" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    <Mail className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}