
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACHIEVEMENTS_STORAGE_KEY = 'unlocked_achievements';

export async function getUnlockedAchievementIds(): Promise<string[]> {
  try {
    const stored = await AsyncStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : [];
  } catch (error) {
    console.error('Failed to load achievements:', error);
    return [];
  }
}

export async function saveUnlockedAchievementIds(
  achievementIds: string[]
): Promise<void> {
  try {
    const uniqueIds = [...new Set(achievementIds)];

    await AsyncStorage.setItem(
      ACHIEVEMENTS_STORAGE_KEY,
      JSON.stringify(uniqueIds)
    );
  } catch (error) {
    console.error('Failed to save achievements:', error);
  }
}
