import React from 'react';
import { BookOpen, Globe, FlaskConical, BarChart3, FileText, Lightbulb, Eye, TrendingUp } from 'lucide-react';
import { Card } from './Card';
import { Card as CardType, Column } from '../types';

interface BoardViewProps {
  columns: Column[];
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  onCardDelete?: (cardId: string) => void;
}

export function BoardView({ columns, cards, onCardClick, onCardDelete }: BoardViewProps) {
  const getColumnCards = (columnId: string) => {
    return cards.filter(card => card.column === columnId);
  };

  const getColumnIcon = (emoji: string) => {
    const iconProps = { className: "h-6 w-6 text-gray-700" };
    switch (emoji) {
      case 'BookOpen': return <BookOpen {...iconProps} />;
      case 'Globe': return <Globe {...iconProps} />;
      case 'FlaskConical': return <FlaskConical {...iconProps} />;
      case 'BarChart3': return <BarChart3 {...iconProps} />;
      case 'FileText': return <FileText {...iconProps} />;
      case 'Lightbulb': return <Lightbulb {...iconProps} />;
      case 'Eye': return <Eye {...iconProps} />;
      case 'TrendingUp': return <TrendingUp {...iconProps} />;
      default: return <BookOpen {...iconProps} />;
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-x-auto">
        <div className="flex space-x-6 p-6 min-w-max">
          {columns.map((column) => {
            const columnCards = getColumnCards(column.id);
            
            return (
              <div key={column.id} className="flex-shrink-0 w-80">
                <div className="bg-gray-50 rounded-lg p-4 h-full">
                  <div className="flex items-center mb-4">
                    <div className="mr-3">{getColumnIcon(column.emoji)}</div>
                    <div>
                      <h2 className="text-lg font-medium text-black">{column.title}</h2>
                      <p className="text-sm text-gray-600 mt-1">{column.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      {columnCards.length} {columnCards.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  
                  <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {columnCards.map((card) => (
                      <Card 
                        key={card.id} 
                        card={card} 
                        onClick={() => onCardClick(card)}
                        onDelete={onCardDelete ? () => onCardDelete(card.id) : undefined}
                      />
                    ))}
                    
                    {columnCards.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <div className="mb-2">{getColumnIcon(column.emoji)}</div>
                        <p className="text-sm">No items yet</p>
                        <p className="text-xs text-gray-400 mt-1">Add your first entry</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}