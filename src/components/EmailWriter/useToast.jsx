import { useState, useCallback } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default', duration = 3000 }) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, title, description, variant, duration },
    ]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
    
    return id;
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return { toast, toasts, dismissToast };
} 