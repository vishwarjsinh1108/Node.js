require('dotenv').config();
const connectDB = require('./config/database');
const Movie = require('./models/Movie');

/**
 * Sample movies to seed into the database.
 * Poster images use trusted https URLs (Unsplash) to ensure they load.
 */
const sampleMovies = [
  {
    title: 'The Silent Horizon',
    description: 'An astronaut copes with isolation and the mysteries beyond the stars.',
    genre: 'Sci-Fi',
    releaseDate: '2021-06-18',
    duration: 118,
    rating: 8.2,
    posterImage:
      'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=60',
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    title: 'Midnight Runaway',
    description: 'A fast-paced thriller about a courier on the run with a secret package.',
    genre: 'Thriller',
    releaseDate: '2019-10-11',
    duration: 105,
    rating: 7.4,
    posterImage:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Laughing Streets',
    description: 'A comedy that follows three friends trying to open a food truck.',
    genre: 'Comedy',
    releaseDate: '2020-05-22',
    duration: 95,
    rating: 6.8,
    posterImage:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Hearts Over Tokyo',
    description: 'A touching romance set against the neon-lit streets of Tokyo.',
    genre: 'Romance',
    releaseDate: '2018-02-14',
    duration: 125,
    rating: 7.9,
    posterImage:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Forest of Whispers',
    description: 'A fantasy adventure where a young explorer finds an enchanted forest.',
    genre: 'Fantasy',
    releaseDate: '2022-11-02',
    duration: 132,
    rating: 8.5,
    posterImage:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'The Last Documentary',
    description: 'An intimate documentary about preserving endangered cultures.',
    genre: 'Documentary',
    releaseDate: '2017-09-10',
    duration: 82,
    rating: 8.0,
    posterImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Animated Dreams',
    description: 'A family-friendly animated film about toys that come alive at night.',
    genre: 'Animation',
    releaseDate: '2016-07-08',
    duration: 89,
    rating: 7.1,
    posterImage:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Documented Life',
    description: 'A dramatic exploration of modern family life and resilience.',
    genre: 'Drama',
    releaseDate: '2023-03-19',
    duration: 140,
    rating: 8.7,
    posterImage:
      'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=60',
  },
];

const seed = async () => {
  try {
    await connectDB();

    const count = await Movie.countDocuments();
    if (count >= sampleMovies.length) {
      console.log('🟡 Movies collection already seeded. Skipping.');
      process.exit(0);
    }

    await Movie.insertMany(sampleMovies);
    console.log('✅ Seeded movies successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding movies:', error);
    process.exit(1);
  }
};

seed();
