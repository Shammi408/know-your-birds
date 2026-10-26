import { BIRDS, Bird } from './birds';
import {
  getBirdStatus,
  BirdStatus,
} from '../storage/birdBankStorage';

export type BirdBankEntry = {
  bird: Bird;
  status: BirdStatus;
};

export async function getBirdBankEntries(): Promise<BirdBankEntry[]> {
  const entries = await Promise.all(
    BIRDS.map(async (bird) => {
      const status = await getBirdStatus(bird.id);

      return {
        bird,
        status,
      };
    })
  );

  return entries;
}

