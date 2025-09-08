import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { FloatingHeader } from './components/FloatingHeader';
import { SearchAndFilter } from './components/SearchAndFilter';
import { Header } from './components/Header';
import { BoardView } from './components/BoardView';
import { TableView } from './components/TableView';
import { GalleryView } from './components/GalleryView';
import { CardModal } from './components/CardModal';
import { AddEntryModal } from './components/AddEntryModal';
import { PasscodeModal } from './components/PasscodeModal';
import { columns, sampleCards } from './data/sampleData';
import { ViewMode, Card } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('board');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddPasscodeModalOpen, setIsAddPasscodeModalOpen] = useState(false);
  const [isDeletePasscodeModalOpen, setIsDeletePasscodeModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>(sampleCards);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedImpact, setSelectedImpact] = useState('');

  useEffect(() => {
    // Trigger initial load animation
    setIsLoaded(true);

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('animate-on-scroll');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Filter cards based on search and filters
  const filteredCards = cards.filter(card => {
    const matchesSearch = searchTerm === '' || 
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      card.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === '' || card.type === selectedType;
    const matchesStatus = selectedStatus === '' || card.status === selectedStatus;
    const matchesImpact = selectedImpact === '' || card.impactLevel === selectedImpact;
    
    return matchesSearch && matchesType && matchesStatus && matchesImpact;
  });

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleAddButtonClick = () => {
    setIsAddPasscodeModalOpen(true);
  };

  const handleAddPasscodeSuccess = () => {
    setIsAddModalOpen(true);
  };

  const handleAddEntry = (newCardData: Omit<Card, 'id' | 'dateAdded'>) => {
    const newCard: Card = {
      ...newCardData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setCards(prev => [...prev, newCard]);
  };

  const handleDeleteRequest = (cardId: string) => {
    setCardToDelete(cardId);
    setIsDeletePasscodeModalOpen(true);
  };

  const handleDeletePasscodeSuccess = () => {
    if (cardToDelete) {
      setCards(prev => prev.filter(card => card.id !== cardToDelete));
      setCardToDelete(null);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'board':
        return (
          <BoardView 
            columns={columns} 
            cards={filteredCards} 
            onCardClick={handleCardClick}
            onCardDelete={handleDeleteRequest}
          />
        );
      case 'table':
        return (
          <TableView 
            cards={filteredCards} 
            onCardClick={handleCardClick}
            onCardDelete={handleDeleteRequest}
          />
        );
      case 'gallery':
        return (
          <GalleryView 
            cards={filteredCards} 
            onCardClick={handleCardClick}
            onCardDelete={handleDeleteRequest}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <FloatingHeader />
      
      {/* Hero Section */}
      <div className={`bg-white border-b border-gray-100 pt-20 ${isLoaded ? 'animate-fade-in-up animate-delay-200' : 'animate-on-scroll'}`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-light text-black mb-4 tracking-tight">
              Innovation Research Lab
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              A curated collection of insights, experiments, and frameworks for building 
              exceptional user experiences and driving meaningful innovation.
            </p>
            <div className="mt-8">
              <button 
                onClick={handleAddButtonClick}
                className="inline-flex items-center px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-all duration-200 font-medium tracking-wide uppercase text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Entry
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`${isLoaded ? 'animate-fade-in-up animate-delay-300' : 'animate-on-scroll'}`}>
        <Header currentView={currentView} onViewChange={setCurrentView} />
      </div>
      <div className={`${isLoaded ? 'animate-fade-in-up animate-delay-400' : 'animate-on-scroll'}`}>
        <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedImpact={selectedImpact}
        onImpactChange={setSelectedImpact}
        />
      </div>
      <div className={`${isLoaded ? 'animate-fade-in-up animate-delay-500' : 'animate-on-scroll'}`}>
        {renderView()}
      </div>
      
      {selectedCard && (
        <CardModal
          card={selectedCard}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
      
      <AddEntryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEntry}
      />
      
      <PasscodeModal
        isOpen={isAddPasscodeModalOpen}
        onClose={() => setIsAddPasscodeModalOpen(false)}
        onSuccess={handleAddPasscodeSuccess}
        title="Add New Entry"
        description="Enter the passcode to add a new entry to your research notebook."
        expectedPasscode="ADD"
      />
      
      <PasscodeModal
        isOpen={isDeletePasscodeModalOpen}
        onClose={() => {
          setIsDeletePasscodeModalOpen(false);
          setCardToDelete(null);
        }}
        onSuccess={handleDeletePasscodeSuccess}
        title="Delete Entry"
        description="Enter the passcode to permanently delete this entry."
        expectedPasscode="DELETE"
      />
    </div>
  );
}

export default App;