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
  continents: string[];
  diet: string;
  behavior: string;
  funFacts: string[];
  conservationStatus: string;
  hints: string[];

  difficulty: 'easy' | 'medium' | 'hard';
  aliases: string[];
  active: boolean;
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
    continents: ['Asia'],
    difficulty: 'medium',
    aliases: [],
    active: true,
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
    continents: ['Africa', 'Asia', 'Europe'],
    difficulty: 'easy',
    aliases: [],
    active: true,
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
    continents: ['Africa', 'Asia', 'Europe'],
    difficulty: 'medium',
    aliases: [],
    active: true,
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
    continents: ['Asia'],
    difficulty: 'easy',
    aliases: ['Indian Peacock'],
    active: true,
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
    continents: ['Africa', 'Asia', 'Europe'],
    difficulty: 'medium',
    aliases: ['Ring-necked Parakeet', 'Parrot'],
    active: true,
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
    continents: ['Asia'],
    difficulty: 'easy',
    aliases: [],
    active: true,
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
    continents: ['Asia'],
    difficulty: 'medium',
    aliases: [],
    active: true,
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
    continents: ['Asia'],
    difficulty: 'medium',
    aliases: ['White-breasted Kingfisher'],
    active: true,
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
    continents: ['Africa', 'Asia', 'Europe'],
    difficulty: 'medium',
    aliases: [],
    active: true,
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
    continents: ['Asia'],
    difficulty: 'medium',
    aliases: [],
    active: true,
  },
  {
    id: 'rock_pigeon',
    commonName: 'Rock Pigeon',
    scientificName: 'Columba livia',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1794223946/Rock_pigeon_or_common_pigeon__Columba_livia_xkibss.jpg',

    size: {
      minCm: 33,
      maxCm: 33,
      category: 'medium',
    },

    features:
      'A medium-sized pigeon, usually with a grey-blue body, iridescent green and purple feathers around the neck, two dark wing bars, and reddish feet. Plumage can vary considerably.',

    habitat: [
      'Rocky cliffs',
      'Urban buildings and structures',
      'Farmland',
      'Parks and gardens',
    ],

    range: [
      'India',
      'Pakistan',
      'Afghanistan',
      'Nepal',
    ],

    continents: [
      'Asia',
      'Europe',
      'Africa',
    ],

    diet:
      'Primarily seeds and grains. It also consumes insects and human food scraps when available.',

    behavior:
      'Often feeds on the ground in groups. It nests on rocky ledges, cliffs, and building structures.',

    funFacts: [
      'Both male and female pigeons produce a nutritious substance called crop milk to feed their young.',
      'Domestic and feral pigeons descend from the Rock Dove.',
      'Pigeons have historically been used as homing and messenger birds.',
    ],

    conservationStatus: 'Least Concern',

    hints: [
      'This bird is commonly seen in cities and towns.',
      'It often has grey-blue feathers and two dark bars on its wings.',
      'It belongs to the pigeon and dove family.',
    ],

    difficulty: 'easy',

    aliases: [
      'Rock Dove',
      'Common Pigeon',
      'City Pigeon',
    ],

    active: true,
  },
  {
    id: 'common_myna',
    commonName: 'Common Myna',
    scientificName: 'Acridotheres tristis',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1794224493/Common-Myna_qbqu8c.jpg',

    size: {
      minCm: 23,
      maxCm: 26,
      category: 'medium',
    },

    features:
      'A brown-bodied bird with a black head, bright yellow bill, yellow legs, and a distinctive patch of bare yellow skin behind each eye. It has white patches on its wings that are especially visible during flight.',

    habitat: [
      'Urban areas and towns',
      'Gardens and parks',
      'Farmland and cultivated areas',
      'Open woodland',
    ],

    range: [
      'India',
      'Pakistan',
      'Afghanistan',
      'Nepal',
      'Bangladesh',
      'Sri Lanka',
    ],

    continents: [
      'Asia',
    ],

    diet:
      'An omnivorous bird that eats insects, fruits, seeds, grains, nectar, and food scraps. It often searches for food on the ground.',

    behavior:
      'Often seen walking and hopping on lawns and open ground. It nests in cavities in trees and buildings and can gather in noisy communal roosts.',

    funFacts: [
      'Common Mynas produce a wide variety of calls, including whistles, chirps, and harsh squawks.',
      'They are highly adaptable birds and have established populations in many regions outside their native range.',
      'They are known to defend their nesting territories aggressively.',
    ],

    conservationStatus: 'Least Concern',

    hints: [
      'This bird is commonly seen around homes, gardens, and cities.',
      'It has a brown body, black head, and bright yellow patch behind its eyes.',
      'It belongs to the starling family.',
    ],

    difficulty: 'easy',

    aliases: [
      'Indian Myna',
      'Indian Mynah',
    ],

    active: true,
  },
  {
    id: 'barn_swallow',
    commonName: 'Barn Swallow',
    scientificName: 'Hirundo rustica',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1794224855/European-Swallow_vx688n.jpg',

    size: {
      minCm: 15,
      maxCm: 19,
      category: 'small',
    },

    features:
      'A small, slender bird with glossy dark blue upperparts, a rufous forehead and throat, and pale underparts. Its most distinctive feature is its long, deeply forked tail.',

    habitat: [
      'Open fields and grasslands',
      'Farmland and agricultural areas',
      'Wetlands and areas near water',
      'Villages, towns, and rural buildings',
    ],

    range: [
      'India',
      'Pakistan',
      'Bangladesh',
      'Nepal',
      'Sri Lanka',
    ],

    continents: [
      'Asia',
      'Europe',
      'Africa',
      'North America',
      'South America',
    ],

    diet:
      'Feeds mainly on flying insects such as flies, beetles, moths, and other small insects, which it catches while flying.',

    behavior:
      'An agile flyer that often swoops low over fields and water to catch insects. It commonly builds cup-shaped mud nests on sheltered ledges and human-made structures.',

    funFacts: [
      'Barn Swallows build their nests using mud pellets mixed with grass and other plant fibres.',
      'They can catch insects while flying and even drink water by skimming across its surface.',
      'They are long-distance migrants, with populations travelling between breeding and wintering grounds.',
    ],

    conservationStatus: 'Least Concern',

    hints: [
      'This bird catches most of its food while flying.',
      'It has glossy blue upperparts and a very long, deeply forked tail.',
      'It builds cup-shaped nests using mud, often on buildings and bridges.',
    ],

    difficulty: 'medium',

    aliases: [
      'European Swallow',
    ],

    active: true,
  },
  {
    id: 'house_crow',
    commonName: 'House Crow',
    scientificName: 'Corvus splendens',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1794225898/House_Crow_ra8nvx.jpg',

    size: {
      minCm: 40,
      maxCm: 42,
      category: 'medium',
    },

    features:
      'A slender crow with a glossy black head, wings, and tail. Its nape, neck, and upper breast are grey, forming a distinctive lighter collar. It has a strong black bill and black legs.',

    habitat: [
      'Urban areas and towns',
      'Villages and human settlements',
      'Gardens and parks',
      'Farmland and cultivated areas',
      'Coastal settlements',
    ],

    range: [
      'India',
      'Pakistan',
      'Nepal',
      'Bangladesh',
      'Sri Lanka',
      'Myanmar',
    ],

    continents: [
      'Asia',
      'Africa',
    ],

    diet:
      'An omnivorous scavenger that eats food scraps, insects, fruits, grains, carrion, and occasionally eggs and young birds.',

    behavior:
      'Highly adaptable and often found around people. It is noisy and social, frequently gathering in groups to feed and roost. It builds nests high in trees.',

    funFacts: [
      'House Crows are highly intelligent and can adapt their feeding habits to changing surroundings.',
      'They often gather in large groups at communal roosting sites.',
      'They sometimes work together to mob and drive away larger birds of prey.',
    ],

    conservationStatus: 'Least Concern',

    hints: [
      'This bird is commonly found around human settlements and city streets.',
      'It has a black head and wings with a distinctive grey neck.',
      'It belongs to the crow family, known for intelligence and adaptability.',
    ],

    difficulty: 'easy',

    aliases: [
      'Indian House Crow',
      'Grey-necked Crow',
      'Indian Crow',
    ],

    active: true,
  },
  {
    id: 'scaly_breasted_munia',
    commonName: 'Scaly-breasted Munia',
    scientificName: 'Lonchura punctulata',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1794225894/Scaly-breasted_munia__bfosya.jpg',

    size: {
      minCm: 11,
      maxCm: 12,
      category: 'small',
    },

    features:
      'A tiny finch-like bird with rich chestnut-brown upperparts, a dark brown head, and whitish underparts covered in distinctive dark scale-like markings. It has a short, thick, dark bill.',

    habitat: [
      'Grasslands and open fields',
      'Paddy fields and farmland',
      'Gardens and parks',
      'Scrub and secondary growth',
      'Open woodland edges',
    ],

    range: [
      'India',
      'Pakistan',
      'Nepal',
      'Bhutan',
      'Bangladesh',
      'Sri Lanka',
    ],

    continents: [
      'Asia',
    ],

    diet:
      'Feeds mainly on grass seeds and cultivated grains such as rice. It also eats berries and occasionally small insects.',

    behavior:
      'A highly social bird that usually forages in small or large flocks. It often clings to grass stems and seed heads while feeding and communicates through soft calls and whistles.',

    funFacts: [
      'It is also known as the Spotted Munia and Nutmeg Mannikin.',
      'Both parents help build a large, dome-shaped nest using grass and leaves.',
      'Its strong, conical bill helps it remove and crack seeds from grass heads.',
    ],

    conservationStatus: 'Least Concern',

    hints: [
      'This tiny bird is often seen in groups around grasslands and paddy fields.',
      'Its white belly has distinctive dark markings resembling fish scales.',
      'It belongs to the finch family and feeds mainly on seeds.',
    ],

    difficulty: 'easy',

    aliases: [
      'Spotted Munia',
      'Nutmeg Mannikin',
      'Spice Finch',
    ],

    active: true,
  },
  {
    id: 'little_egret',
    commonName: 'Little Egret',
    scientificName: 'Egretta garzetta',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1794226160/Little-Egret_tvb0zk.jpg',

    size: {
      minCm: 55,
      maxCm: 65,
      category: 'large',
    },

    features:
      'An elegant, slender white waterbird with a long neck, pointed black bill, black legs, and bright yellow feet. During the breeding season, it develops two long, delicate plumes at the back of its head.',

    habitat: [
      'Lakes and ponds',
      'Rivers and canals',
      'Marshes and wetlands',
      'Estuaries and mudflats',
      'Coastal lagoons and mangroves',
    ],

    range: [
      'India',
      'Pakistan',
      'Nepal',
      'Bangladesh',
      'Sri Lanka',
    ],

    continents: [
      'Asia',
      'Europe',
      'Africa',
      'Oceania',
    ],

    diet:
      'Feeds mainly on small fish, frogs, crustaceans, aquatic insects, and other small water-dwelling animals.',

    behavior:
      'Usually hunts in shallow water, walking slowly or standing still before striking quickly at prey. It may shuffle its feet or spread its wings to disturb or locate prey. It often feeds in groups and nests in colonies with other waterbirds.',

    funFacts: [
      'Its bright yellow feet can look like tiny golden slippers against its dark legs.',
      'During the breeding season, it grows two long ornamental plumes on the back of its head.',
      'It sometimes uses its feet and wings to disturb small fish and other prey hiding underwater.',
    ],

    conservationStatus: 'Least Concern',

    hints: [
      'This bird is commonly found around lakes, ponds, rivers, and wetlands.',
      'It has completely white plumage, a black bill, and bright yellow feet.',
      'It is a slender member of the heron and egret family.',
    ],

    difficulty: 'medium',

    aliases: [
      'Lesser Egret',
    ],

    active: true,
  },
  {
    id: 'black_drongo',
    commonName: 'Black Drongo',
    scientificName: 'Dicrurus macrocercus',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1794226521/Black_Drongo_ikpok9.jpg',

    size: {
      minCm: 28,
      maxCm: 31,
      category: 'medium',
    },

    features:
      'A glossy black bird with a slightly bluish sheen and a long, deeply forked tail. It has a strong black bill and a small white spot near the base of the bill. Its eyes are dark brown.',

    habitat: [
      'Open grasslands and fields',
      'Agricultural areas and farmland',
      'Wetlands and marshes',
      'Forest edges and open woodland',
      'Parks and rural settlements',
    ],

    range: [
      'India',
      'Pakistan',
      'Nepal',
      'Bhutan',
      'Bangladesh',
      'Sri Lanka',
      'Myanmar',
    ],

    continents: [
      'Asia',
    ],

    diet:
      'Feeds mainly on insects such as grasshoppers, beetles, termites, wasps, bees, and dragonflies. It catches many insects in flight and also picks them from the ground or vegetation.',

    behavior:
      'Often perches on exposed branches, fences, or electric wires before swooping down to catch insects. It is famously fearless and aggressively chases much larger birds that approach its nesting territory.',

    funFacts: [
      'It is sometimes called the King Crow because of its fearless attacks on much larger birds.',
      'Farmers sometimes provide artificial perches in fields because the bird helps control insect pests.',
      'It has a wide variety of calls, including harsh scolding sounds and clear whistles.',
    ],

    conservationStatus: 'Least Concern',

    hints: [
      'This bird is commonly seen perched on electric wires and exposed branches in open fields.',
      'It has glossy black feathers and a long, deeply forked tail.',
      'It is nicknamed the King Crow because it fearlessly attacks much larger birds.',
    ],

    difficulty: 'medium',

    aliases: [
      'King Crow',
      'Black King Crow',
    ],

    active: true,
  },
  {
    id: 'red_wattled_lapwing',
    commonName: 'Red-wattled Lapwing',
    scientificName: 'Vanellus indicus',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1794226992/Red-wattled-lapwing_pqgccm.jpg',

    size: {
      minCm: 30,
      maxCm: 35,
      category: 'medium',
    },

    features:
      'A distinctive long-legged bird with brown upperparts, a black head, neck, and breast, and white patches along the sides of its face and body. It has a bright red fleshy wattle in front of each eye, a red bill with a black tip, and long yellow legs.',

    habitat: [
      'Wetlands and marshes',
      'Ponds, lakes, and riverbanks',
      'Open grasslands and fields',
      'Agricultural land and ploughed fields',
      'Open areas near human settlements',
    ],

    range: [
      'India',
      'Pakistan',
      'Afghanistan',
      'Nepal',
      'Bhutan',
      'Bangladesh',
      'Sri Lanka',
      'Myanmar',
    ],

    continents: [
      'Asia',
    ],

    diet:
      'Feeds mainly on insects, grubs, worms, molluscs, and other small invertebrates. It may also eat seeds and other plant matter.',

    behavior:
      'Usually seen walking or running in short bursts across open ground while searching for food. It is extremely alert and produces loud alarm calls when disturbed. It nests directly on the ground, often in open areas near water.',

    funFacts: [
      'Its loud alarm call is often described as sounding like "Did we do it?"',
      'It lays its eggs directly on the ground, usually in a shallow scrape among stones or soil.',
      'Both parents help protect their eggs and chicks, sometimes using distraction displays to draw predators away.',
    ],

    conservationStatus: 'Least Concern',

    hints: [
      'This bird is often found walking around open fields and near water bodies.',
      'It has a black chest, brown back, yellow legs, and bright red facial wattles.',
      'Its loud alarm call sounds remarkably like "Did we do it?"',
    ],

    difficulty: 'medium',

    aliases: [
      'Red-wattled Plover',
      'Titeeri',
      'Titodi',
    ],

    active: true,
  },
  {
    id: 'asian_green_bee_eater',
    commonName: 'Asian Green Bee-eater',
    scientificName: 'Merops orientalis',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1794227212/Asian_green_bee-eater_kuh6dp.jpg',

    size: {
      minCm: 16,
      maxCm: 18,
      category: 'small',
    },

    features:
      'A slender, bright green bird with a golden-rufous crown, bluish chin and throat, a narrow black stripe through the eye, and a slender slightly curved black bill. Its two elongated central tail feathers form distinctive streamers.',

    habitat: [
      'Open grasslands and fields',
      'Dry scrubland and open woodland',
      'Farmland and plantations',
      'Rural gardens and parks',
      'Sandy riverbanks and dry riverbeds',
    ],

    range: [
      'India',
      'Pakistan',
      'Afghanistan',
      'Nepal',
      'Bangladesh',
      'Bhutan',
      'Sri Lanka',
      'Myanmar',
    ],

    continents: [
      'Asia',
      'Africa',
    ],

    diet:
      'Feeds mainly on flying insects, including bees, wasps, ants, grasshoppers, beetles, dragonflies, and flies.',

    behavior:
      'Usually perches on exposed branches, bushes, or wires while watching for flying insects. It launches into the air to catch prey and often returns to its perch, where it beats insects against the branch to remove stings and break their exoskeletons. It nests in tunnels excavated in sandy banks.',

    funFacts: [
      'It removes the stings of bees and wasps by repeatedly striking them against its perch before eating them.',
      'Its two elongated central tail feathers form distinctive streamers that make it easy to recognise.',
      'It excavates long nesting tunnels in sandy or earthen banks.',
    ],

    conservationStatus: 'Least Concern',

    hints: [
      'This bird often sits on exposed wires and branches while watching for insects.',
      'It has bright green feathers, a blue throat, and two long tail streamers.',
      'It catches bees and wasps in flight and belongs to the bee-eater family.',
    ],

    difficulty: 'medium',

    aliases: [
      'Green Bee-eater',
      'Little Green Bee-eater',
      'Small Bee-eater',
    ],

    active: true,
  },
  {
    id: 'common_tailorbird',
    commonName: 'Common Tailorbird',
    scientificName: 'Orthotomus sutorius',
    image: 'https://res.cloudinary.com/dfye11jlj/image/upload/v1794227453/Common-tailorbird_cg0aaa.jpg',

    size: {
      minCm: 10,
      maxCm: 14,
      category: 'small',
    },

    features:
      'A tiny, active bird with olive-green upperparts, pale whitish underparts, and a distinctive rufous forehead and crown. It has a slender pointed bill and a long tail that it often holds upright.',

    habitat: [
      'Gardens and parks',
      'Shrublands and bushes',
      'Forest edges',
      'Open woodland',
      'Farmland and cultivated areas',
      'Urban green spaces',
    ],

    range: [
      'India',
      'Pakistan',
      'Nepal',
      'Bhutan',
      'Bangladesh',
      'Sri Lanka',
      'Myanmar',
    ],

    continents: [
      'Asia',
    ],

    diet:
      'Feeds mainly on tiny insects, insect eggs, and larvae. It also consumes small fruits, berries, seeds, and flower nectar.',

    behavior:
      'A restless and active bird that moves quickly through bushes and low vegetation, searching for insects. Usually seen alone or in pairs. It builds its nest by piercing the edges of leaves and stitching them together with plant fibres or spider silk.',

    funFacts: [
      'It gets its name from its unusual nesting technique of stitching leaves together using its bill.',
      'Its nest is often hidden inside a folded or joined leaf, making it difficult to spot.',
      'It was immortalised as Darzee, the tailorbird, in Rudyard Kipling’s The Jungle Book.',
    ],

    conservationStatus: 'Least Concern',

    hints: [
      'This tiny bird is commonly found hopping around bushes and garden plants.',
      'It has olive-green feathers, a rusty-red forehead, and an upright tail.',
      'It is famous for stitching leaves together to make its nest.',
    ],

    difficulty: 'easy',

    aliases: [
      'Long-tailed Tailorbird',
      'Toontooni',
    ],

    active: true,
  },
];

export function getBirdById(birdId: string): Bird | undefined {
  return BIRDS.find((bird) => bird.id === birdId);
}