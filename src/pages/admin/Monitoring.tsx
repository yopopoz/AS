import React, { useState } from 'react';
import { 
  Gauge, 
  Server, 
  Activity, 
  AlertTriangle, 
  Clock, 
  Database,
  Cpu,
  HardDrive,
  RefreshCw
} from 'lucide-react';

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  responseTime: number;
  uptime: number;
  activeUsers: number;
  errorRate: number;
}

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

export function Monitoring() {
  const [metrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 68,
    disk: 72,
    responseTime: 250,
    uptime: 99.98,
    activeUsers: 1234,
    errorRate: 0.05,
  });

  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'Utilisation CPU élevée détectée',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'info',
      message: 'Sauvegarde système programmée',
      timestamp: new Date().toISOString(),
    },
  ]);

  const getStatusColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'text-green-500';
    if (value <= thresholds[1]) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatUptime = (uptime: number) => {
    return `${uptime}%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monitoring Système</h1>
          <p className="mt-1 text-sm text-gray-500">
            Surveillance en temps réel des performances système
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <RefreshCw className="h-5 w-5 mr-2" />
          Actualiser
        </button>
      </div>

      {/* Métriques Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Cpu className="h-6 w-6" />
            </div>
            <span className={`text-2xl font-bold ${getStatusColor(metrics.cpu, [60, 80])}`}>
              {metrics.cpu}%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm">Utilisation CPU</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <HardDrive className="h-6 w-6" />
            </div>
            <span className={`text-2xl font-bold ${getStatusColor(metrics.memory, [70, 85])}`}>
              {metrics.memory}%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm">Utilisation Mémoire</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-green-500">
              {formatUptime(metrics.uptime)}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm">Uptime</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Clock className="h-6 w-6" />
            </div>
            <span className={`text-2xl font-bold ${getStatusColor(metrics.responseTime / 10, [30, 50])}`}>
              {metrics.responseTime}ms
            </span>
          </div>
          <h3 className="text-gray-600 text-sm">Temps de Réponse</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphiques de Performance */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Gauge className="h-5 w-5 mr-2" />
              Performance Système
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* CPU Usage */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">CPU</span>
                  <span className="text-sm font-medium text-gray-900">{metrics.cpu}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${metrics.cpu}%` }}
                  ></div>
                </div>
              </div>

              {/* Memory Usage */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Mémoire</span>
                  <span className="text-sm font-medium text-gray-900">{metrics.memory}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${metrics.memory}%` }}
                  ></div>
                </div>
              </div>

              {/* Disk Usage */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Disque</span>
                  <span className="text-sm font-medium text-gray-900">{metrics.disk}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${metrics.disk}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alertes Système */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alertes Système
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg ${
                    alert.type === 'error' ? 'bg-red-50' :
                    alert.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full ${
                      alert.type === 'error' ? 'bg-red-100 text-red-600' :
                      alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        alert.type === 'error' ? 'text-red-800' :
                        alert.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'
                      }`}>
                        {alert.message}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques Serveur */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Server className="h-5 w-5 mr-2" />
            Statistiques Serveur
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Base de Données</span>
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">
                  {metrics.activeUsers}
                </span>
                <span className="ml-2 text-sm text-gray-500">connexions</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Taux d'Erreur</span>
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">
                  {metrics.errorRate}%
                </span>
                <span className="ml-2 text-sm text-gray-500">sur 24h</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Cache</span>
                <Server className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">94%</span>
                <span className="ml-2 text-sm text-gray-500">hit rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}