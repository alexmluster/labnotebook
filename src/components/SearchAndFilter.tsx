import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Card } from '../types';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedImpact: string;
  onImpactChange: (impact: string) => void;
}

export function SearchAndFilter({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  selectedImpact,
  onImpactChange
}: SearchAndFilterProps) {
  const types: Card['type'][] = ['Concept', 'Experiment', 'Metric', 'Case Study', 'Idea', 'Note', 'Reflection', 'Skill'];
  const statuses: Card['status'][] = ['To Explore', 'In Progress', 'Complete', 'Abandoned', 'Needs Iteration'];
  const impacts: Card['impactLevel'][] = ['High', 'Medium', 'Low'];

  return (
    <div className="bg-white border-b border-gray-100 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>

            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              value={selectedImpact}
              onChange={(e) => onImpactChange(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">All Impact Levels</option>
              {impacts.map(impact => (
                <option key={impact} value={impact}>{impact}</option>
              ))}
            </select>

            {(searchTerm || selectedType || selectedStatus || selectedImpact) && (
              <button
                onClick={() => {
                  onSearchChange('');
                  onTypeChange('');
                  onStatusChange('');
                  onImpactChange('');
                }}
                className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}