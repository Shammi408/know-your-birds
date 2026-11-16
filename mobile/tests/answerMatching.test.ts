import { describe, it, expect } from 'vitest';
import { isCorrectAnswer } from '../src/utils/answerMatching';
import { BIRDS } from '../src/data/birds';

describe('isCorrectAnswer', () => {
  const indianRoller = BIRDS.find(
    (bird) => bird.id === 'indian_roller'
  )!;

  const roseRingedParakeet = BIRDS.find(
    (bird) => bird.id === 'rose_ringed_parakeet'
  )!;

  it('accepts the exact common name', () => {
    expect(isCorrectAnswer('Indian Roller', indianRoller)).toBe(true);
  });

  it('ignores letter casing', () => {
    expect(isCorrectAnswer('indian roller', indianRoller)).toBe(true);
  });

  it('ignores leading and trailing spaces', () => {
    expect(isCorrectAnswer('  Indian Roller  ', indianRoller)).toBe(true);
  });

  it('accepts hyphen and space variations', () => {
    expect(
      isCorrectAnswer('Ring necked Parakeet', roseRingedParakeet)
    ).toBe(true);
  });

  it('accepts a listed alias', () => {
    expect(
      isCorrectAnswer('Ring-necked Parakeet', roseRingedParakeet)
    ).toBe(true);
  });

  it('rejects an unrelated bird name', () => {
    expect(isCorrectAnswer('House Sparrow', indianRoller)).toBe(false);
  });

  it('rejects an empty answer', () => {
    expect(isCorrectAnswer('', indianRoller)).toBe(false);
  });

  it('accepts underscores instead of spaces', () => {
    expect(isCorrectAnswer('Indian_Roller', indianRoller)).toBe(true);
  });

  it('handles multiple spaces between words', () => {
    expect(isCorrectAnswer('Indian    Roller', indianRoller)).toBe(true);
  });

  it('matches aliases regardless of letter casing', () => {
    expect(
      isCorrectAnswer('RING-NECKED PARAKEET', roseRingedParakeet)
    ).toBe(true);
  });

  it('rejects an alias belonging to another bird', () => {
    expect(
      isCorrectAnswer('Ring-necked Parakeet', indianRoller)
    ).toBe(false);
  });

});