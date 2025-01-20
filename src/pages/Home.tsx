import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-4">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plateforme de Gestion d'Assurance
          </h1>
          <p className="text-xl text-gray-600">
            Accédez à votre espace personnel ou à l'interface d'administration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Espace Client */}
          <button
            onClick={() => navigate('/')}
            className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              <div className="p-4 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Espace Client</h2>
              <p className="text-gray-600 text-center mb-6">
                Gérez vos contrats, déclarez vos sinistres et suivez vos dossiers en temps réel
              </p>
              <ul className="text-sm text-gray-500 text-left space-y-2">
                <li>• Déclaration et suivi des sinistres</li>
                <li>• Consultation des contrats</li>
                <li>• Gestion documentaire</li>
                <li>• Support client</li>
              </ul>
            </div>
          </button>

          {/* Espace Admin */}
          <button
            onClick={() => navigate('/admin')}
            className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              <div className="p-4 bg-indigo-50 rounded-full mb-4 group-hover:bg-indigo-100 transition-colors">
                <Shield className="h-12 w-12 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Administration</h2>
              <p className="text-gray-600 text-center mb-6">
                Gérez l'ensemble des opérations et accédez aux outils d'administration
              </p>
              <ul className="text-sm text-gray-500 text-left space-y-2">
                <li>• Gestion des sinistres et contrats</li>
                <li>• Suivi des clients</li>
                <li>• Rapports et analyses</li>
                <li>• Configuration du système</li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}