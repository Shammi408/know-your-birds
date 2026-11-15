
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

import { BIRDS } from '../../data/birds';

export default function ExploreScreen() {
  const router = useRouter();
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');
  const [countryFilter, setCountryFilter] = useState('All');

  const countries = [
    'All',
    ...Array.from(
      new Set(BIRDS.flatMap((bird) => bird.range))
    ).sort(),
  ];

  const hasActiveFilters =
    searchQuery !== '' ||
    countryFilter !== 'All' ||
    sortOrder !== 'default';

  const displayedBirds = [...BIRDS]
    .filter((bird) => {
      const query = searchQuery.trim().toLowerCase();

      if (
        countryFilter !== 'All' &&
        !bird.range.includes(countryFilter)
      ) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        bird.commonName.toLowerCase().includes(query) ||
        bird.scientificName.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.commonName.localeCompare(b.commonName);
      }

      if (sortOrder === 'desc') {
        return b.commonName.localeCompare(a.commonName);
      }

      return 0;
    });

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <ThemedView style={styles.header}>
            <ThemedText type="title">
              Explore
            </ThemedText>

            <ThemedText style={styles.subtitle}>
              Learn about birds from around the world.
            </ThemedText>
          </ThemedView>

          {/* Search */}
          <TextInput
            style={[
              styles.searchInput,
              {
                color: theme.text,
                backgroundColor: theme.backgroundElement,
                borderColor: theme.backgroundSelected,
              },
            ]}
            placeholder="Search birds..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />

          {/* Sorting */}
          <ThemedView style={styles.sortRow}>
            <Pressable
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    sortOrder === 'asc'
                      ? theme.backgroundSelected
                      : theme.backgroundElement,
                },
              ]}
              onPress={() => setSortOrder('asc')}
            >
              <ThemedText style={styles.buttonText}>
                A → Z
              </ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    sortOrder === 'desc'
                      ? theme.backgroundSelected
                      : theme.backgroundElement,
                },
              ]}
              onPress={() => setSortOrder('desc')}
            >
              <ThemedText style={styles.buttonText}>
                Z → A
              </ThemedText>
            </Pressable>
          </ThemedView>

          {/* Country filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.countryRow}
          >
            {countries.map((country) => (
              <Pressable
                key={country}
                style={[
                  styles.countryButton,
                  {
                    backgroundColor:
                      countryFilter === country
                        ? theme.backgroundSelected
                        : theme.backgroundElement,
                  },
                ]}
                onPress={() => setCountryFilter(country)}
              >
                <ThemedText style={styles.buttonText}>
                  {country}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>

          {/* Reset filters */}
          {hasActiveFilters && (
            <Pressable
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery('');
                setCountryFilter('All');
                setSortOrder('default');
              }}
            >
              <ThemedText themeColor="textSecondary">
                Reset filters
              </ThemedText>
            </Pressable>
          )}

          {/* Bird count */}
          <ThemedText
            themeColor="textSecondary"
            style={styles.resultCount}
          >
            {displayedBirds.length} birds found
          </ThemedText>

          {/* Bird list */}
          {displayedBirds.length > 0 ? (
            displayedBirds.map((bird) => (
              <Pressable
                key={bird.id}
                onPress={() =>
                  router.push({
                    pathname: '/bird-details',
                    params: {
                      birdId: bird.id,
                      source: 'explore',
                    },
                  })
                }
              >
                <ThemedView
                  type="backgroundElement"
                  style={styles.birdCard}
                >
                  <ThemedText style={styles.birdName}>
                    {bird.commonName}
                  </ThemedText>

                  <ThemedText
                    themeColor="textSecondary"
                    style={styles.scientificName}
                  >
                    {bird.scientificName}
                  </ThemedText>
                </ThemedView>
              </Pressable>
            ))
          ) : (
            <ThemedView
              type="backgroundElement"
              style={styles.emptyCard}
            >
              <ThemedText type="subtitle">
                No birds found
              </ThemedText>

              <ThemedText themeColor="textSecondary">
                Try changing your search or filters.
              </ThemedText>
            </ThemedView>
          )}
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

  searchInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },

  sortRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: '600',
  },

  countryRow: {
    marginTop: Spacing.three,
    flexGrow: 0,
  },

  countryButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: Spacing.two,
  },

  resetButton: {
    alignSelf: 'flex-end',
    marginTop: Spacing.two,
    paddingVertical: Spacing.one,
  },

  resultCount: {
    marginTop: Spacing.three,
    marginBottom: Spacing.two,
    fontSize: 14,
  },

  birdCard: {
    padding: Spacing.three,
    borderRadius: 12,
    marginBottom: Spacing.two,
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

  emptyCard: {
    padding: Spacing.four,
    borderRadius: 12,
    alignItems: 'center',
    gap: Spacing.two,
  },
});
