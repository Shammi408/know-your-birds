export type Bird = {
  id: string;
  commonName: string;
  scientificName: string;
  image: string;
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
  hints: string[];
};

export const BIRDS: Bird[] = [
  {
    id: 'indian_roller',
    commonName: 'Indian Roller',
    scientificName: 'Coracias benghalensis',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1793123860/indian-roller_okyy5v.jpg',
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
    hints: [
      'This bird is commonly found in the Indian subcontinent.',
      'It is known for its bright blue wings.',
      'It belongs to the roller family.',
    ],
  },
  {
    id: 'house_sparrow',
    commonName: 'House Sparrow',
    scientificName: 'Passer domesticus',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1793193605/House-sparrow_s0g2uo.png',
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
    hints: [
      'This is a small bird commonly seen around human settlements.',
      'It often feeds on seeds, grains, and food scraps.',
      'It is highly social and often seen in groups.',
      'It belongs to the sparrow family.',
    ],
  },
  {
    id: 'common_kingfisher',
    commonName: 'Common Kingfisher',
    scientificName: 'Alcedo atthis',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1793193621/Common-Kingfisher_yrdqzu.jpg',
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
    hints: [
      'This is a small bird often found near freshwater.',
      'It has bright blue-green upperparts and orange underparts.',
      'It dives into water to catch small fish.',
    ],
  },
  {
    id: 'indian_peafowl',
    commonName: 'Indian Peafowl',
    scientificName: 'Pavo cristatus',
    image:
      'https://res.cloudinary.com/dfye11jlj/image/upload/v1793196390/indian-peafowl_sh4ylj.png',
    size: {
      minCm: 100,
      maxCm: 120,
      category: 'large',
    },
    features:
      'A large, striking bird with a blue-green body and an elaborate train of long feathers in males.',
    habitat: [
      'Deciduous forests',
      'Open woodland',
      'Agricultural areas',
      'Bushy areas',
    ],
    range: [
      'India',
      'Pakistan',
      'Nepal',
      'Bhutan',
      'Bangladesh',
      'Sri Lanka',
    ],
    diet: 'Seeds, grains, fruits, insects, and small animals.',
    behavior:
      'Usually forages on the ground and males display their long train during courtship.',
    funFacts: [
      'The Indian Peafowl is the national bird of India.',
      'The male can spread its long train into a spectacular fan during courtship.',
    ],
    conservationStatus: 'Least Concern',
    hints: [
      'This is a large bird commonly associated with the Indian subcontinent.',
      'The male has an elaborate train of long feathers.',
      'It is the national bird of India.',
    ],
  },
  {
    id: 'rose_ringed_parakeet',
    commonName: 'Rose-ringed Parakeet',
    scientificName: 'Psittacula krameri',
    image:
      'https://res.cloudinary.com/dfye11jlj/image/upload/v1793196390/rose-ringed-parakeet_usdpjz.png',
    size: {
      minCm: 40,
      maxCm: 42,
      category: 'large',
    },
    features:
      'A bright green parakeet with a red bill and a long pointed tail; adult males have a distinctive neck ring.',
    habitat: [
      'Open woodland',
      'Agricultural areas',
      'Parks',
      'Gardens',
      'Cities',
    ],
    range: [
      'India',
      'Pakistan',
      'Bangladesh',
      'Sri Lanka',
      'Africa',
    ],
    diet: 'Seeds, fruits, grains, and other plant foods.',
    behavior:
      'Highly social and often seen flying or feeding in noisy flocks.',
    funFacts: [
      'Large flocks can gather around cultivated fruits and grains.',
      'The male develops its characteristic neck ring as it matures.',
    ],
    conservationStatus: 'Least Concern',
    hints: [
      'This is a bright green bird with a long pointed tail.',
      'It has a distinctive red bill.',
      'Adult males develop a characteristic neck ring.',
    ],
  },
  {
    id: 'red_vented_bulbul',
    commonName: 'Red-vented Bulbul',
    scientificName: 'Pycnonotus cafer',
    image:
      'https://res.cloudinary.com/dfye11jlj/image/upload/v1793196391/red-vented-bulbul_jopqnx.jpg',
    size: {
      minCm: 20,
      maxCm: 23,
      category: 'medium',
    },
    features:
      'A dark, medium-sized songbird with a pointed black crest, white rump, and distinctive red patch beneath the tail.',
    habitat: [
      'Gardens',
      'Parks',
      'Agricultural areas',
      'Scrubland',
      'Open woodland',
    ],
    range: [
      'India',
      'South Asia',
      'Southeast Asia',
    ],
    diet: 'Fruits, insects, nectar, flowers, and other plant material.',
    behavior:
      'Often seen in pairs or small groups while foraging in trees and shrubs.',
    funFacts: [
      'Its red vent is often hidden unless the bird moves or flies.',
      'It is commonly seen around towns, gardens, and other human settlements.',
    ],
    conservationStatus: 'Least Concern',
    hints: [
      'This is a medium-sized songbird with a pointed crest.',
      'It has a distinctive red patch beneath the tail.',
      'It is commonly seen around gardens and human settlements.',
    ],
  },
  {
    id: 'purple_sunbird',
    commonName: 'Purple Sunbird',
    scientificName: 'Cinnyris asiaticus',
    image:
      'https://res.cloudinary.com/dfye11jlj/image/upload/v1793196389/purple-sunbird_klughx.jpg',
    size: {
      minCm: 9,
      maxCm: 10,
      category: 'small',
    },
    features:
      'A tiny sunbird with a short curved bill; breeding males have glossy metallic purple-black plumage.',
    habitat: [
      'Gardens',
      'Groves',
      'Cultivated areas',
      'Scrubland',
      'Light woodland',
    ],
    range: [
      'India',
      'Pakistan',
      'Bangladesh',
      'Sri Lanka',
      'Southeast Asia',
    ],
    diet: 'Primarily flower nectar, along with insects and spiders.',
    behavior:
      'Moves actively between flowers and may hover briefly while feeding on nectar.',
    funFacts: [
      'The male can appear almost black until its purple iridescence catches the light.',
      'Its curved bill and brush-tipped tongue help it feed on nectar.',
    ],
    conservationStatus: 'Least Concern',
    hints: [
      'This is a very small bird commonly found around flowers.',
      'It feeds mainly on nectar, along with insects and spiders.',
      'Breeding males have glossy purple-black plumage.',
    ],
  },
  {
    id: 'white_throated_kingfisher',
    commonName: 'White-throated Kingfisher',
    scientificName: 'Halcyon smyrnensis',
    image:
      'https://res.cloudinary.com/dfye11jlj/image/upload/v1793196388/white-throated-kingfisher_n8lhgp.png',
    size: {
      minCm: 27,
      maxCm: 29,
      category: 'medium',
    },
    features:
      'A brightly colored kingfisher with blue wings and back, a chestnut head and body, a white throat, and a red bill.',
    habitat: [
      'Open country',
      'Gardens',
      'Parks',
      'Woodland',
      'Areas near water',
    ],
    range: [
      'India',
      'Pakistan',
      'Bangladesh',
      'Sri Lanka',
      'Southeast Asia',
    ],
    diet: 'Fish, insects, frogs, small reptiles, crustaceans, and other small prey.',
    behavior:
      'Often waits on an exposed perch before rapidly diving or swooping down to capture prey.',
    funFacts: [
      'Despite being a kingfisher, it can hunt successfully away from water.',
      'Its bright white throat contrasts strongly with its chestnut head and blue wings.',
    ],
    conservationStatus: 'Least Concern',
    hints: [
      'This colorful bird has blue wings and a chestnut-colored body.',
      'It has a distinctive white throat and red bill.',
      'Despite its name, it can hunt successfully away from water.',
    ],
  },
  {
    id: 'black_kite',
    commonName: 'Black Kite',
    scientificName: 'Milvus migrans',
    image:
      'https://res.cloudinary.com/dfye11jlj/image/upload/v1793196389/black-kite_iir0gf.png',
    size: {
      minCm: 47,
      maxCm: 60,
      category: 'large',
    },
    features:
      'A medium-to-large brown raptor with broad wings and a distinctive forked tail.',
    habitat: [
      'Cities',
      'Open countryside',
      'Agricultural areas',
      'Wetlands',
      'Areas near human settlements',
    ],
    range: [
      'India',
      'Asia',
      'Africa',
      'Europe',
    ],
    diet: 'Small animals, fish, insects, carrion, and food scraps.',
    behavior:
      'Often soars high in the sky while searching for food and readily scavenges around human settlements.',
    funFacts: [
      'Black Kites are commonly seen soaring over Indian cities.',
      'They can exploit rising air currents to glide with little flapping.',
    ],
    conservationStatus: 'Least Concern',
    hints: [
      'This is a large bird of prey commonly seen soaring overhead.',
      'It has broad wings and a distinctive forked tail.',
      'It is commonly seen around Indian cities and human settlements.',
    ],
  },
  {
    id: 'greater_coucal',
    commonName: 'Greater Coucal',
    scientificName: 'Centropus sinensis',
    image:
      'https://res.cloudinary.com/dfye11jlj/image/upload/v1793196388/greater-coucal_ddotme.jpg',
    size: {
      minCm: 47,
      maxCm: 56,
      category: 'large',
    },
    features:
      'A large, long-tailed bird with a glossy black head and body, chestnut-brown wings, and striking red eyes.',
    habitat: [
      'Jungles',
      'Scrubland',
      'Cultivated areas',
      'Grassland edges',
      'Urban gardens',
    ],
    range: [
      'India',
      'Bangladesh',
      'Sri Lanka',
      'Southeast Asia',
    ],
    diet: 'Insects, caterpillars, snails, eggs, nestlings, fruits, seeds, and small vertebrates.',
    behavior:
      'A mostly terrestrial bird that moves through dense vegetation and walks on the ground while foraging.',
    funFacts: [
      'The Greater Coucal is a cuckoo that raises its own young rather than being a brood parasite.',
      'It is a relatively weak flier and spends much of its time moving through vegetation.',
    ],
    conservationStatus: 'Least Concern',
    hints: [
      'This is a large bird with a long tail and reddish-brown wings.',
      'It often moves through dense vegetation and walks on the ground.',
      'It is a member of the cuckoo family.',
    ],
  },
];

export function getBirdById(birdId: string): Bird | undefined {
  return BIRDS.find((bird) => bird.id === birdId);
}