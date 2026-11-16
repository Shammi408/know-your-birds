
import type { Bird } from '@/data/birds';

function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ');
}

export function isCorrectAnswer(
  userAnswer: string,
  bird: Bird
): boolean {
  const normalizedUserAnswer = normalizeAnswer(userAnswer);

  const acceptedAnswers = [
    bird.commonName,
    ...bird.aliases,
  ];

  return acceptedAnswers.some(
    (answer) => normalizeAnswer(answer) === normalizedUserAnswer
  );
}
