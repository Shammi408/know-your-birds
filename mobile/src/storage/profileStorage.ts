import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'profileData';

type ProfileData = {
  xp: number;
};

export async function getProfileData(): Promise<ProfileData> {
  const stored = await AsyncStorage.getItem(PROFILE_KEY);

  if (!stored) {
    return {
      xp: 0,
    };
  }

  return JSON.parse(stored);
}

export async function addXp(amount: number): Promise<number> {
  const profile = await getProfileData();

  const newXp = profile.xp + amount;

  const updatedProfile: ProfileData = {
    xp: newXp,
  };

  await AsyncStorage.setItem(
    PROFILE_KEY,
    JSON.stringify(updatedProfile)
  );

  return newXp;
}