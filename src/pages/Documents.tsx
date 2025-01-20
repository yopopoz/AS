import React, { useState } from 'react';
import { Search, Upload, Download, Share2, Folder } from 'lucide-react';
import type { Document, DocumentCategory } from '../types';

interface DocumentsProps {
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

export function Documents({ documents, setDocuments }: DocumentsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>('all');

  const categories: { value: DocumentCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'Tous les documents' },
    { value: 'contracts', label: 'Contrats' },
    { value: 'invoices', label: 'Factures' },
    { value: 'certificates', label: 'Attestations' },
    { value: 'personal', label: 'Documents personnels' },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Mes Documents</h2>
        <p className="mt-2 text-gray-600">
          Gérez et organisez vos documents d'assurance
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Déposer des documents
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Sélectionner des fichiers
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as DocumentCategory | 'all')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Folder className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span>{formatFileSize(doc.size)}</span>
                    <span>•</span>
                    <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 text-gray-600 hover:text-blue-600"
                  title="Télécharger"
                >
                  <Download className="h-5 w-5" />
                </button>
                <button
                  className="p-2 text-gray-600 hover:text-blue-600"
                  title="Partager"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}