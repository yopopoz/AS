import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Claim } from '../types';

interface ClaimsListProps {
  claims: Claim[];
}

const statusIcons = {
  pending: Clock,
  processing: AlertCircle,
  resolved: CheckCircle,
  rejected: XCircle,
};

const statusColors = {
  pending: 'text-yellow-500',
  processing: 'text-blue-500',
  resolved: 'text-green-500',
  rejected: 'text-red-500',
};

const statusLabels = {
  pending: 'En attente',
  processing: 'En cours',
  resolved: 'Résolu',
  rejected: 'Rejeté',
};

export function ClaimsList({ claims }: ClaimsListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mes Sinistres</h2>
      
      {claims.map((claim) => {
        const StatusIcon = statusIcons[claim.status];
        const statusColor = statusColors[claim.status];
        
        return (
          <div key={claim.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Sinistre {claim.type}
                </h3>
                <p className="text-sm text-gray-500">
                  Déclaré le {new Date(claim.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className={`flex items-center ${statusColor}`}>
                <StatusIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  {statusLabels[claim.status]}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{claim.description}</p>
            
            {claim.documents.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Documents joints
                </h4>
                <div className="flex gap-2">
                  {claim.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      <span>Document {index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}