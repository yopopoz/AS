import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import type { Notification } from '../types';

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export function Notifications({ notifications, onMarkAsRead }: NotificationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Ferme le menu si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (id: string) => {
    onMarkAsRead(id);
    // Ne pas fermer le menu au clic sur une notification
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-6 w-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-gray-500 text-center">
                Aucune notification
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.date).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}