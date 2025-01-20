import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface SettingsProps {
  settings: {
    companyName: string;
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    emailNotifications: boolean;
    autoRenewal: boolean;
  };
  onSave: (settings: any) => void;
}

export function Settings({ settings, onSave }: SettingsProps) {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configuration générale de l'application
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
        {/* Identité Visuelle */}
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Identité Visuelle</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personnalisez l'apparence de votre application
            </p>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Nom de l'entreprise
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Logo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Télécharger un fichier</span>
                        <input type="file" className="sr-only" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Couleur Principale
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="h-8 w-8 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Paramètres Système */}
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Paramètres Système</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Configuration des fonctionnalités système
            </p>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700">Notifications par email</label>
                <p className="text-gray-500">Recevoir des notifications par email pour les nouveaux événements</p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={formData.autoRenewal}
                  onChange={(e) => setFormData({ ...formData, autoRenewal: e.target.checked })}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700">Renouvellement automatique</label>
                <p className="text-gray-500">Activer le renouvellement automatique des contrats</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}