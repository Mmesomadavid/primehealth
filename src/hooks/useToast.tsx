import { useState, useCallback } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = useCallback(({ message, type, duration = 3000 }: ToastProps) => {
    setToast({ message, type, duration });

    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  const Toast = () => {
    if (!toast) return null;

    const bgColor = 
      toast.type === 'success' ? 'bg-green-600' :
      toast.type === 'error' ? 'bg-red-500' :
      'bg-blue-500';

    return (
      <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white ${bgColor}`}>
        {toast.message}
      </div>
    );
  };

  return { showToast, Toast };
};

