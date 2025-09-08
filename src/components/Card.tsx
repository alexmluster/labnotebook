import React from 'react';
import { Calendar, Tag, TrendingUp, Trash2 } from 'lucide-react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: () => void;
  onDelete?: () => void;
}

export function Card({ card, onClick, onDelete }: CardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'To Explore': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Abandoned': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'Needs Iteration': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Concept': return 'text-indigo-600';
      case 'Experiment': return 'text-green-600';
      case 'Metric': return 'text-blue-600';
      case 'Case Study': return 'text-purple-600';
      case 'Idea': return 'text-yellow-600';
      case 'Note': return 'text-gray-600';
      case 'Reflection': return 'text-pink-600';
      case 'Skill': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group relative"
    >
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
          title="Delete entry"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
      
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-medium uppercase tracking-wide ${getTypeColor(card.type)}`}>
          {card.type}
        </span>
        <div className="flex items-center space-x-1">
          <TrendingUp className={`h-3 w-3 ${getImpactColor(card.impactLevel)}`} />
          <span className={`text-xs font-medium ${getImpactColor(card.impactLevel)}`}>
            {card.impactLevel}
          </span>
        </div>
      </div>
      
      <h3 
        onClick={onClick}
        className="text-base font-medium text-black mb-3 group-hover:text-gray-700 transition-colors line-clamp-2 cursor-pointer"
      >
        {card.title}
      </h3>
      
      <p 
        onClick={onClick}
        className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed cursor-pointer"
      >
        {card.notes}
      </p>
      
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(card.status)}`}>
          {card.status}
        </span>
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          {new Date(card.dateAdded).toLocaleDateString()}
        </div>
      </div>
      
      {card.tags.length > 0 && (
        <div className="flex items-center flex-wrap gap-1">
          <Tag className="h-3 w-3 text-gray-400 mr-1" />
          {card.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-700">
              {tag}
            </span>
          ))}
          {card.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{card.tags.length - 3} more</span>
          )}
        </div>
      )}
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500 italic">Source: {card.source}</span>
      </div>
    </div>
  );
}