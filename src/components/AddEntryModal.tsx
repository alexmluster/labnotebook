import React, { useState } from 'react';
import { X, Plus, Calendar, Tag, TrendingUp, FileText, User, Type } from 'lucide-react';
import { Card } from '../types';

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (card: Omit<Card, 'id' | 'dateAdded'>) => void;
}

export function AddEntryModal({ isOpen, onClose, onSave }: AddEntryModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Concept' as Card['type'],
    status: 'To Explore' as Card['status'],
    tags: [] as string[],
    source: '',
    impactLevel: 'Medium' as Card['impactLevel'],
    notes: '',
    column: 'foundations'
  });

  const [currentTag, setCurrentTag] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.notes.trim()) return;
    
    onSave(formData);
    
    // Reset form
    setFormData({
      title: '',
      type: 'Concept',
      status: 'To Explore',
      tags: [],
      source: '',
      impactLevel: 'Medium',
      notes: '',
      column: 'foundations'
    });
    setCurrentTag('');
    onClose();
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const typeColors = {
    'Concept': 'text-indigo-600 bg-indigo-50',
    'Experiment': 'text-green-600 bg-green-50',
    'Metric': 'text-blue-600 bg-blue-50',
    'Case Study': 'text-purple-600 bg-purple-50',
    'Idea': 'text-yellow-600 bg-yellow-50',
    'Note': 'text-gray-600 bg-gray-50',
    'Reflection': 'text-pink-600 bg-pink-50',
    'Skill': 'text-orange-600 bg-orange-50'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose} />

        <div className="inline-block w-full max-w-3xl p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="px-8 pt-8 pb-6 bg-gray-50">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-white rounded-full shadow-sm">
                    <Plus className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-light text-black">Add New Entry</h2>
                    <p className="text-sm text-gray-600 mt-1">Capture your latest insight, experiment, or learning</p>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText className="h-4 w-4" />
                    <span>Title</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Enter a descriptive title for your entry..."
                    required
                  />
                </div>

                {/* Type and Column */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Type className="h-4 w-4" />
                      <span>Type</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Card['type'] }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    >
                      <option value="Concept">Concept</option>
                      <option value="Experiment">Experiment</option>
                      <option value="Metric">Metric</option>
                      <option value="Case Study">Case Study</option>
                      <option value="Idea">Idea</option>
                      <option value="Note">Note</option>
                      <option value="Reflection">Reflection</option>
                      <option value="Skill">Skill</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <span>Category</span>
                    </label>
                    <select
                      value={formData.column}
                      onChange={(e) => setFormData(prev => ({ ...prev, column: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    >
                      <option value="foundations">Foundations</option>
                      <option value="ecosystem">Ecosystem Mapping</option>
                      <option value="experiments">Experiments</option>
                      <option value="metrics">Metrics & Analytics</option>
                      <option value="cases">Case Studies</option>
                      <option value="ideas">Ideas & Sandbox</option>
                      <option value="reflections">Reflections & Frameworks</option>
                      <option value="growth">Professional Growth</option>
                    </select>
                  </div>
                </div>

                {/* Status and Impact */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <span>Status</span>
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Card['status'] }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    >
                      <option value="To Explore">To Explore</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Complete">Complete</option>
                      <option value="Abandoned">Abandoned</option>
                      <option value="Needs Iteration">Needs Iteration</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Impact Level</span>
                    </label>
                    <select
                      value={formData.impactLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, impactLevel: e.target.value as Card['impactLevel'] }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                {/* Source */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4" />
                    <span>Source</span>
                  </label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Book, Article, Podcast, Conference, Personal Idea..."
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Tag className="h-4 w-4" />
                    <span>Tags</span>
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Add a tag and press Enter..."
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText className="h-4 w-4" />
                    <span>Notes & Learnings</span>
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                    placeholder="Capture your insights, key takeaways, or detailed observations..."
                    required
                  />
                </div>

                {/* Preview */}
                {formData.title && (
                  <div className="border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className={`text-xs font-medium uppercase tracking-wide px-2 py-1 rounded ${typeColors[formData.type]}`}>
                          {formData.type}
                        </span>
                        <span className="text-xs text-gray-500">{formData.impactLevel} Impact</span>
                      </div>
                      <h4 className="font-medium text-black mb-2">{formData.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{formData.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-8 py-6 bg-gray-50 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formData.title.trim() || !formData.notes.trim()}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Entry
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}