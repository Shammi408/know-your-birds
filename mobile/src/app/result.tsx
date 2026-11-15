
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

import { getBirdById } from '../data/birds';
import { getStreakData } from '../storage/streakStorage';

export default function ResultScreen() {
  const router = useRouter();
  const theme = useTheme();

  const { score, identified, birdId } = useLocalSearchParams<{
    score?: string;
    identified?: string;
    birdId?: string;
  }>();

  const dailyScore = Number(score ?? 0);
  const isIdentified = identified === 'true';
  const bird = birdId ? getBirdById(birdId) : undefined;

  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    async function loadStreak() {
      const streakData = await getStreakData();
      setCurrentStreak(streakData.currentStreak);
    }

    loadStreak();
  }, []);

  const handleLearnMore = () => {
    if (!birdId || !bird) return;

    router.push({
      pathname: '/bird-details',
      params: {
        birdId,
        source: 'bird-bank',
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Daily Challenge
            </ThemedText>

            <View style={styles.resultStatusContainer}>
              <ThemedText style={styles.resultEmoji}>
                {isIdentified ? '🎉' : '🐦'}
              </ThemedText>

              <ThemedText style={styles.resultStatus}>
                {isIdentified ? 'Bird Identified!' : 'Bird Encountered!'}
              </ThemedText>
            </View>

            <ThemedText
              themeColor="textSecondary"
              style={styles.subtitle}
            >
              {isIdentified
                ? 'Great work! You identified today’s bird.'
                : 'Every encounter is a step towards learning.'}
            </ThemedText>
          </ThemedView>

          {/* Result Card */}
          <ThemedView
            type="backgroundElement"
            style={[
              styles.card,
              { borderColor: theme.backgroundSelected },
            ]}
          >
            {/* Bird Image */}
            {bird?.image ? (
              <Image
                source={{ uri: bird.image }}
                style={styles.birdImage}
                resizeMode="cover"
              />
            ) : (
              <View
                style={[
                  styles.imagePlaceholder,
                  { backgroundColor: theme.backgroundSelected },
                ]}
              >
                <ThemedText themeColor="textSecondary">
                  Bird image unavailable
                </ThemedText>
              </View>
            )}

            {/* Bird Information */}
            <ThemedText type="subtitle" style={styles.birdName}>
              {bird?.commonName ?? 'Bird'}
            </ThemedText>

            {bird?.scientificName && (
              <ThemedText
                themeColor="textSecondary"
                style={styles.scientificName}
              >
                {bird.scientificName}
              </ThemedText>
            )}

            {/* Score Summary */}
            <View style={styles.statsContainer}>
              <ThemedView
                type="backgroundSelected"
                style={styles.statBox}
              >
                <ThemedText
                  themeColor="textSecondary"
                  style={styles.statLabel}
                >
                  Daily Score
                </ThemedText>

                <ThemedText style={styles.statValue}>
                  {dailyScore}
                </ThemedText>
              </ThemedView>

              <ThemedView
                type="backgroundSelected"
                style={styles.statBox}
              >
                <ThemedText
                  themeColor="textSecondary"
                  style={styles.statLabel}
                >
                  XP Earned
                </ThemedText>

                <ThemedText style={styles.statValue}>
                  +{dailyScore}
                </ThemedText>
              </ThemedView>

              <ThemedView
                type="backgroundSelected"
                style={styles.statBox}
              >
                <ThemedText
                  themeColor="textSecondary"
                  style={styles.statLabel}
                >
                  Current Streak
                </ThemedText>

                <ThemedText style={styles.statValue}>
                  🔥 {currentStreak}{' '}
                  {currentStreak === 1 ? 'day' : 'days'}
                </ThemedText>
              </ThemedView>
            </View>

            {/* Bird Bank Status */}
            <ThemedView
              type="backgroundSelected"
              style={styles.statusBox}
            >
              <ThemedText style={styles.statusTitle}>
                Your Bird Bank
              </ThemedText>

              <ThemedText
                themeColor="textSecondary"
                style={styles.statusDescription}
              >
                {isIdentified
                  ? 'This bird has been added to your collection as Identified.'
                  : 'This bird has been added to your collection as Encountered.'}
              </ThemedText>
            </ThemedView>

            {/* Actions */}
            <Pressable
              style={[
                styles.secondaryButton,
                { borderColor: theme.backgroundSelected },
              ]}
              onPress={handleLearnMore}
              disabled={!bird}
            >
              <ThemedText style={styles.buttonText}>
                LEARN MORE
              </ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.primaryButton,
                { backgroundColor: theme.backgroundSelected },
              ]}
              onPress={() => router.replace('/tabs')}
            >
              <ThemedText style={styles.buttonText}>
                RETURN HOME
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },

  scrollContent: {
    paddingBottom: 100,
  },

  header: {
    alignItems: 'center',
    marginTop: Spacing.two,
    marginBottom: Spacing.two,
  },

  title: {
    textAlign: 'center',
  },

  subtitle: {
    marginTop: Spacing.one,
    textAlign: 'center',
  },

  card: {
    width: '100%',
    marginTop: Spacing.three,
    padding: Spacing.four,
    borderRadius: Spacing.four,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 2,
  },

  birdImage: {
    width: '100%',
    height: 220,
    borderRadius: Spacing.three,
  },

  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },

  birdName: {
    marginTop: Spacing.three,
    textAlign: 'center',
  },

  scientificName: {
    marginTop: Spacing.one,
    fontStyle: 'italic',
    textAlign: 'center',
  },

  statsContainer: {
    width: '100%',
    marginTop: Spacing.four,
    gap: Spacing.two,
  },

  statBox: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
  },

  statLabel: {
    fontSize: 14,
  },

  statValue: {
    marginTop: Spacing.one,
    fontSize: 22,
    fontWeight: '700',
  },

  statusBox: {
    width: '100%',
    marginTop: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },

  statusTitle: {
    fontSize: 17,
    fontWeight: '700',
  },

  statusDescription: {
    marginTop: Spacing.one,
    fontSize: 14,
    lineHeight: 21,
  },

  secondaryButton: {
    width: '100%',
    height: 48,
    marginTop: Spacing.three,
    borderWidth: 1,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButton: {
    width: '100%',
    height: 48,
    marginTop: Spacing.two,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontWeight: '700',
  },

  resultStatusContainer: {
    alignItems: 'center',
    marginTop: Spacing.two,
    paddingVertical: 6,
  },

  resultEmoji: {
    fontSize: 36,
    lineHeight: 50,
    includeFontPadding: true,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  resultStatus: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: Spacing.one,
  },
});
