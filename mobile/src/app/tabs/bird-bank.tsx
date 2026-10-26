import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  BirdBankEntry,
  getBirdBankEntries,
} from '../../data/birdBank';

export default function BirdBankScreen() {
  const router = useRouter();
  
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
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Bird Bank
      </ThemedText>

      {entries.map((entry) => (
        <Pressable
          key={entry.bird.id}
          onPress={() =>
            router.push({
              pathname: '/bird-details',
              params: {
                birdId: entry.bird.id,
              },
            })
          }
        >
          <ThemedView
            type="backgroundElement"
            style={styles.card}
          >
            {entry.status === 'not_encountered' ? (
              <>
                <ThemedText type="subtitle">
                  Unknown Bird
                </ThemedText>

                <ThemedText>
                  Not Encountered
                </ThemedText>
              </>
            ) : (
              <>
                <ThemedText type="subtitle">
                  {entry.bird.commonName}
                </ThemedText>

                <ThemedText>
                  {entry.bird.scientificName}
                </ThemedText>

                <ThemedText style={styles.status}>
                  {entry.status === 'identified'
                    ? 'Identified'
                    : 'Encountered'}
                </ThemedText>
              </>
            )}
          </ThemedView>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    marginBottom: 20,
  },

  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  status: {
    marginTop: 6,
    fontWeight: '600',
  },
});