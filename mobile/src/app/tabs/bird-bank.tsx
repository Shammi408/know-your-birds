
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

import {
  BirdBankEntry,
  getBirdBankEntries,
} from '../../data/birdBank';

export default function BirdBankScreen() {
  const router = useRouter();
  const theme = useTheme();

  const [entries, setEntries] = useState<BirdBankEntry[]>([]);

  useEffect(() => {
    async function loadBirdBank() {
      const birdBankEntries = await getBirdBankEntries();

      const sortedEntries = [...birdBankEntries].sort((a, b) => {
        const aDiscovered = a.status !== 'not_encountered';
        const bDiscovered = b.status !== 'not_encountered';

        if (aDiscovered !== bDiscovered) {
          return aDiscovered ? -1 : 1;
        }

        if (!aDiscovered && !bDiscovered) {
          return 0;
        }

        return a.bird.commonName.localeCompare(b.bird.commonName);
      });

      setEntries(sortedEntries);
    }

    loadBirdBank();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title">
            Bird Bank
          </ThemedText>

          <ThemedText
            themeColor="textSecondary"
            style={styles.subtitle}
          >
            Your collection of discovered birds.
          </ThemedText>
        </ThemedView>

        {/* Bird entries */}
        {entries.map((entry) => {
          const isUnknown = entry.status === 'not_encountered';

          return (
            <Pressable
              key={entry.bird.id}
              onPress={() =>
                router.push({
                  pathname: '/bird-details',
                  params: {
                    birdId: entry.bird.id,
                    source: 'bird-bank',
                  },
                })
              }
            >
              <ThemedView
                type="backgroundElement"
                style={[
                  styles.card,
                  {
                    borderColor: theme.backgroundSelected,
                  },
                ]}
              >
                {/* Card content */}
                <View style={styles.cardContent}>
                  <ThemedText style={styles.birdName}>
                    {isUnknown
                      ? 'Unknown Bird'
                      : entry.bird.commonName}
                  </ThemedText>

                  {!isUnknown && (
                    <ThemedText
                      themeColor="textSecondary"
                      style={styles.scientificName}
                    >
                      {entry.bird.scientificName}
                    </ThemedText>
                  )}

                  {/* Status badge */}
                  <ThemedView
                    type="backgroundSelected"
                    style={styles.statusBadge}
                  >
                    <ThemedText style={styles.statusText}>
                      {isUnknown
                        ? 'Not Encountered'
                        : entry.status === 'identified'
                          ? 'Identified'
                          : 'Encountered'}
                    </ThemedText>
                  </ThemedView>
                </View>
              </ThemedView>
            </Pressable>
          );
        })}
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

  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
  },

  cardContent: {
    alignItems: 'flex-start',
  },

  birdName: {
    fontSize: 18,
    fontWeight: '700',
  },

  scientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: Spacing.one,
  },

  statusBadge: {
    marginTop: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
