import React, { createContext, useContext, useState, useRef } from 'react';
import { useToast } from './useToast';
import { getEmail } from '@/lib/api'; // we'll create this next
import { ToastContainer } from '@/components/ui/toast';

const EmailContext = createContext(null);

export function EmailProvider({ children }) {
  const [emailContent, setEmailContent] = useState('');
  const [action, setAction] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [latestResponse, setLatestResponse] = useState('');
  const [copied, setCopied] = useState(false);
  const responseRef = useRef(null);
  
  const { toast, toasts, dismissToast } = useToast();

  const addMessage = (message, sender, actionUsed) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender, action: actionUsed },
    ]);
    if (sender === 'ai') {
      setLatestResponse(message);
    }
  };

  const handleSubmit = () => {
    if (emailContent.trim() === '') {
      toast({
        title: 'Error',
        description: 'Please enter content to generate a response',
        variant: 'destructive',
      });
      return;
    }

    if (action.trim() === '') {
      toast({
        title: 'Error',
        description: 'Please select an action',
        variant: 'destructive',
      });
      return;
    }

    addMessage(emailContent, 'user', action);
    setLoading(true);
    
    // In a real implementation, use this:
    getEmail(
      emailContent,
      (message) => addMessage(message, 'ai', action),
      action,
      setLoading
    );
  };

  const resetForm = () => {
    setEmailContent('');
    setAction('');
    setMessages([]);
    setLatestResponse('');
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (latestResponse) {
      navigator.clipboard.writeText(latestResponse).then(
        () => {
          setCopied(true);
          toast({
            title: 'Copied to clipboard',
            description: 'Content has been copied to your clipboard',
          });
          setTimeout(() => setCopied(false), 2000);
        },
        (err) => {
          console.error('Could not copy text: ', err);
          toast({
            title: 'Error',
            description: 'Failed to copy to clipboard',
            variant: 'destructive',
          });
        }
      );
    }
  };

  const modifyFurther = () => {
    if (latestResponse) {
      setEmailContent(latestResponse);
      if (responseRef.current) {
        responseRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const value = {
    emailContent,
    setEmailContent,
    action,
    setAction,
    loading,
    messages,
    latestResponse,
    responseRef,
    copied,
    handleSubmit,
    resetForm,
    copyToClipboard,
    modifyFurther,
  };

  return (
    <EmailContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </EmailContext.Provider>
  );
}

export function useEmailContext() {
  const context = useContext(EmailContext);
  if (context === null) {
    throw new Error('useEmailContext must be used within an EmailProvider');
  }
  return context;
} 