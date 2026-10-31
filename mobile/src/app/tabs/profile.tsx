import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { getProfileData } from '../../storage/profileStorage';
import { getStreakData } from '../../storage/streakStorage';
import { getBirdBankEntries } from '../../data/birdBank';
import { ACHIEVEMENTS } from '../../data/achievements';

export default function ProfileScreen() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalBirds, setTotalBirds] = useState(0);
  const [encounteredBirds, setEncounteredBirds] = useState(0);
  const [identifiedBirds, setIdentifiedBirds] = useState(0);
  const [firstEncounterUnlocked, setFirstEncounterUnlocked] = useState(false);
  const [birdWatcherUnlocked, setBirdWatcherUnlocked] = useState(false);
  const firstAchievement = ACHIEVEMENTS[0];
  const birdWatcherAchievement = ACHIEVEMENTS[1];

  useEffect(() => {
    async function loadProfile() {
      const profile = await getProfileData();
      const streakData = await getStreakData();
      const birdEntries = await getBirdBankEntries();

      const encounteredCount = birdEntries.filter(
        (entry) => entry.status !== 'not_encountered'
      ).length;

      setFirstEncounterUnlocked(encounteredCount > 0);
      setBirdWatcherUnlocked(encounteredCount >= 5);

      const identifiedCount = birdEntries.filter(
        (entry) => entry.status === 'identified'
      ).length;

      setTotalBirds(birdEntries.length);
      setEncounteredBirds(encounteredCount);
      setIdentifiedBirds(identifiedCount);
      setXp(profile.xp);
      setStreak(streakData.currentStreak);
    }

    loadProfile();
  }, []);

  return (
    <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type="title">Profile</ThemedText>
          <ThemedText style={styles.statsTitle}>
            Progress Summary
          </ThemedText>

          <ThemedText style={styles.stats}>
            Total XP: {xp}
          </ThemedText>

          <ThemedText style={styles.stats}>
            Current Streak: 🔥 {streak} {streak === 1 ? 'day' : 'days'}
          </ThemedText>

          <ThemedText style={styles.stats}>
            Birds Encountered: {encounteredBirds} / {totalBirds}
          </ThemedText>

          <ThemedText style={styles.stats}>
            Birds Identified: {identifiedBirds} / {totalBirds}
          </ThemedText>

          <ThemedText style={styles.statsTitle}>
            Achievements
          </ThemedText>

          <ThemedText style={styles.achievementName}>
            🏆 {firstAchievement.name}
          </ThemedText>

          <ThemedText style={styles.stats}>
            {firstAchievement.description}
          </ThemedText>

          <ThemedText style={styles.achievementStatus}>
            {firstEncounterUnlocked ? 'Unlocked' : 'Locked'}
          </ThemedText>

          <ThemedText style={styles.achievementName}>
            🏆 {birdWatcherAchievement.name}
          </ThemedText>

          <ThemedText style={styles.stats}>
            {birdWatcherAchievement.description}
          </ThemedText>

          <ThemedText style={styles.achievementStatus}>
            {birdWatcherUnlocked ? 'Unlocked' : 'Locked'}
          </ThemedText>
        </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  xp: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
  },
  streak: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  statsTitle: {
    marginTop: 28,
    fontSize: 20,
    fontWeight: '700',
  },

  stats: {
    marginTop: 6,
    fontSize: 16,
  },
  achievementName: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: '600',
  },

  achievementStatus: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 40,
  },
});