import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Know Your Birds
        </ThemedText>

        <ThemedText type="subtitle" style={styles.subtitle}>
          Guess the Bird of the Day
        </ThemedText>

        <ThemedView
          type="backgroundElement"
          style={styles.card}
        >
          <ThemedText type="title" style={styles.cardTitle}>
            🐦 Coming soon
          </ThemedText>

          <ThemedText style={styles.cardText}>
            A new bird challenge will be waiting for you every day.
          </ThemedText>
        </ThemedView>
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
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },

  title: {
    marginTop: Spacing.six,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: Spacing.four,
    textAlign: 'center',
  },

  card: {
    width: '100%',
    marginTop: Spacing.two,
    padding: Spacing.six,
    borderRadius: Spacing.four,
    alignItems: 'center',
  },

  cardTitle: {
    textAlign: 'center',
  },

  cardText: {
    marginTop: Spacing.three,
    textAlign: 'center',
    lineHeight: 24,
  },
});