import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Shield, Home, FileText, ListChecks, Bell, FileBox, HeadphonesIcon, FolderIcon } from 'lucide-react';
import { Notifications } from './Notifications';
import type { Notification } from '../types';

interface LayoutProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export function Layout({ notifications, onMarkAsRead }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                Espace Assuré
              </h1>
            </div>
            <Notifications
              notifications={notifications}
              onMarkAsRead={onMarkAsRead}
            />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-3 py-4 text-sm font-medium ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <Home className="h-5 w-5 mr-2" />
              Tableau de Bord
            </NavLink>
            <NavLink
              to="/assurances"
              className={({ isActive }) =>
                `flex items-center px-3 py-4 text-sm font-medium ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <FileBox className="h-5 w-5 mr-2" />
              Mes Assurances
            </NavLink>
            <NavLink
              to="/declaration"
              className={({ isActive }) =>
                `flex items-center px-3 py-4 text-sm font-medium ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <FileText className="h-5 w-5 mr-2" />
              Déclarer un Sinistre
            </NavLink>
            <NavLink
              to="/suivi"
              className={({ isActive }) =>
                `flex items-center px-3 py-4 text-sm font-medium ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <ListChecks className="h-5 w-5 mr-2" />
              Suivi des Sinistres
            </NavLink>
            <NavLink
              to="/support"
              className={({ isActive }) =>
                `flex items-center px-3 py-4 text-sm font-medium ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <HeadphonesIcon className="h-5 w-5 mr-2" />
              Support Client
            </NavLink>
            <NavLink
              to="/documents"
              className={({ isActive }) =>
                `flex items-center px-3 py-4 text-sm font-medium ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <FolderIcon className="h-5 w-5 mr-2" />
              Mes Documents
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}