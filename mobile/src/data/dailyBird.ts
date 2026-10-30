import { BIRDS, Bird } from './birds';

function dateToNumber(date: string): number {
  return date
    .split('-')
    .reduce((total, part) => total + Number(part), 0);
}

function getCandidateBird(date: string): Bird {
  const dayNumber = dateToNumber(date);
  const index = dayNumber % BIRDS.length;

  return BIRDS[index];
}

function getPreviousDate(date: string): string {
  const currentDate = new Date(`${date}T00:00:00`);
  currentDate.setDate(currentDate.getDate() - 1);

  return currentDate.toISOString().split('T')[0];
}

export function getDailyBird(date: string): Bird {
  const todayBird = getCandidateBird(date);
  const yesterday = getPreviousDate(date);
  const yesterdayBird = getCandidateBird(yesterday);

  if (todayBird.id !== yesterdayBird.id) {
    return todayBird;
  }

  const nextIndex =
    (BIRDS.findIndex((bird) => bird.id === todayBird.id) + 1) %
    BIRDS.length;

  return BIRDS[nextIndex];
}
