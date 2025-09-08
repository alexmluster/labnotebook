import { Card, Column } from '../types';

export const columns: Column[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    emoji: 'BookOpen',
    description: 'Key theories, frameworks, and baseline knowledge'
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem Mapping',
    emoji: 'Globe',
    description: 'Stakeholder maps, trend notes, comparative industries'
  },
  {
    id: 'experiments',
    title: 'Experiments',
    emoji: 'FlaskConical',
    description: 'Live or past pilots you\'re tracking'
  },
  {
    id: 'metrics',
    title: 'Metrics & Analytics',
    emoji: 'BarChart3',
    description: 'KPIs, dashboards, data observations'
  },
  {
    id: 'cases',
    title: 'Case Studies',
    emoji: 'FileText',
    description: 'Media + cross-industry lessons'
  },
  {
    id: 'ideas',
    title: 'Ideas & Sandbox',
    emoji: 'Lightbulb',
    description: 'Creative brainstorms, sketches, "wild" retention experiments'
  },
  {
    id: 'reflections',
    title: 'Reflections & Frameworks',
    emoji: 'Eye',
    description: 'Personal insights, what worked, your playbook in progress'
  },
  {
    id: 'growth',
    title: 'Professional Growth',
    emoji: 'TrendingUp',
    description: 'Skills, mentors, workshops, MBA learnings, industry notes'
  }
];

export const sampleCards: Card[] = [
  {
    id: '1',
    title: 'Hooked Model (Nir Eyal)',
    type: 'Concept',
    status: 'Complete',
    tags: ['Behavioral Science', 'Retention'],
    source: 'Book',
    dateAdded: '2024-01-15',
    impactLevel: 'High',
    notes: 'Framework for habit formation (Trigger → Action → Variable Reward → Investment). Could map directly to onboarding journeys.',
    column: 'foundations'
  },
  {
    id: '2',
    title: 'Renewal Reminder Pilot',
    type: 'Experiment',
    status: 'In Progress',
    tags: ['Renewal', 'Churn Prevention'],
    source: 'Internal Pilot',
    dateAdded: '2024-01-10',
    impactLevel: 'Medium',
    notes: 'Test hypothesis that SMS reminders within 3 days of renewal deadline reduce churn.',
    column: 'experiments'
  },
  {
    id: '3',
    title: 'Print Loyalty Club ("Ink Society")',
    type: 'Idea',
    status: 'To Explore',
    tags: ['Community', 'Loyalty', 'Print'],
    source: 'Personal Idea',
    dateAdded: '2024-01-12',
    impactLevel: 'High',
    notes: 'Points for tenure, crosswords solved, community events. Inspired by Sephora\'s loyalty model.',
    column: 'ideas'
  },
  {
    id: '4',
    title: 'NPA Slack Takeaway – Personalization',
    type: 'Note',
    status: 'Complete',
    tags: ['Industry Learning'],
    source: 'News Product Alliance Slack',
    dateAdded: '2024-01-08',
    impactLevel: 'Medium',
    notes: 'Key insight — retention efforts must balance personalization with newsroom capacity.',
    column: 'growth'
  },
  {
    id: '5',
    title: 'Subscriber Churn Analysis Q4 2023',
    type: 'Metric',
    status: 'Complete',
    tags: ['Churn', 'Analytics', 'Digital'],
    source: 'Internal Data',
    dateAdded: '2024-01-05',
    impactLevel: 'High',
    notes: 'Monthly churn rate increased 0.3% in Q4. Primary factors: price sensitivity and content engagement decline.',
    column: 'metrics'
  },
  {
    id: '6',
    title: 'NYT Cooking Subscription Model',
    type: 'Case Study',
    status: 'Complete',
    tags: ['Subscription', 'Content Strategy', 'Cross-Industry'],
    source: 'Article',
    dateAdded: '2024-01-20',
    impactLevel: 'High',
    notes: 'Standalone product with dedicated community features. 90% retention rate through recipe personalization.',
    column: 'cases'
  }
];