export type Achievement = {
  id: string;
  name: string;
  description: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-encounter',
    name: 'First Encounter',
    description: 'Encounter your first bird.',
  },
  {
    id: 'bird-watcher',
    name: 'Bird Watcher',
    description: 'Encounter 5 different birds.',
  },
];