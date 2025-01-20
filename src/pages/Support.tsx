import React, { useState } from 'react';
import { Upload, Send, Clock, CheckCircle, XCircle } from 'lucide-react';
import type { SupportTicket, SupportTicketType } from '../types';

interface SupportProps {
  tickets: SupportTicket[];
  onSubmit: (ticket: Partial<SupportTicket>) => void;
}

export function Support({ tickets, onSubmit }: SupportProps) {
  const [type, setType] = useState<SupportTicketType>('question');
  const [contractNumber, setContractNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      contractNumber: contractNumber || undefined,
      message,
      attachments: [],
    });
    setType('question');
    setContractNumber('');
    setMessage('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <Send className="h-5 w-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'closed':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Formulaire de Contact */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contacter le Support</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de Demande
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as SupportTicketType)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="question">Question</option>
              <option value="complaint">Réclamation</option>
              <option value="other">Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro de Contrat (facultatif)
            </label>
            <input
              type="text"
              value={contractNumber}
              onChange={(e) => setContractNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: ABC123456"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pièces Jointes
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  Cliquez pour ajouter des fichiers
                </span>
                <input type="file" className="hidden" multiple accept="image/*,.pdf" />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Envoyer
          </button>
        </form>
      </div>

      {/* Historique des Tickets */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Historique des Demandes</h2>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {ticket.type === 'complaint' ? 'Réclamation' : 
                     ticket.type === 'question' ? 'Question' : 'Autre'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(ticket.status)}
                  <span className="ml-2 text-sm font-medium">
                    {ticket.status === 'open' ? 'Ouvert' :
                     ticket.status === 'in_progress' ? 'En cours' :
                     ticket.status === 'resolved' ? 'Résolu' : 'Fermé'}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{ticket.message}</p>

              {ticket.responses.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Réponses
                  </h4>
                  <div className="space-y-4">
                    {ticket.responses.map((response) => (
                      <div
                        key={response.id}
                        className={`p-4 rounded-lg ${
                          response.isAgent
                            ? 'bg-blue-50 ml-4'
                            : 'bg-gray-50 mr-4'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium">
                            {response.isAgent ? 'Support' : 'Vous'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(response.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{response.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}