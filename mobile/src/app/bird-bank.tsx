import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function BirdBankScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Bird Bank</ThemedText>

      <ThemedText style={styles.subtitle}>
        Your discovered birds will appear here.
      </ThemedText>
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
  subtitle: {
    marginTop: 12,
    textAlign: 'center',
  },
});