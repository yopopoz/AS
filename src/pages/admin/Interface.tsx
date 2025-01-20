import React, { useState } from 'react';
import { Palette, Layout, Type, Image, Monitor, Smartphone, Tablet, Save } from 'lucide-react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface InterfaceSettings {
  logo: string;
  favicon: string;
  colors: ThemeColors;
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    sidebar: 'fixed' | 'floating';
    header: 'fixed' | 'scroll';
    containerWidth: 'full' | 'contained';
  };
}

export function Interface() {
  const [settings, setSettings] = useState<InterfaceSettings>({
    logo: '/logo.svg',
    favicon: '/favicon.ico',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#111827',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: {
      sidebar: 'fixed',
      header: 'fixed',
      containerWidth: 'contained',
    },
  });

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    setSettings(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value,
      },
    }));
  };

  const handleLayoutChange = (key: keyof InterfaceSettings['layout'], value: string) => {
    setSettings(prev => ({
      ...prev,
      layout: {
        ...prev.layout,
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interface Utilisateur</h1>
          <p className="mt-1 text-sm text-gray-500">
            Personnalisez l'apparence et l'expérience utilisateur
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Save className="h-5 w-5 mr-2" />
          Enregistrer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identité Visuelle */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Identité Visuelle
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Logo et Favicon */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <div className="flex items-center justify-center h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <Image className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 block text-sm text-gray-600">
                      Déposer un logo
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                <div className="flex items-center justify-center h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <Image className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 block text-sm text-gray-600">
                      Déposer un favicon
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Couleurs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Couleurs</label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(settings.colors).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm text-gray-600 mb-1 capitalize">
                      {key}
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                        className="h-8 w-8 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                        className="ml-2 flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typographie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <Type className="h-5 w-5 inline mr-2" />
                Typographie
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Titres</label>
                  <select
                    value={settings.fonts.heading}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      fonts: { ...prev.fonts, heading: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Corps de texte</label>
                  <select
                    value={settings.fonts.body}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      fonts: { ...prev.fonts, body: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mise en Page */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Layout className="h-5 w-5 mr-2" />
              Mise en Page
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Disposition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Disposition des Éléments
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Barre Latérale</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleLayoutChange('sidebar', 'fixed')}
                      className={`px-4 py-2 rounded-md ${
                        settings.layout.sidebar === 'fixed'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'border border-gray-300'
                      }`}
                    >
                      Fixe
                    </button>
                    <button
                      onClick={() => handleLayoutChange('sidebar', 'floating')}
                      className={`px-4 py-2 rounded-md ${
                        settings.layout.sidebar === 'floating'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'border border-gray-300'
                      }`}
                    >
                      Flottante
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">En-tête</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleLayoutChange('header', 'fixed')}
                      className={`px-4 py-2 rounded-md ${
                        settings.layout.header === 'fixed'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'border border-gray-300'
                      }`}
                    >
                      Fixe
                    </button>
                    <button
                      onClick={() => handleLayoutChange('header', 'scroll')}
                      className={`px-4 py-2 rounded-md ${
                        settings.layout.header === 'scroll'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'border border-gray-300'
                      }`}
                    >
                      Défilant
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Responsive Design */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Aperçu Responsive
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Monitor className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Desktop</span>
                </div>
                <div className="text-center">
                  <Tablet className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Tablet</span>
                </div>
                <div className="text-center">
                  <Smartphone className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Mobile</span>
                </div>
              </div>
            </div>

            {/* Prévisualisation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Prévisualisation
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg h-64 flex items-center justify-center">
                <span className="text-gray-500">Aperçu de la mise en page</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}