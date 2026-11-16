
import { useEffect, useState } from 'react';
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
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

import { setBirdStatus } from '../../storage/birdBankStorage';
import { getDailyBird } from '../../data/dailyBird';
import { updateStreak, getStreakData } from '../../storage/streakStorage';
import {
  getDailyChallengeCompletedDate,
  markDailyChallengeCompleted,
} from '../../storage/dailyChallengeStorage';
import { addXp } from '../../storage/profileStorage';
import { isCorrectAnswer } from '@/utils/answerMatching';

const STARTING_SCORE = 100;
const WRONG_GUESS_PENALTY = 10;
const HINT_PENALTY = 10;
const GIVE_UP_SCORE = 10;

// Use the device's local calendar date rather than UTC.
function getLocalDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  const today = getLocalDate();
  const dailyBird = getDailyBird(today);

  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(STARTING_SCORE);
  const [hintIndex, setHintIndex] = useState(-1);
  const [message, setMessage] = useState('');
  const [gameCompleted, setGameCompleted] = useState(false);
  const [dailyChallengeCompleted, setDailyChallengeCompleted] =
    useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    async function loadHomeData() {
      const [completedDate, streakData] = await Promise.all([
        getDailyChallengeCompletedDate(),
        getStreakData(),
      ]);

      setCurrentStreak(streakData.currentStreak);

      if (completedDate === today) {
        setDailyChallengeCompleted(true);
        setGameCompleted(true);
      }
    }

    loadHomeData();
  }, [today]);

  const finishChallenge = async (identified: boolean, earnedXp: number) => {
    setGameCompleted(true);

    await setBirdStatus(
      dailyBird.id,
      identified ? 'identified' : 'encountered'
    );
    await markDailyChallengeCompleted(today);
    await updateStreak(today);
    await addXp(earnedXp);

    router.replace({
      pathname: '/result',
      params: {
        score: earnedXp.toString(),
        identified: identified ? 'true' : 'false',
        birdId: dailyBird.id,
      },
    });
  };

  const handleGuess = async () => {
    if (gameCompleted) return;

    const trimmedGuess = guess.trim();

    if (!trimmedGuess) {
      setMessage('Please enter a bird name.');
      return;
    }

    const isCorrect = isCorrectAnswer(trimmedGuess, dailyBird);

    if (isCorrect) {
      setMessage('Correct! You identified the bird!');
      await finishChallenge(true, score);
      return;
    }

    const nextScore = Math.max(
      score - WRONG_GUESS_PENALTY - HINT_PENALTY,
      0
    );

    setScore(nextScore);

    setHintIndex((currentIndex) =>
      Math.min(currentIndex + 1, dailyBird.hints.length - 1)
    );

    setGuess('');

    if (nextScore === 0) {
      await finishChallenge(false, GIVE_UP_SCORE);
      return;
    }

    setMessage('Not quite. Try again!');
  };

  const handleGiveUp = async () => {
    if (gameCompleted) return;
    await finishChallenge(false, GIVE_UP_SCORE);
  };

  const blurAmount = gameCompleted
    ? 0
    : hintIndex === -1
      ? 25
      : Math.max(25 - hintIndex * 8, 5);

  return (
    <ThemedView style={styles.container}>
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

            <ThemedText
              themeColor="textSecondary"
              style={styles.subtitle}
            >
              Guess the Bird of the Day
            </ThemedText>
          </ThemedView>

          {/* Streak */}
          <ThemedView
            type="backgroundElement"
            style={styles.streakCard}
          >
            <ThemedText style={styles.streakText}>
              🔥 Current Streak: {currentStreak}{' '}
              {currentStreak === 1 ? 'day' : 'days'}
            </ThemedText>
          </ThemedView>

          {/* Daily Challenge */}
          <ThemedView
            type="backgroundElement"
            style={styles.challengeCard}
          >
            <ThemedText type="subtitle" style={styles.challengeTitle}>
              Today's Challenge
            </ThemedText>

            {!dailyChallengeCompleted ? (
              <>
                {/* Bird Image */}
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: dailyBird.image }}
                    style={styles.birdImage}
                    resizeMode="cover"
                    blurRadius={blurAmount}
                  />
                </View>

                {/* Score */}
                <ThemedView
                  type="backgroundSelected"
                  style={styles.scoreCard}
                >
                  <ThemedText themeColor="textSecondary">
                    Your Daily Score
                  </ThemedText>
                  <ThemedText style={styles.score}>
                    {score} XP
                  </ThemedText>
                </ThemedView>

                {/* Hints */}
                {hintIndex >= 0 && (
                  <ThemedView
                    type="backgroundSelected"
                    style={styles.hintBox}
                  >
                    <ThemedText style={styles.hintLabel}>
                      💡 Hint {hintIndex + 1}
                    </ThemedText>

                    <ThemedText style={styles.hintText}>
                      {dailyBird.hints[hintIndex]}
                    </ThemedText>
                  </ThemedView>
                )}

                {/* Question */}
                <ThemedText style={styles.question}>
                  What bird is this?
                </ThemedText>

                {/* Guess Input */}
                <TextInput
                  value={guess}
                  onChangeText={setGuess}
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      borderColor: theme.backgroundSelected,
                      backgroundColor: theme.background,
                    },
                  ]}
                  placeholder="Enter bird name"
                  placeholderTextColor={theme.text}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!gameCompleted}
                  onSubmitEditing={handleGuess}
                  returnKeyType="done"
                />

                {/* Guess Button */}
                <Pressable
                  style={[
                    styles.guessButton,
                    { backgroundColor: theme.backgroundSelected },
                    gameCompleted && styles.disabledButton,
                  ]}
                  onPress={handleGuess}
                  disabled={gameCompleted}
                >
                  <ThemedText style={styles.buttonText}>
                    GUESS
                  </ThemedText>
                </Pressable>

                {/* Give Up Button */}
                <Pressable
                  style={[
                    styles.giveUpButton,
                    { borderColor: theme.backgroundSelected },
                    gameCompleted && styles.disabledButton,
                  ]}
                  onPress={handleGiveUp}
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
              </>
            ) : (
              /* Completed State */
              <>
                <ThemedText style={styles.completedEmoji}>
                  🎉
                </ThemedText>

                <ThemedText style={styles.completedTitle}>
                  Challenge Completed!
                </ThemedText>

                <ThemedText
                  themeColor="textSecondary"
                  style={styles.completedText}
                >
                  You've already completed today's bird challenge.
                </ThemedText>

                <ThemedText
                  themeColor="textSecondary"
                  style={styles.completedSubtext}
                >
                  Come back tomorrow for a new bird!
                </ThemedText>
              </>
            )}
          </ThemedView>
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
    paddingHorizontal: Spacing.four,
  },

  scrollContent: {
    paddingBottom: 100,
  },

  header: {
    alignItems: 'center',
    marginTop: Spacing.two,
    marginBottom: Spacing.three,
  },

  title: {
    textAlign: 'center',
  },

  subtitle: {
    marginTop: Spacing.one,
    textAlign: 'center',
  },

  streakCard: {
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: Spacing.three,
    marginBottom: Spacing.three,
  },

  streakText: {
    fontSize: 16,
    fontWeight: '600',
  },

  challengeCard: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: Spacing.four,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.2)',
    elevation: 2,
  },

  challengeTitle: {
    textAlign: 'center',
    marginBottom: Spacing.one,
  },

  imageContainer: {
    width: '100%',
    height: 210,
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    overflow: 'hidden',
    backgroundColor: '#808080',
  },

  birdImage: {
    width: '100%',
    height: '100%',
  },

  scoreCard: {
    width: '100%',
    alignItems: 'center',
    padding: Spacing.three,
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
  },

  score: {
    marginTop: Spacing.one,
    fontSize: 26,
    fontWeight: '700',
  },

  hintBox: {
    width: '100%',
    marginTop: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },

  hintLabel: {
    fontSize: 15,
    fontWeight: '700',
  },

  hintText: {
    marginTop: Spacing.two,
    fontSize: 15,
    lineHeight: 22,
  },

  question: {
    marginTop: Spacing.four,
    fontSize: 17,
    fontWeight: '600',
  },

  input: {
    width: '100%',
    height: 50,
    marginTop: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderWidth: 1,
    borderRadius: Spacing.two,
    fontSize: 16,
  },

  guessButton: {
    width: '100%',
    height: 48,
    marginTop: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontWeight: '700',
  },

  giveUpButton: {
    width: '100%',
    height: 48,
    marginTop: Spacing.two,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  giveUpButtonText: {
    fontWeight: '600',
  },

  disabledButton: {
    opacity: 0.5,
  },

  message: {
    marginTop: Spacing.three,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },

  completedEmoji: {
    fontSize: 42,
    marginTop: Spacing.four,
  },

  completedTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: Spacing.two,
  },

  completedText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: Spacing.three,
    lineHeight: 24,
  },

  completedSubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
