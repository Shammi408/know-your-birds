
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

import { getProfileData } from '../../storage/profileStorage';
import { getStreakData } from '../../storage/streakStorage';
import { getBirdBankEntries } from '../../data/birdBank';
import { ACHIEVEMENTS } from '../../data/achievements';
import {
  getUnlockedAchievementIds,
  saveUnlockedAchievementIds,
} from '../../storage/achievementStorage';

const ACHIEVEMENT_ICONS: Record<string, string> = {
  'first-encounter': '🐣',
  'bird-watcher': '🔭',
  'bird-enthusiast': '🌿',
  'bird-explorer': '🦜',
  'bird-guide': '🧭',
  'bird-book': '📖',
};

export default function ProfileScreen() {
  const theme = useTheme();

  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalBirds, setTotalBirds] = useState(0);
  const [encounteredBirds, setEncounteredBirds] = useState(0);
  const [identifiedBirds, setIdentifiedBirds] = useState(0);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadProfile() {
      const [
        profile,
        streakData,
        birdEntries,
        previouslyUnlocked,
      ] = await Promise.all([
        getProfileData(),
        getStreakData(),
        getBirdBankEntries(),
        getUnlockedAchievementIds(),
      ]);

      const encounteredCount = birdEntries.filter(
        (entry) => entry.status !== 'not_encountered'
      ).length;

      const identifiedCount = birdEntries.filter(
        (entry) => entry.status === 'identified'
      ).length;

      const newlyUnlocked = ACHIEVEMENTS
        .filter((achievement) => {
          const progress =
            achievement.category === 'encountered'
              ? encounteredCount
              : identifiedCount;

          const target =
            achievement.target === 'all'
              ? birdEntries.length
              : achievement.target;

          return progress >= target;
        })
        .map((achievement) => achievement.id);

      const allUnlocked = [
        ...new Set([...previouslyUnlocked, ...newlyUnlocked]),
      ];

      await saveUnlockedAchievementIds(allUnlocked);

      setUnlockedIds(allUnlocked);
      setTotalBirds(birdEntries.length);
      setEncounteredBirds(encounteredCount);
      setIdentifiedBirds(identifiedCount);
      setXp(profile.xp);
      setStreak(streakData.currentStreak);
    }

    loadProfile();
  }, []);

  const statCards = [
    { label: 'Total XP', value: xp.toString(), icon: '⭐' },
    {
      label: 'Current Streak',
      value: `${streak} ${streak === 1 ? 'day' : 'days'}`,
      icon: '🔥',
    },
    {
      label: 'Birds Encountered',
      value: `${encounteredBirds} / ${totalBirds}`,
      icon: '🐦',
    },
    {
      label: 'Birds Identified',
      value: `${identifiedBirds} / ${totalBirds}`,
      icon: '🔍',
    },
  ];

  const renderAchievement = (achievement: (typeof ACHIEVEMENTS)[number]) => {
    const progress =
      achievement.category === 'encountered'
        ? encounteredBirds
        : identifiedBirds;

    const target =
      achievement.target === 'all'
        ? totalBirds
        : achievement.target;

    const isUnlocked = unlockedIds.includes(achievement.id);
    const progressValue = Math.min(progress, target);
    const progressPercentage =
      target > 0 ? (progressValue / target) * 100 : 0;

    return (
      <ThemedView
        key={achievement.id}
        type="backgroundElement"
        style={[
          styles.achievementCard,
          { borderColor: theme.backgroundSelected },
        ]}
      >
        <View style={styles.achievementTopRow}>
          <ThemedText style={styles.achievementIcon}>
            {ACHIEVEMENT_ICONS[achievement.id] ?? '🏆'}
          </ThemedText>

          <View style={styles.achievementInfo}>
            <ThemedText style={styles.achievementName}>
              {achievement.name}
            </ThemedText>

            <ThemedText
              themeColor="textSecondary"
              style={styles.achievementDescription}
            >
              {achievement.description}
            </ThemedText>
          </View>

          <ThemedView
            type="backgroundSelected"
            style={styles.statusBadge}
          >
            <ThemedText
              style={[
                styles.statusText,
                isUnlocked && styles.unlockedText,
              ]}
            >
              {isUnlocked ? 'Unlocked' : 'Locked'}
            </ThemedText>
          </ThemedView>
        </View>

        <View style={styles.progressRow}>
          <ThemedText
            themeColor="textSecondary"
            style={styles.progressLabel}
          >
            Progress
          </ThemedText>

          <ThemedText style={styles.progressCount}>
            {isUnlocked ? target : progressValue} / {target}
          </ThemedText>
        </View>

        <View
          style={[
            styles.progressTrack,
            { backgroundColor: theme.backgroundSelected },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${isUnlocked ? 100 : progressPercentage}%`,
              },
            ]}
          />
        </View>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title">
            Profile
          </ThemedText>

          <ThemedText
            themeColor="textSecondary"
            style={styles.subtitle}
          >
            Your bird-watching journey.
          </ThemedText>
        </ThemedView>

        {/* Progress Summary */}
        <ThemedText style={styles.sectionTitle}>
          Progress Summary
        </ThemedText>

        <View style={styles.statsGrid}>
          {statCards.map((stat) => (
            <ThemedView
              key={stat.label}
              type="backgroundElement"
              style={[
                styles.statCard,
                { borderColor: theme.backgroundSelected },
              ]}
            >
              <ThemedText style={styles.statIcon}>
                {stat.icon}
              </ThemedText>

              <ThemedText
                themeColor="textSecondary"
                style={styles.statLabel}
              >
                {stat.label}
              </ThemedText>

              <ThemedText style={styles.statValue}>
                {stat.value}
              </ThemedText>
            </ThemedView>
          ))}
        </View>

        {/* Discovery Achievements */}
        <ThemedText style={styles.sectionTitle}>
          Discovery Achievements
        </ThemedText>

        <ThemedText
          themeColor="textSecondary"
          style={styles.groupDescription}
        >
          Discover new birds and grow your collection.
        </ThemedText>

        {ACHIEVEMENTS
          .filter((achievement) => achievement.category === 'encountered')
          .map(renderAchievement)}

        {/* Identification Achievements */}
        <ThemedText style={styles.sectionTitle}>
          Identification Achievements
        </ThemedText>

        <ThemedText
          themeColor="textSecondary"
          style={styles.groupDescription}
        >
          Identify the birds you encounter.
        </ThemedText>

        {ACHIEVEMENTS
          .filter((achievement) => achievement.category === 'identified')
          .map(renderAchievement)}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: 100,
  },

  header: {
    alignItems: 'center',
    marginBottom: Spacing.four,
  },

  subtitle: {
    marginTop: Spacing.two,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: Spacing.two,
    marginTop: Spacing.four,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },

  statCard: {
    width: '48%',
    minHeight: 125,
    padding: Spacing.three,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    elevation: 2,
  },

  statIcon: {
    fontSize: 22,
    marginBottom: Spacing.one,
  },

  statLabel: {
    fontSize: 13,
  },

  statValue: {
    fontSize: 21,
    fontWeight: '700',
    marginTop: Spacing.one,
  },

  groupDescription: {
    fontSize: 14,
    marginBottom: Spacing.three,
  },

  achievementCard: {
    padding: Spacing.three,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: Spacing.three,
    elevation: 2,
  },

  achievementTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  achievementIcon: {
    fontSize: 30,
    marginRight: Spacing.three,
  },

  achievementInfo: {
    flex: 1,
  },

  achievementName: {
    fontSize: 17,
    fontWeight: '700',
  },

  achievementDescription: {
    fontSize: 13,
    marginTop: Spacing.one,
  },

  statusBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 8,
    marginLeft: Spacing.two,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },

  unlockedText: {
    color: '#269B68',
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.three,
    marginBottom: Spacing.two,
  },

  progressLabel: {
    fontSize: 12,
  },

  progressCount: {
    fontSize: 12,
    fontWeight: '600',
  },

  progressTrack: {
    height: 7,
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#269B68',
    borderRadius: 10,
  },
});
