import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full mt-auto py-6 border-t bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <div className="text-sm text-muted-foreground">
              Built by <span className="font-medium text-foreground">Sahil</span>
            </div>
            <div className="text-xs text-muted-foreground/70">
              All rights reserved © {currentYear}
            </div>
          </div>
          
          <div className="flex items-center space-x-5">
            <a 
              href="https://github.com/sahil0902/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/muhammad-sahil-983b2a23a/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="mailto:muhammadsahil757@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-500 fill-red-500" />
            <span>and React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
