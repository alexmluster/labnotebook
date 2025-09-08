import React from 'react';
import { Microscope, Grid, Table, Images } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Microscope className="h-8 w-8 text-black" />
            <div>
              <h1 className="text-3xl font-light text-black tracking-tight">
                Innovation Lab
              </h1>
              <p className="text-sm text-gray-600 font-light tracking-wide uppercase">
                Research Notebook
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 bg-gray-50 rounded-full p-1">
            <button
              onClick={() => onViewChange('board')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentView === 'board' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Grid className="h-4 w-4" />
              <span>Board</span>
            </button>
            <button
              onClick={() => onViewChange('table')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentView === 'table' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Table className="h-4 w-4" />
              <span>Table</span>
            </button>
            <button
              onClick={() => onViewChange('gallery')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentView === 'gallery' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Images className="h-4 w-4" />
              <span>Gallery</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}