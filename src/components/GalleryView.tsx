import React from 'react';
import { Calendar, Tag, TrendingUp, BookOpen, Globe, FlaskConical, BarChart3, FileText, Lightbulb, Eye, TrendingUp as TrendingUpIcon, Trash2 } from 'lucide-react';
import { Card as CardType } from '../types';

interface GalleryViewProps {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  onCardDelete?: (cardId: string) => void;
}

export function GalleryView({ cards, onCardClick, onCardDelete }: GalleryViewProps) {
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

  const getTypeIcon = (type: string) => {
    const iconProps = { className: "h-8 w-8" };
    switch (type) {
      case 'Concept': return <BookOpen {...iconProps} />;
      case 'Experiment': return <FlaskConical {...iconProps} />;
      case 'Metric': return <BarChart3 {...iconProps} />;
      case 'Case Study': return <FileText {...iconProps} />;
      case 'Idea': return <Lightbulb {...iconProps} />;
      case 'Note': return <FileText {...iconProps} />;
      case 'Reflection': return <Eye {...iconProps} />;
      case 'Skill': return <TrendingUpIcon {...iconProps} />;
      default: return <BookOpen {...iconProps} />;
    }
  };

  const getCardImage = (type: string) => {
    switch (type) {
      case 'Concept': return 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Experiment': return 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Metric': return 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Case Study': return 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Idea': return 'https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Note': return 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Reflection': return 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      case 'Skill': return 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
      default: return 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 group relative"
          >
            {onCardDelete && (
              <button
                onClick={() => onCardDelete(card.id)}
                className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                title="Delete entry"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            
            <div className="h-48 relative overflow-hidden">
              <img 
                src={getCardImage(card.type)} 
                alt={card.type}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="mb-2">
                    {React.cloneElement(getTypeIcon(card.type), { className: "h-8 w-8 text-white mx-auto" })}
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wide">
                  {card.type}
                </span>
                </div>
              </div>
            </div>
            
            <div 
              className="p-6 cursor-pointer"
              onClick={() => onCardClick(card)}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
                  {card.status}
                </span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`h-3 w-3 ${getImpactColor(card.impactLevel)}`} />
                  <span className={`text-xs font-medium ${getImpactColor(card.impactLevel)}`}>
                    {card.impactLevel}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-black mb-3 hover:text-gray-700 transition-colors line-clamp-2">
                {card.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-4 leading-relaxed">
                {card.notes}
              </p>
              
              {card.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-1 mb-4">
                  <Tag className="h-3 w-3 text-gray-400 mr-1" />
                  {card.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-700">
                      {tag}
                    </span>
                  ))}
                  {card.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{card.tags.length - 3}</span>
                  )}
                </div>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(card.dateAdded).toLocaleDateString()}
                </div>
                <span className="italic">{card.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}