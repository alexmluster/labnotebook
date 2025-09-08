import React from 'react';
import { Calendar, Tag, TrendingUp, ExternalLink, Trash2 } from 'lucide-react';
import { Card as CardType } from '../types';

interface TableViewProps {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  onCardDelete?: (cardId: string) => void;
}

export function TableView({ cards, onCardClick, onCardDelete }: TableViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'bg-emerald-100 text-emerald-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'To Explore': return 'bg-amber-100 text-amber-800';
      case 'Abandoned': return 'bg-gray-100 text-gray-600';
      case 'Needs Iteration': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-600';
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
    <div className="flex-1 overflow-hidden p-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title & Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="relative px-6 py-4 w-20">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cards.map((card) => (
                <tr key={card.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-black">{card.title}</div>
                      <div className="text-sm text-gray-600">{card.type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
                      {card.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {card.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-700">
                          {tag}
                        </span>
                      ))}
                      {card.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{card.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <TrendingUp className={`h-4 w-4 mr-1 ${getImpactColor(card.impactLevel)}`} />
                      <span className={`text-sm font-medium ${getImpactColor(card.impactLevel)}`}>
                        {card.impactLevel}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(card.dateAdded).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {card.source}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onCardClick(card)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="View details"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                      {onCardDelete && (
                        <button
                          onClick={() => onCardDelete(card.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}