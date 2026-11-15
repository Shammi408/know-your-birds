
export type Achievement = {
  id: string;
  name: string;
  description: string;
  category: 'encountered' | 'identified';
  target: number | 'all';
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-encounter',
    name: 'First Encounter',
    description: 'Encounter your first bird.',
    category: 'encountered',
    target: 1,
  },
  {
    id: 'bird-watcher',
    name: 'Bird Watcher',
    description: 'Encounter 5 different birds.',
    category: 'encountered',
    target: 5,
  },
  {
    id: 'bird-enthusiast',
    name: 'Bird Enthusiast',
    description: 'Encounter 10 different birds.',
    category: 'encountered',
    target: 10,
  },
  {
    id: 'bird-explorer',
    name: 'Bird Explorer',
    description: 'Identify 5 different birds.',
    category: 'identified',
    target: 5,
  },
  {
    id: 'bird-guide',
    name: 'Bird Guide',
    description: 'Identify 10 different birds.',
    category: 'identified',
    target: 10,
  },
  {
    id: 'bird-book',
    name: 'Bird Book',
    description: 'Identify every bird in the complete catalogue.',
    category: 'identified',
    target: 'all',
  },
];
