import React from 'react';
import { X, Calendar, Tag, TrendingUp, FileText, User, Clock } from 'lucide-react';
import { Card } from '../types';

interface CardModalProps {
  card: Card;
  isOpen: boolean;
  onClose: () => void;
}

export function CardModal({ card, isOpen, onClose }: CardModalProps) {
  if (!isOpen) return null;

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
      case 'Concept': return 'text-indigo-600 bg-indigo-50';
      case 'Experiment': return 'text-green-600 bg-green-50';
      case 'Metric': return 'text-blue-600 bg-blue-50';
      case 'Case Study': return 'text-purple-600 bg-purple-50';
      case 'Idea': return 'text-yellow-600 bg-yellow-50';
      case 'Note': return 'text-gray-600 bg-gray-50';
      case 'Reflection': return 'text-pink-600 bg-pink-50';
      case 'Skill': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose} />

        <div className="inline-block w-full max-w-2xl p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className={`px-8 pt-8 pb-6 ${getTypeColor(card.type)}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide ${getTypeColor(card.type).split(' ')[0]} ${getTypeColor(card.type)}`}>
                    {card.type}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className={`h-4 w-4 ${getImpactColor(card.impactLevel)}`} />
                  <span className={`text-sm font-medium ${getImpactColor(card.impactLevel)}`}>
                    {card.impactLevel} Impact
                  </span>
                </div>
              </div>
              
              <h2 className="text-2xl font-light text-black mb-2">
                {card.title}
              </h2>
            </div>

            <div className="px-8 pb-8">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</p>
                    <span className={`inline-flex items-center mt-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(card.status)}`}>
                      {card.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date Added</p>
                    <p className="text-sm font-medium text-black mt-1">
                      {new Date(card.dateAdded).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Source</p>
                    <p className="text-sm font-medium text-black mt-1">{card.source}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Notes & Learnings</h3>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {card.notes}
                  </p>
                </div>
              </div>

              {card.tags.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Tag className="h-5 w-5 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-800 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}