import AsyncStorage from '@react-native-async-storage/async-storage';

const DAILY_CHALLENGE_COMPLETED_KEY = 'dailyChallengeCompletedDate';

export async function markDailyChallengeCompleted(
  date: string
): Promise<void> {
  await AsyncStorage.setItem(DAILY_CHALLENGE_COMPLETED_KEY, date);
}

export async function getDailyChallengeCompletedDate(): Promise<string | null> {
  return AsyncStorage.getItem(DAILY_CHALLENGE_COMPLETED_KEY);
}