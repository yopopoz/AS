import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import type { Claim } from '../../types';

interface ClaimsManagementProps {
  claims: Claim[];
  onUpdateClaim: (id: string, status: string) => void;
}

export function ClaimsManagement({ claims, onUpdateClaim }: ClaimsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = 
      claim.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || claim.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Sinistres</h1>
          <p className="mt-1 text-sm text-gray-500">
            Traitement et suivi des déclarations
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
                placeholder="Rechercher un sinistre..."
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
              <option value="processing">En cours</option>
              <option value="resolved">Résolu</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des Sinistres */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredClaims.map((claim) => (
            <li key={claim.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        Sinistre {claim.type}
                      </p>
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${claim.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${claim.status === 'processing' ? 'bg-blue-100 text-blue-800' : ''}
                        ${claim.status === 'resolved' ? 'bg-green-100 text-green-800' : ''}
                        ${claim.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {claim.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {claim.description}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <button
                      onClick={() => onUpdateClaim(claim.id, 'resolved')}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                      title="Approuver"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onUpdateClaim(claim.id, 'rejected')}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                      title="Rejeter"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                      title="Commenter"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Créé le {new Date(claim.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {claim.documents.length > 0 && (
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        {claim.documents.length} document{claim.documents.length > 1 ? 's' : ''} joint{claim.documents.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}