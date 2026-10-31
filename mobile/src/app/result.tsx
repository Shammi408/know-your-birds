import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

import { useState, useEffect } from 'react';
import { getBirdById } from '../data/birds';
import { getStreakData } from '../storage/streakStorage';

export default function ResultScreen() {
  const router = useRouter();

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

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Daily Challenge
            </ThemedText>

            <ThemedText style={styles.resultStatus}>
              {isIdentified ? 'Bird Identified!' : 'Bird Encountered!'}
            </ThemedText>
          </View>

          <ThemedView
            type="backgroundElement"
            style={styles.card}
          >
            <Image
              source={{ uri: bird?.image }}
              style={styles.birdImage}
              resizeMode="cover"
            />

            <ThemedText type="subtitle" style={styles.birdName}>
              {bird?.commonName}
            </ThemedText>

            <ThemedText style={styles.scientificName}>
              {bird?.scientificName}
            </ThemedText>

            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <ThemedText style={styles.statLabel}>
                  Daily Score
                </ThemedText>

                <ThemedText style={styles.statValue}>
                  {dailyScore}
                </ThemedText>
              </View>

              <View style={styles.statBox}>
                <ThemedText style={styles.statLabel}>
                  XP Earned
                </ThemedText>

                <ThemedText style={styles.statValue}>
                  +{dailyScore}
                </ThemedText>
              </View>

              <View style={styles.statBox}>
                <ThemedText style={styles.statLabel}>
                  Streak
                </ThemedText>

                <ThemedText style={styles.statValue}>
                  {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
                </ThemedText>
              </View>
            </View>

            <View style={styles.statusBox}>
              <ThemedText style={styles.statusTitle}>
                Bird Bank
              </ThemedText>

              <ThemedText>
                {isIdentified
                  ? 'Added to your collection as Identified.'
                  : 'Added to your collection as Encountered.'}
              </ThemedText>
            </View>

            <Pressable
              style={styles.secondaryButton}
              onPress={() => {
                // Learn more will be connected later.
              }}
            >
              <ThemedText style={styles.secondaryButtonText}>
                LEARN MORE
              </ThemedText>
            </Pressable>

            <Pressable
              style={styles.primaryButton}
              onPress={() => router.replace('/tabs')}
            >
              <ThemedText style={styles.primaryButtonText}>
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
    paddingBottom: Spacing.six,
  },

  header: {
    alignItems: 'center',
    marginTop: Spacing.two,
  },

  title: {
    textAlign: 'center',
  },

  resultStatus: {
    marginTop: Spacing.two,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  card: {
    width: '100%',
    marginTop: Spacing.four,
    padding: Spacing.four,
    borderRadius: Spacing.four,
    alignItems: 'center',
  },

  birdImage: {
    width: '100%',
    height: 220,
    borderRadius: Spacing.four,
  },

  birdName: {
    marginTop: Spacing.three,
    textAlign: 'center',
  },

  scientificName: {
    marginTop: Spacing.one,
    fontStyle: 'italic',
    opacity: 0.7,
    textAlign: 'center',
  },

  statsContainer: {
    width: '100%',
    marginTop: Spacing.four,
    gap: Spacing.two,
  },

  statBox: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },

  statLabel: {
    fontSize: 14,
    opacity: 0.7,
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
    borderRadius: Spacing.two,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  statusText: {
    marginTop: Spacing.one,
    fontSize: 14,
    lineHeight: 20,
  },

  secondaryButton: {
    width: '100%',
    height: 46,
    marginTop: Spacing.three,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    fontWeight: '700',
  },

  primaryButton: {
    width: '100%',
    height: 46,
    marginTop: Spacing.two,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  primaryButtonText: {
    color: '#000000',
    fontWeight: '700',
  },
});