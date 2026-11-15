
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

import { getBirdById, Bird } from '../data/birds';
import { getBirdStatus, BirdStatus } from '../storage/birdBankStorage';

export default function BirdDetailsScreen() {
  const router = useRouter();
  const theme = useTheme();

  const { birdId, source } = useLocalSearchParams<{
    birdId: string;
    source: string;
  }>();

  const [bird, setBird] = useState<Bird | undefined>();
  const [status, setStatus] = useState<BirdStatus>('not_encountered');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBird() {
      setIsLoading(true);

      if (!birdId) {
        setBird(undefined);
        setIsLoading(false);
        return;
      }

      const birdData = getBirdById(birdId);
      const birdStatus = await getBirdStatus(birdId);

      setBird(birdData);
      setStatus(birdStatus);
      setIsLoading(false);
    }

    loadBird();
  }, [birdId]);

  const canViewDetails =
    source === 'explore' ||
    status === 'encountered' ||
    status === 'identified';

  const statusLabel =
    status === 'identified'
      ? 'Identified'
      : status === 'encountered'
        ? 'Encountered'
        : 'Not Encountered';

  const statusColor =
    status === 'identified'
      ? '#4F8A5B'
      : status === 'encountered'
        ? '#B8860B'
        : '#888888';

  const renderSection = (
    title: string,
    content: React.ReactNode
  ) => (
    <ThemedView
      type="backgroundElement"
      style={[
        styles.sectionCard,
        { borderColor: theme.backgroundSelected },
      ]}
    >
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        {title}
      </ThemedText>

      {content}
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        style={styles.backButtonContainer}
      >
        <ThemedText style={styles.backButton}>
          ← Back
        </ThemedText>
      </Pressable>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="title" style={styles.pageTitle}>
          Bird Details
        </ThemedText>

        {isLoading ? (
          <ThemedText style={styles.message}>
            Loading bird details...
          </ThemedText>
        ) : !bird || !canViewDetails ? (
          <ThemedView
            type="backgroundElement"
            style={styles.unknownCard}
          >
            <ThemedText style={styles.unknownIcon}>
              🐦
            </ThemedText>

            <ThemedText type="subtitle">
              Unknown Bird
            </ThemedText>

            <ThemedText
              themeColor="textSecondary"
              style={styles.message}
            >
              This bird has not been encountered yet.
            </ThemedText>
          </ThemedView>
        ) : (
          <>
            {/* Bird Image */}
            <Image
              source={{ uri: bird.image }}
              style={styles.birdImage}
              resizeMode="cover"
            />

            {/* Bird Identity */}
            <ThemedView style={styles.identitySection}>
              <ThemedText type="title" style={styles.birdName}>
                {bird.commonName}
              </ThemedText>

              <ThemedText
                themeColor="textSecondary"
                style={styles.scientificName}
              >
                {bird.scientificName}
              </ThemedText>

              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: theme.backgroundSelected },
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: statusColor },
                  ]}
                />

                <ThemedText
                  style={[styles.statusText, { color: statusColor }]}
                >
                  {statusLabel}
                </ThemedText>
              </View>
            </ThemedView>

            {/* Size */}
            {renderSection(
              'Size',
              <ThemedText style={styles.sectionContent}>
                {bird.size.minCm}–{bird.size.maxCm} cm
              </ThemedText>
            )}

            {/* Habitat */}
            {renderSection(
              'Habitat',
              <View style={styles.listContainer}>
                {bird.habitat.map((item) => (
                  <ThemedText key={item} style={styles.listItem}>
                    • {item}
                  </ThemedText>
                ))}
              </View>
            )}

            {/* Features */}
            {renderSection(
              'Features',
              <ThemedText style={styles.sectionContent}>
                {bird.features}
              </ThemedText>
            )}

            {/* Diet */}
            {renderSection(
              'Diet',
              <ThemedText style={styles.sectionContent}>
                {bird.diet}
              </ThemedText>
            )}

            {/* Behavior */}
            {renderSection(
              'Behavior',
              <ThemedText style={styles.sectionContent}>
                {bird.behavior}
              </ThemedText>
            )}

            {/* Fun Facts */}
            {renderSection(
              'Fun Facts',
              <View style={styles.listContainer}>
                {bird.funFacts.map((fact, index) => (
                  <ThemedText
                    key={`${index}-${fact}`}
                    style={styles.listItem}
                  >
                    • {fact}
                  </ThemedText>
                ))}
              </View>
            )}

            {/* Conservation Status */}
            {renderSection(
              'Conservation Status',
              <ThemedText style={styles.sectionContent}>
                {bird.conservationStatus}
              </ThemedText>
            )}

            {/* Range */}
            {renderSection(
              'Range',
              <View style={styles.listContainer}>
                {bird.range.map((location) => (
                  <ThemedText
                    key={location}
                    style={styles.listItem}
                  >
                    • {location}
                  </ThemedText>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },

  backButtonContainer: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.two,
  },

  backButton: {
    fontSize: 16,
    fontWeight: '600',
  },

  scrollContent: {
    paddingBottom: 100,
  },

  pageTitle: {
    marginBottom: Spacing.three,
  },

  birdImage: {
    width: '100%',
    height: 230,
    borderRadius: Spacing.four,
    marginBottom: Spacing.three,
  },

  identitySection: {
    marginBottom: Spacing.three,
  },

  birdName: {
    fontSize: 28,
  },

  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: Spacing.one,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 20,
    marginTop: Spacing.two,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.two,
  },

  statusText: {
    fontSize: 13,
    fontWeight: '700',
  },

  sectionCard: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    borderWidth: 1,
    marginBottom: Spacing.three,
    elevation: 2,
  },

  sectionTitle: {
    marginBottom: Spacing.two,
  },

  sectionContent: {
    fontSize: 15,
    lineHeight: 23,
  },

  listContainer: {
    gap: Spacing.two,
  },

  listItem: {
    fontSize: 15,
    lineHeight: 23,
  },

  unknownCard: {
    padding: Spacing.four,
    borderRadius: Spacing.four,
    alignItems: 'center',
    marginTop: Spacing.two,
  },

  unknownIcon: {
    fontSize: 40,
    marginBottom: Spacing.two,
  },

  message: {
    marginTop: Spacing.two,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
