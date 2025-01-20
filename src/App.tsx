import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/admin/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Declaration } from './pages/Declaration';
import { Suivi } from './pages/Suivi';
import { Insurance } from './pages/Insurance';
import { NewInsurance } from './pages/NewInsurance';
import { Support } from './pages/Support';
import { Documents } from './pages/Documents';
import { AdminDashboard } from './pages/admin/Dashboard';
import { ClaimsManagement } from './pages/admin/ClaimsManagement';
import { ContractsManagement } from './pages/admin/ContractsManagement';
import { Clients } from './pages/admin/Clients';
import { Products } from './pages/admin/Products';
import { Loyalty } from './pages/admin/Loyalty';
import { Reports } from './pages/admin/Reports';
import { Settings as AdminSettings } from './pages/admin/Settings';
import { Interface } from './pages/admin/Interface';
import { Monitoring } from './pages/admin/Monitoring';
import type { Claim, Notification, Insurance as InsuranceType, SupportTicket, Document } from './types';

function App() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [insurances, setInsurances] = useState<InsuranceType[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [settings, setSettings] = useState({
    companyName: 'AssurTech',
    logo: '',
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    emailNotifications: true,
    autoRenewal: true,
  });

  // Check for insurance expiration notifications
  useEffect(() => {
    const checkExpirations = () => {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      insurances.forEach(insurance => {
        const expirationDate = new Date(insurance.endDate);
        if (expirationDate <= thirtyDaysFromNow) {
          const notification: Notification = {
            id: Math.random().toString(36).substr(2, 9),
            message: `Votre assurance ${insurance.type} expire le ${new Date(insurance.endDate).toLocaleDateString()}`,
            date: new Date().toISOString(),
            read: false,
          };
          setNotifications(prev => {
            const exists = prev.some(n => n.message === notification.message);
            return exists ? prev : [notification, ...prev];
          });
        }
      });
    };

    checkExpirations();
    const interval = setInterval(checkExpirations, 24 * 60 * 60 * 1000); // Check daily
    return () => clearInterval(interval);
  }, [insurances]);

  const handleClaimSubmit = (newClaim: Partial<Claim>) => {
    const claim: Claim = {
      ...newClaim,
      id: Math.random().toString(36).substr(2, 9),
      documents: [],
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Claim;

    setClaims(prev => [claim, ...prev]);
    
    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      message: `Votre déclaration de sinistre a été enregistrée avec succès.`,
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const handleNewInsurance = (insurance: Partial<InsuranceType>) => {
    const newInsurance: InsuranceType = {
      ...insurance,
      id: Math.random().toString(36).substr(2, 9),
      documents: [],
      status: 'pending',
    } as InsuranceType;

    setInsurances(prev => [newInsurance, ...prev]);

    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      message: `Votre demande de souscription a été enregistrée avec succès.`,
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const handleSupportTicket = (ticket: Partial<SupportTicket>) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: Math.random().toString(36).substr(2, 9),
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
    } as SupportTicket;

    setSupportTickets(prev => [newTicket, ...prev]);

    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      message: `Votre demande de support a été enregistrée avec succès.`,
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleUpdateClaim = (id: string, status: string) => {
    setClaims(prev =>
      prev.map(claim =>
        claim.id === id
          ? { ...claim, status, updatedAt: new Date().toISOString() }
          : claim
      )
    );

    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      message: `Le statut de votre sinistre a été mis à jour : ${status}`,
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const handleUpdateContract = (id: string, status: string) => {
    setInsurances(prev =>
      prev.map(insurance =>
        insurance.id === id
          ? { ...insurance, status }
          : insurance
      )
    );

    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      message: `Le statut de votre contrat a été mis à jour : ${status}`,
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [notification, ...prev]);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil */}
        <Route path="/home" element={<Home />} />

        {/* Interface Client */}
        <Route 
          path="/" 
          element={
            <Layout 
              notifications={notifications}
              onMarkAsRead={handleMarkNotificationAsRead}
            />
          }
        >
          <Route index element={<Dashboard claims={claims} insurances={insurances} />} />
          <Route path="declaration" element={<Declaration onSubmit={handleClaimSubmit} />} />
          <Route path="suivi" element={<Suivi claims={claims} />} />
          <Route path="assurances" element={<Insurance insurances={insurances} />} />
          <Route path="nouvelle-souscription" element={<NewInsurance onSubmit={handleNewInsurance} />} />
          <Route path="support" element={<Support tickets={supportTickets} onSubmit={handleSupportTicket} />} />
          <Route path="documents" element={<Documents documents={documents} setDocuments={setDocuments} />} />
        </Route>

        {/* Interface Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={
            <AdminDashboard 
              claims={claims}
              insurances={insurances}
              supportTickets={supportTickets}
            />
          } />
          <Route path="claims" element={
            <ClaimsManagement 
              claims={claims}
              onUpdateClaim={handleUpdateClaim}
            />
          } />
          <Route path="contracts" element={
            <ContractsManagement 
              insurances={insurances}
              onUpdateContract={handleUpdateContract}
            />
          } />
          <Route path="clients" element={
            <Clients 
              insurances={insurances}
            />
          } />
          <Route path="products" element={<Products />} />
          <Route path="loyalty" element={<Loyalty />} />
          <Route path="interface" element={<Interface />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="reports" element={
            <Reports
              claims={claims}
              insurances={insurances}
              supportTickets={supportTickets}
            />
          } />
          <Route path="settings" element={
            <AdminSettings 
              settings={settings}
              onSave={setSettings}
            />
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;