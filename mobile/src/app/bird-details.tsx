import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getBirdById, Bird } from '../data/birds';
import { getBirdStatus, BirdStatus } from '../storage/birdBankStorage';

export default function BirdDetailsScreen() {
    const router = useRouter();
    const { birdId } = useLocalSearchParams<{ birdId: string }>();
    const [bird, setBird] = useState<Bird | undefined>();
    const [status, setStatus] = useState<BirdStatus>('not_encountered');

    useEffect(() => {
    async function loadBird() {
        if (!birdId) {
        return;
        }

        const birdData = getBirdById(birdId);
        const birdStatus = await getBirdStatus(birdId);

        setBird(birdData);
        setStatus(birdStatus);
    }

    loadBird();
    }, [birdId]);
    return (
    <SafeAreaView style={styles.container}>
        <Pressable onPress={() => router.back()}>
            <ThemedText style={styles.backButton}>
                ← Back
            </ThemedText>
        </Pressable>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <ThemedText type="title" style={styles.title}>
            Bird Details
            </ThemedText>

            {status === 'not_encountered' || !bird ? (
            <>
                <ThemedText type="title">
                Unknown Bird
                </ThemedText>

                <ThemedText style={styles.message}>
                    This bird has not been encountered yet.
                </ThemedText>
            </>
            ) : (
            <>  
                <Image
                    source={bird.image}
                    style={styles.birdImage}
                    resizeMode="cover"
                />
                <ThemedText type="title">
                    {bird.commonName}
                </ThemedText>

                <ThemedText style={styles.scientificName}>
                    {bird.scientificName}
                </ThemedText>

                <ThemedText style={[
                                styles.status,
                                status === 'identified'
                                ? styles.identifiedStatus
                                : styles.encounteredStatus,
                            ]}
                >
                    {status === 'identified' ? 'Identified' : 'Encountered'}
                </ThemedText>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Size
                </ThemedText>

                <ThemedText>
                    {bird.size.minCm}–{bird.size.maxCm} cm
                </ThemedText>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Habitat
                </ThemedText>

                {bird.habitat.map((item) => (
                    <   ThemedText key={item}>• {item}</ThemedText>
                ))}

                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Features
                </ThemedText>

                <ThemedText>
                    {bird.features}
                </ThemedText>

                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Diet
                </ThemedText>

                <ThemedText>
                    {bird.diet}
                </ThemedText>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Behavior
                </ThemedText>

                <ThemedText>
                    {bird.behavior}
                </ThemedText>

                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Fun Facts
                </ThemedText>

                {bird.funFacts.map((fact) => (
                    <ThemedText key={fact}>• {fact}</ThemedText>
                ))}

                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Conservation Status
                </ThemedText>

                <ThemedText>
                    {bird.conservationStatus}
                </ThemedText>

                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Range
                </ThemedText>

                {bird.range.map((location) => (
                    <ThemedText key={location}>• {location}</ThemedText>
                ))}
            </>
            )}
        </ScrollView>
    </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    backButton: {
        fontSize: 16,
        marginBottom: 24,
    },

    title: {
        marginBottom: 20,
    },

    message: {
        marginTop: 16,
        fontSize: 16,
    },

    scientificName: {
        marginTop: 8,
        fontSize: 18,
    },

    status: {
        marginTop: 8,
        fontWeight: '600',
    },
    identifiedStatus: {
        color: '#4F8A5B',
    },

    encounteredStatus: {
        color: '#B8860B',
    },

    birdImage: {
        width: '100%',
        height: 220,
        borderRadius: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        marginTop: 24,
        marginBottom: 8,
    },

    scrollContent: {
    paddingBottom: 40,
    },
});