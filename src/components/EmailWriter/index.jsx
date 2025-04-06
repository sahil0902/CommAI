import React from 'react';
import { EmailForm } from './EmailForm';
import { EmailResponse } from './EmailResponse';
import { ToggleTheme } from '@/components/ui/toggle-theme';

export default function EmailWriter() {
  return (
    <div className="container mx-auto p-6">
      <header className="flex items-center justify-between p-5 bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border rounded-xl mb-8 shadow-sm">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">AI Communication Assistant</h1>
        <ToggleTheme />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EmailForm />
        <EmailResponse />
      </div>
    </div>
  );
} 