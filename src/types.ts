export interface Card {
  id: string;
  title: string;
  type: 'Concept' | 'Experiment' | 'Metric' | 'Case Study' | 'Idea' | 'Note' | 'Reflection' | 'Skill';
  status: 'To Explore' | 'In Progress' | 'Complete' | 'Abandoned' | 'Needs Iteration';
  tags: string[];
  source: string;
  dateAdded: string;
  impactLevel: 'High' | 'Medium' | 'Low';
  notes: string;
  column: string;
}

export interface Column {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

export type ViewMode = 'board' | 'table' | 'gallery';