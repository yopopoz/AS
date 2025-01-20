import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './Sidebar';

export function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}