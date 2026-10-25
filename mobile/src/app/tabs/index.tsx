import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import {
  getDailyChallengeCompletedDate,
  markDailyChallengeCompleted,
} from '../../storage/dailyChallengeStorage';

const BIRD_NAME = 'Indian Roller';
const BIRD_IMAGE = require('../../../assets/images/birds/indian-roller.jpg');

const STARTING_SCORE = 100;
const WRONG_GUESS_PENALTY = 10;
const HINT_PENALTY = 10;
const GIVE_UP_SCORE = 10;

const HINTS = [
  'This bird is commonly found in the Indian subcontinent.',
  'It is known for its bright blue wings.',
  'It belongs to the roller family.',
];

export default function HomeScreen() {
  const router = useRouter();

  const today = new Date().toISOString().split('T')[0];

  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(STARTING_SCORE);
  const [hintIndex, setHintIndex] = useState(-1);
  const [message, setMessage] = useState('');
  const [gameCompleted, setGameCompleted] = useState(false);
  const [dailyChallengeCompleted, setDailyChallengeCompleted] = useState(false);

  useEffect(() => {
    async function checkDailyChallenge() {
      const completedDate = await getDailyChallengeCompletedDate();

      if (completedDate === today) {
        setDailyChallengeCompleted(true);
        setGameCompleted(true);
      }
    }

    checkDailyChallenge();
  }, [today]);

  const handleGuess = async () => {
    if (gameCompleted) {
      return;
    }

    const trimmedGuess = guess.trim();

    if (!trimmedGuess) {
      setMessage('Please enter a bird name.');
      return;
    }

    const isCorrect =
      trimmedGuess.toLowerCase() === BIRD_NAME.toLowerCase();

    if (isCorrect) {
      setGameCompleted(true);
      setMessage('Correct! You identified the bird!');

      await markDailyChallengeCompleted(today);

      router.replace({
        pathname: '/result',
        params: {
          score: score.toString(),
          identified: 'true',
        },
      });

      return;
    }

    const nextScore = Math.max(
      score - WRONG_GUESS_PENALTY - HINT_PENALTY,
      0
    );

    setScore(nextScore);

    setHintIndex((currentIndex) =>
      Math.min(currentIndex + 1, HINTS.length - 1)
    );

    setGuess('');

    if (nextScore === 0) {
      setGameCompleted(true);

      await markDailyChallengeCompleted(today);

      router.replace({
        pathname: '/result',
        params: {
          score: GIVE_UP_SCORE.toString(),
          identified: 'false',
        },
      });

      return;
    }

    setMessage('Not quite. Try again!');
  };

  /*
   * The image starts heavily blurred.
   *
   * After each wrong guess:
   * 25 -> 17 -> 9
   *
   * Once the bird is correctly identified:
   * 0 -> completely clear
   */
  const blurAmount = gameCompleted
    ? 0
    : hintIndex === -1
      ? 25
      : Math.max(25 - hintIndex * 8, 5);

  return (
    <ThemedView style={styles.container}>
      {!dailyChallengeCompleted && (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <ThemedView style={styles.header}>
              <ThemedText type="title" style={styles.title}>
                Know Your Birds
              </ThemedText>

              <ThemedText style={styles.subtitle}>
                Guess the Bird of the Day
              </ThemedText>
            </ThemedView>

            {/* Streak */}
            <ThemedView style={styles.streakRow}>
              <ThemedText style={styles.streakText}>
                Streak: 0 days
              </ThemedText>
            </ThemedView>

            {/* Daily Challenge */}
            <ThemedView
              type="backgroundElement"
              style={styles.challengeCard}
            >
              <ThemedText type="subtitle" style={styles.challengeTitle}>
                Today's Bird
              </ThemedText>

              {/* Bird Image */}
              <View style={styles.imageContainer}>
                <Image
                  source={BIRD_IMAGE}
                  style={styles.birdImage}
                  resizeMode="cover"
                  blurRadius={blurAmount}
                />
              </View>

              {/* Score */}
              <ThemedText style={styles.score}>
                Score: {score}
              </ThemedText>

              {/* Hint */}
              {hintIndex >= 0 && (
                <View style={styles.hintBox}>
                  <ThemedText style={styles.hintLabel}>
                    Hint
                  </ThemedText>

                  <ThemedText style={styles.hintText}>
                    {HINTS[hintIndex]}
                  </ThemedText>
                </View>
              )}

              {/* Question */}
              <ThemedText style={styles.question}>
                What bird is this?
              </ThemedText>

              {/* Guess Input */}
              <TextInput
                value={guess}
                onChangeText={setGuess}
                style={styles.input}
                placeholder="Enter bird name"
                placeholderTextColor="#888"
                autoCapitalize="words"
                autoCorrect={false}
                editable={!gameCompleted}
                onSubmitEditing={handleGuess}
              />

              {/* Guess Button */}
              <Pressable
                style={[
                  styles.guessButton,
                  gameCompleted && styles.guessButtonDisabled,
                ]}
                onPress={handleGuess}
                disabled={gameCompleted}
              >
                <ThemedText style={styles.guessButtonText}>
                  {gameCompleted ? 'COMPLETED' : 'GUESS'}
                </ThemedText>
              </Pressable>
              <Pressable
                style={styles.giveUpButton}
                onPress={ async () => {
                  await markDailyChallengeCompleted(today);
                  router.replace({
                    pathname: '/result',
                    params: {
                      score: GIVE_UP_SCORE.toString(),
                      identified: 'false',
                    },
                  });
                }}
                disabled={gameCompleted}
              >
                <ThemedText style={styles.giveUpButtonText}>
                  I DON'T KNOW
                </ThemedText>
              </Pressable>  

              {/* Feedback */}
              {message !== '' && (
                <ThemedText style={styles.message}>
                  {message}
                </ThemedText>
              )}
            </ThemedView>
          </ScrollView>
        </SafeAreaView>
      )}
      {dailyChallengeCompleted && (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <ThemedView style={styles.header}>
              <ThemedText type="title" style={styles.title}>
                Know Your Birds
              </ThemedText>

              <ThemedText style={styles.subtitle}>
                Guess the Bird of the Day
              </ThemedText>
            </ThemedView>

            {/* Completed State */}
            <ThemedView
              type="backgroundElement"
              style={styles.challengeCard}
            >
              <ThemedText type="subtitle" style={styles.challengeTitle}>
                Today's Challenge
              </ThemedText>

              <ThemedText style={styles.completedTitle}>
                Challenge Completed! 🎉
              </ThemedText>

              <ThemedText style={styles.completedText}>
                You've already completed today's bird challenge.
              </ThemedText>

              <ThemedText style={styles.completedSubtext}>
                Come back tomorrow for a new bird!
              </ThemedText>
            </ThemedView>
          </ScrollView>
        </SafeAreaView>
      )}
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

  subtitle: {
    marginTop: Spacing.one,
    textAlign: 'center',
  },

  streakRow: {
    alignItems: 'center',
    marginTop: Spacing.three,
  },

  streakText: {
    fontSize: 16,
    fontWeight: '600',
  },

  challengeCard: {
    width: '100%',
    marginTop: Spacing.three,
    padding: Spacing.four,
    borderRadius: Spacing.four,
    alignItems: 'center',
  },

  challengeTitle: {
    textAlign: 'center',
  },

  imageContainer: {
    width: '100%',
    height: 190,
    marginTop: Spacing.three,
    borderRadius: Spacing.four,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },

  birdImage: {
    width: '100%',
    height: '100%',
  },

  score: {
    marginTop: Spacing.three,
    fontSize: 18,
    fontWeight: '700',
  },

  hintBox: {
    width: '100%',
    marginTop: Spacing.two,
    padding: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  hintLabel: {
    fontSize: 14,
    fontWeight: '700',
  },

  hintText: {
    marginTop: Spacing.one,
    fontSize: 14,
    lineHeight: 20,
  },

  question: {
    marginTop: Spacing.two,
    fontSize: 17,
    fontWeight: '600',
  },

  input: {
    width: '100%',
    height: 44,
    marginTop: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: Spacing.two,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  guessButton: {
    width: '100%',
    height: 44,
    marginTop: Spacing.two,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  guessButtonDisabled: {
    opacity: 0.5,
  },

  guessButtonText: {
    color: '#000000',
    fontWeight: '700',
  },

  giveUpButton: {
  width: '100%',
  height: 44,
  marginTop: Spacing.two,
  borderRadius: Spacing.two,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '#777',
  },

  giveUpButtonText: {
    fontWeight: '600',
  },
  
  message: {
    marginTop: Spacing.two,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  
  completedTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
  },

  completedText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },

  completedSubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
  },
});