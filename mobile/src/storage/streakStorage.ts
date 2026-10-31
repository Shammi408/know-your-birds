import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEY = 'dailyStreak';

type StreakData = {
  currentStreak: number;
  lastCompletedDate: string | null;
};

export async function getStreakData(): Promise<StreakData> {
  const stored = await AsyncStorage.getItem(STREAK_KEY);

  if (!stored) {
    return {
      currentStreak: 0,
      lastCompletedDate: null,
    };
  }

  return JSON.parse(stored);
}

export async function updateStreak(
  completedDate: string
): Promise<number> {
  const streakData = await getStreakData();

  // Completing the same day again should not increase the streak.
  if (streakData.lastCompletedDate === completedDate) {
    return streakData.currentStreak;
  }

  const currentDate = new Date(`${completedDate}T00:00:00`);

    const [year, month, day] = completedDate
        .split('-')
        .map(Number);

    const previousDate = new Date(year, month - 1, day);
    previousDate.setDate(previousDate.getDate() - 1);

    const previousYear = previousDate.getFullYear();
    const previousMonth = String(
        previousDate.getMonth() + 1
    ).padStart(2, '0');
    const previousDay = String(
        previousDate.getDate()
    ).padStart(2, '0');

    const previousDateString =
        `${previousYear}-${previousMonth}-${previousDay}`;

  let newStreak: number;

  if (streakData.lastCompletedDate === previousDateString) {
    newStreak = streakData.currentStreak + 1;
  } else {
    newStreak = 1;
  }

  const newStreakData: StreakData = {
    currentStreak: newStreak,
    lastCompletedDate: completedDate,
  };

  await AsyncStorage.setItem(
    STREAK_KEY,
    JSON.stringify(newStreakData)
  );

  return newStreak;
}

// export async function testStreak() {
//   console.log('Test 1:', await updateStreak('2026-10-28'));
//   console.log('Test 2:', await updateStreak('2026-10-29'));
//   console.log('Test 3:', await updateStreak('2026-10-30'));
//   console.log('Test 4:', await updateStreak('2026-10-30'));
//   console.log('Test 5:', await updateStreak('2026-11-01'));
// }