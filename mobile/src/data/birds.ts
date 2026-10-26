export type Bird = {
  id: string;
  commonName: string;
  scientificName: string;
  image: number;
  size: {
    minCm: number;
    maxCm: number;
    category: 'small' | 'medium' | 'large';
  };
  features: string;
  habitat: string[];
  range: string[];
  diet: string;
  behavior: string;
  funFacts: string[];
  conservationStatus: string;
};

export const BIRDS: Bird[] = [
  {
    id: 'indian_roller',
    commonName: 'Indian Roller',
    scientificName: 'Coracias benghalensis',
    image: require('../../assets/images/birds/indian-roller.jpg'),
    size: {
      minCm: 30,
      maxCm: 34,
      category: 'medium',
    },
    features: 'A striking blue bird with vivid blue wings and a brownish head and body.',
    habitat: [
      'Open woodland',
      'Grassland',
      'Agricultural areas',
    ],
    range: [
      'India',
      'Pakistan',
      'Bangladesh',
      'Sri Lanka',
    ],
    diet: 'Insects, small reptiles, amphibians, and small mammals.',
    behavior: 'Often perches in open areas and makes characteristic rolling displays during flight.',
    funFacts: [
      'The Indian Roller is known for its spectacular rolling flight display.',
      'It is commonly seen perched on wires and exposed branches.',
    ],
    conservationStatus: 'Least Concern',
  },
  {
    id: 'house_sparrow',
    commonName: 'House Sparrow',
    scientificName: 'Passer domesticus',
    image: 0,
    size: {
      minCm: 14,
      maxCm: 18,
      category: 'small',
    },
    features: 'A small, familiar bird with a compact body and short bill.',
    habitat: [
      'Cities',
      'Villages',
      'Farmland',
    ],
    range: [
      'Worldwide',
    ],
    diet: 'Seeds, grains, insects, and food scraps.',
    behavior: 'Highly social and often found in groups around human settlements.',
    funFacts: [
      'House Sparrows have adapted extremely well to living alongside humans.',
      'They often build nests in buildings and other man-made structures.',
    ],
    conservationStatus: 'Least Concern',
  },
  {
    id: 'common_kingfisher',
    commonName: 'Common Kingfisher',
    scientificName: 'Alcedo atthis',
    image: 0,
    size: {
      minCm: 17,
      maxCm: 19,
      category: 'small',
    },
    features: 'A compact bird with bright blue-green upperparts and orange underparts.',
    habitat: [
      'Rivers',
      'Streams',
      'Lakes',
      'Ponds',
    ],
    range: [
      'Europe',
      'Asia',
      'North Africa',
    ],
    diet: 'Primarily small fish and aquatic prey.',
    behavior: 'Usually hunts from a perch before diving rapidly into the water.',
    funFacts: [
      'The Common Kingfisher can dive into water to catch fish.',
      'Its bright blue appearance is produced partly by the structure of its feathers.',
    ],
    conservationStatus: 'Least Concern',
  },
];

export function getBirdById(birdId: string): Bird | undefined {
  return BIRDS.find((bird) => bird.id === birdId);
}