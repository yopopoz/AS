import React, { useState } from 'react';
import { Plus, Edit, Trash2, Shield, Tag, FileText } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  features: string[];
  status: 'active' | 'draft' | 'archived';
}

export function Products() {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Assurance Auto Premium',
      type: 'auto',
      description: 'Couverture complète pour votre véhicule',
      price: 49.99,
      features: ['Tous risques', 'Assistance 24/7', 'Protection conducteur'],
      status: 'active',
    },
    {
      id: '2',
      name: 'Assurance Habitation Confort',
      type: 'home',
      description: 'Protection optimale pour votre logement',
      price: 29.99,
      features: ['Dégâts des eaux', 'Vol', 'Responsabilité civile'],
      status: 'active',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produits d'Assurance</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez votre catalogue de produits d'assurance
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Produit
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full
                  ${product.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  ${product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${product.status === 'archived' ? 'bg-gray-100 text-gray-800' : ''}
                `}>
                  {product.status}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>

              <div className="flex items-center mb-4">
                <Tag className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  {product.price.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </span>
                <span className="text-gray-500 ml-1">/mois</span>
              </div>

              <div className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  <FileText className="h-5 w-5" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}