import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ClaimsList } from '../components/ClaimsList';
import type { Claim } from '../types';

interface SuiviProps {
  claims: Claim[];
}

export function Suivi({ claims }: SuiviProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || claim.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Suivi des Sinistres
          </h2>
          <p className="mt-2 text-gray-600">
            Consultez et suivez l'évolution de vos sinistres déclarés
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <div className="flex gap-4">
          {/* Search */}
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

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="processing">En cours</option>
            <option value="resolved">Résolu</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>
      </div>

      <ClaimsList claims={filteredClaims} />
    </div>
  );
}