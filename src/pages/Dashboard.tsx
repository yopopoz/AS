import React from 'react';
import { Statistics } from '../components/Statistics';
import { ArrowRight, Clock, FileText, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Claim } from '../types';

interface DashboardProps {
  claims: Claim[];
}

export function Dashboard({ claims }: DashboardProps) {
  const recentClaims = claims.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Bienvenue dans votre espace sinistres
          </h2>
          <p className="text-gray-600 mb-6">
            Gérez vos déclarations de sinistres et suivez leur évolution en temps réel.
          </p>
          <Link
            to="/declaration"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            Déclarer un nouveau sinistre
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Actions Rapides
          </h3>
          <div className="space-y-4">
            <Link
              to="/declaration"
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center text-gray-700">
                <FileText className="h-5 w-5 mr-3" />
                <span>Nouvelle Déclaration</span>
              </div>
            </Link>
            <Link
              to="/suivi"
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center text-gray-700">
                <ListChecks className="h-5 w-5 mr-3" />
                <span>Consulter mes Sinistres</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <Statistics claims={claims} />

      {/* Recent Claims */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Sinistres Récents
          </h3>
        </div>
        <div className="divide-y">
          {recentClaims.map((claim) => (
            <div key={claim.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">
                    Sinistre {claim.type}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Déclaré le {new Date(claim.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">En attente</span>
                </div>
              </div>
              <p className="mt-2 text-gray-600">{claim.description}</p>
            </div>
          ))}
        </div>
        {claims.length > 3 && (
          <div className="p-6 border-t">
            <Link
              to="/suivi"
              className="text-blue-600 hover:text-blue-800 flex items-center justify-center"
            >
              Voir tous les sinistres
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}