import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import type { Insurance, InsuranceType } from '../types';

interface NewInsuranceProps {
  onSubmit: (insurance: Partial<Insurance>) => void;
}

export function NewInsurance({ onSubmit }: NewInsuranceProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '' as InsuranceType,
    startDate: '',
    endDate: '',
    premium: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      contractNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'pending',
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'Assurance
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as InsuranceType })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionnez un type</option>
                <option value="auto">Automobile</option>
                <option value="home">Habitation</option>
                <option value="health">Santé</option>
                <option value="life">Vie</option>
                <option value="liability">Responsabilité Civile</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!formData.type}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              Suivant
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de Début
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de Fin
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prime Mensuelle (€)
              </label>
              <input
                type="number"
                value={formData.premium}
                onChange={(e) => setFormData({ ...formData, premium: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!formData.startDate || !formData.endDate || !formData.premium}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                Suivant
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Documents Requis</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <label className="flex flex-col items-center cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Pièce d'identité</span>
                    <input type="file" className="hidden" accept="image/*,.pdf" />
                  </label>
                </div>
                <div className="border rounded-lg p-4">
                  <label className="flex flex-col items-center cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Justificatif de domicile</span>
                    <input type="file" className="hidden" accept="image/*,.pdf" />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                Retour
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Soumettre
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Nouvelle Souscription</h2>
        <p className="mt-2 text-gray-600">
          Complétez les informations ci-dessous pour souscrire à une nouvelle assurance
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="w-full absolute top-1/2 h-0.5 bg-gray-200 -z-10" />
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">Type d'Assurance</span>
          <span className="text-sm text-gray-600">Informations</span>
          <span className="text-sm text-gray-600">Documents</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {renderStep()}
      </form>
    </div>
  );
}