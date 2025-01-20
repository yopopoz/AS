import React, { useState } from 'react';
import { Upload, Calendar, FileText } from 'lucide-react';

interface ClaimFormProps {
  onSubmit: (claim: Partial<Claim>) => void;
}

export function ClaimForm({ onSubmit }: ClaimFormProps) {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      description,
      date,
      status: 'pending',
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setType('');
    setDescription('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Déclarer un Sinistre</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de Sinistre
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Sélectionnez un type</option>
          <option value="auto">Automobile</option>
          <option value="home">Habitation</option>
          <option value="health">Santé</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date du Sinistre
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Documents Justificatifs
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-gray-500 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
            <Upload className="h-8 w-8 mb-2" />
            <span className="text-sm">Déposer des fichiers ici</span>
            <input type="file" className="hidden" multiple accept="image/*,.pdf" />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Soumettre la Déclaration
      </button>
    </form>
  );
}