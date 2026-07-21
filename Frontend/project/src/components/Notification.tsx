import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { getUserRole } from '../utils/authHeader';

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" />;
      case 'error': return <AlertCircle className="text-red-500" />;
      case 'warning': return <AlertTriangle className="text-yellow-500" />;
      default: return <Info className="text-blue-500" />;
    }
  };

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white min-w-[250px]">
      <div className="flex justify-between items-start">
        <div className="flex gap-2">
          {getIcon()}
          <div>
            <p className="font-bold">{title}</p>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// Context
const ToasterContext = React.createContext<any>(null);

export const useNotification = () => {
  const context = React.useContext(ToasterContext);
  return context || { notify: () => {} };
};

export const Toaster: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<
    {
      id: string;
      type: 'success' | 'error' | 'info' | 'warning';
      title: string;
      message: string;
    }[]
  >([]);

  const notify = (
    type: 'success' | 'error' | 'info' | 'warning',
    title: string,
    message: string
  ) => {
    const currentRole = getUserRole();

    if (currentRole !== 'doctor') return;

    console.log("NOTIFY CALLED");

    const id = Math.random().toString(36);

    setNotifications(prev => [
      ...prev,
      { id, type, title, message }
    ]);
  };

  const remove = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ notify }}>
      {children}

      {getUserRole() === 'doctor' && (
        <div className="fixed top-4 right-4 space-y-2 z-[9999]">
          {notifications.map(n => (
            <Notification
              key={n.id}
              {...n}
              duration={5000}
              onClose={() => remove(n.id)}
            />
          ))}
        </div>
      )}
    </ToasterContext.Provider>
  );
};