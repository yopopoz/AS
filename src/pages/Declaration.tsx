import React from 'react';
import { ClaimForm } from '../components/ClaimForm';
import type { Claim } from '../types';

interface DeclarationProps {
  onSubmit: (claim: Partial<Claim>) => void;
}

export function Declaration({ onSubmit }: DeclarationProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Déclarer un Nouveau Sinistre
        </h2>
        <p className="mt-2 text-gray-600">
          Remplissez le formulaire ci-dessous pour déclarer un sinistre. 
          Veillez à fournir des informations précises et complètes.
        </p>
      </div>
      <ClaimForm onSubmit={onSubmit} />
    </div>
  );
}