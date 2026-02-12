import React, { useState, useEffect, createContext, useContext } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

const ToastContext = createContext<{ addToast: (msg: Omit<ToastMessage, 'id'>) => void } | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ message, type, duration = 3000, onClose }: ToastMessage & { onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
    warning: <AlertTriangle className="text-yellow-500" size={20} />,
  };

  const styles = {
    success: 'border-green-100 bg-green-50',
    error: 'border-red-100 bg-red-50',
    info: 'border-blue-100 bg-blue-50',
    warning: 'border-yellow-100 bg-yellow-50',
  };

  return (
    <div className={`flex items-center min-w-[300px] p-4 rounded-lg border shadow-lg 
      animate-in slide-in-from-right fade-in duration-300 ${styles[type]}`}>
      <span className="mr-3">{icons[type]}</span>
      <p className="flex-1 text-sm font-medium text-gray-800">{message}</p>
      <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600 transition-colors">
        <X size={16} />
      </button>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
