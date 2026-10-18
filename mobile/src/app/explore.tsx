import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>

          <Text style={styles.subtitle}>
            Learn about birds from around the world.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardEmoji}>🌍</Text>

          <Text style={styles.cardTitle}>Discover Birds</Text>

          <Text style={styles.cardDescription}>
            Explore birds by country, habitat, and other interesting facts.
          </Text>
        </View>
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
});