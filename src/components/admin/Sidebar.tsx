import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Shield,
  Users,
  MessageSquare,
  Settings,
  FolderOpen,
  BarChart,
  FileEdit,
  Star,
  Palette,
  MonitorSmartphone,
  LineChart,
  Gauge
} from 'lucide-react';

export function AdminSidebar() {
  const navigation = [
    { name: 'Tableau de Bord', to: '/admin', icon: LayoutDashboard },
    { name: 'Gestion Sinistres', to: '/admin/claims', icon: FileText },
    { name: 'Gestion Contrats', to: '/admin/contracts', icon: Shield },
    { name: 'Clients', to: '/admin/clients', icon: Users },
    { name: 'Support', to: '/admin/support', icon: MessageSquare },
    { name: 'Documents', to: '/admin/documents', icon: FolderOpen },
    { name: 'Formulaires', to: '/admin/forms', icon: FileEdit },
    { name: 'Programme Fidélité', to: '/admin/loyalty', icon: Star },
    { name: 'Produits', to: '/admin/products', icon: Shield },
    { name: 'Identité Visuelle', to: '/admin/branding', icon: Palette },
    { name: 'Interface', to: '/admin/interface', icon: MonitorSmartphone },
    { name: 'Rapports', to: '/admin/reports', icon: BarChart },
    { name: 'Analyses', to: '/admin/analytics', icon: LineChart },
    { name: 'Monitoring', to: '/admin/monitoring', icon: Gauge },
    { name: 'Paramètres', to: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="h-screen flex-none w-64 bg-gray-900 overflow-y-auto">
      <div className="flex h-16 items-center justify-center">
        <h1 className="text-white text-xl font-bold">Administration</h1>
      </div>
      <nav className="mt-5 px-2 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}