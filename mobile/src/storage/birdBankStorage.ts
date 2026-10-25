import AsyncStorage from '@react-native-async-storage/async-storage';

export type BirdStatus =
  | 'not_encountered'
  | 'encountered'
  | 'identified';

const BIRD_BANK_STATUS_KEY = 'birdBankStatus';

type BirdStatusMap = Record<string, BirdStatus>;

async function getBirdStatusMap(): Promise<BirdStatusMap> {
  const stored = await AsyncStorage.getItem(BIRD_BANK_STATUS_KEY);

  if (!stored) {
    return {};
  }

  return JSON.parse(stored);
}

export async function getBirdStatus(
  birdId: string
): Promise<BirdStatus> {
  const statusMap = await getBirdStatusMap();

  return statusMap[birdId] ?? 'not_encountered';
}

export async function setBirdStatus(
  birdId: string,
  newStatus: BirdStatus
): Promise<void> {
  const statusMap = await getBirdStatusMap();
  const currentStatus = statusMap[birdId] ?? 'not_encountered';

  const statusOrder: Record<BirdStatus, number> = {
    not_encountered: 0,
    encountered: 1,
    identified: 2,
  };

  if (statusOrder[newStatus] < statusOrder[currentStatus]) {
    return;
  }

  statusMap[birdId] = newStatus;

  await AsyncStorage.setItem(
    BIRD_BANK_STATUS_KEY,
    JSON.stringify(statusMap)
  );
}

export async function testBirdBankStorage(): Promise<void> {
  const birdId = 'test_bird';

  console.log(
    'Initial:',
    await getBirdStatus(birdId)
  );

  await setBirdStatus(birdId, 'encountered');

  console.log(
    'After encountered:',
    await getBirdStatus(birdId)
  );

  await setBirdStatus(birdId, 'identified');

  console.log(
    'After identified:',
    await getBirdStatus(birdId)
  );

  await setBirdStatus(birdId, 'encountered');

  console.log(
    'After downgrade attempt:',
    await getBirdStatus(birdId)
  );
}