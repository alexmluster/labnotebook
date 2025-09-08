import React from 'react';
import { ExternalLink } from 'lucide-react';

export function FloatingHeader() {
  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <a 
            href="https://alexandrialuster.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl font-light text-black hover:text-gray-600 transition-colors tracking-wide"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Alexandria Luster
          </a>
          
          <a 
            href="https://innovation.alexandrialuster.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-colors font-medium"
          >
            <span>Resources</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}