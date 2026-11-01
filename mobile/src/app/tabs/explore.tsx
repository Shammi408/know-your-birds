import { Pressable, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { BIRDS } from '../../data/birds';

export default function ExploreScreen() {
  const router = useRouter();
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
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>

          <Text style={styles.subtitle}>
            Learn about birds from around the world.
          </Text>
          <View style={styles.sortRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search birds..."
              placeholderTextColor="#888888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Pressable
              style={[
                styles.sortButton,
                sortOrder === 'asc' && styles.activeSortButton,
              ]}
              onPress={() => setSortOrder('asc')}
            >
              <Text style={styles.sortButtonText}>A → Z</Text>
            </Pressable>

            <Pressable
              style={[
                styles.sortButton,
                sortOrder === 'desc' && styles.activeSortButton,
              ]}
              onPress={() => setSortOrder('desc')}
            >
              <Text style={styles.sortButtonText}>Z → A</Text>
            </Pressable>
          </View>
          {hasActiveFilters && (
            <Pressable
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery('');
                setCountryFilter('All');
                setSortOrder('default');
              }}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </Pressable>
          )}
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
                  countryFilter === country && styles.activeCountryButton,
                ]}
                onPress={() => setCountryFilter(country)}
              >
                <Text style={styles.countryButtonText}>
                  {country}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        
        <ScrollView
          style={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {displayedBirds.map((bird) => (
            <Pressable
              key={bird.id}
              style={styles.birdCard}
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
              <Text style={styles.birdName}>
                {bird.commonName}
              </Text>

              <Text style={styles.scientificName}>
                {bird.scientificName}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    alignItems: 'center',
    marginTop: 70,
  },

  title: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    marginTop: 60,
    paddingHorizontal: 24,
    paddingVertical: 36,
    borderRadius: 28,
    backgroundColor: '#202125',
    alignItems: 'center',
  },

  cardEmoji: {
    fontSize: 48,
  },

  cardTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 16,
  },

  cardDescription: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    textAlign: 'center',
    marginTop: 16,
  },
  list: {
    marginTop: 40,
    flex: 1,
  },

  birdCard: {
    backgroundColor: '#202125',
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },

  birdName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },

  scientificName: {
    color: '#cccccc',
    fontSize: 15,
    fontStyle: 'italic',
    marginTop: 6,
  },

  searchInput: {
    flex: 1,
    backgroundColor: '#202125',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 16,
  },

  sortRow: {
    flexDirection: 'row',
    gap: 6,
  },

  sortButton: {
    backgroundColor: '#202125',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  activeSortButton: {
    backgroundColor: '#3a3b40',
  },

  sortButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  countryRow: {
    marginTop: 12,
    flexGrow: 0,
    alignSelf: 'stretch',
  },

  countryButton: {
    backgroundColor: '#202125',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
  },

  activeCountryButton: {
    backgroundColor: '#3a3b40',
  },

  countryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  resetButton: {
    alignSelf: 'center',
    backgroundColor: '#202125',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 10,
  },

  resetButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});