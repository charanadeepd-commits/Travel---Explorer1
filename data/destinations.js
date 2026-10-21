export const CATEGORIES = ['All', 'Beaches', 'Mountains', 'Heritage', 'Adventure'];

export const DESTINATIONS = [
  {
    id: '1',
    name: 'Goa',
    location: 'Goa, India',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    description: 'Goa is known for its beautiful beaches, vibrant nightlife, Portuguese heritage, and delicious seafood.',
    bestTimeToVisit: 'November to February',
    attractions: [
      { name: 'Baga Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80' },
      { name: 'Fort Aguada', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400&q=80' },
      { name: 'Dudhsagar Falls', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=400&q=80' },
    ],
  },
  {
    id: '2',
    name: 'Manali',
    location: 'Himachal Pradesh, India',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    description: 'A high-altitude Himalayan resort town famous for backpacking, trekking, and snow-capped peaks.',
    bestTimeToVisit: 'October to June',
    attractions: [
      { name: 'Solang Valley', image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400&q=80' },
      { name: 'Rohtang Pass', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80' },
      { name: 'Hadimba Temple', image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=400&q=80' },
    ],
  },
  {
    id: '3',
    name: 'Jaipur',
    location: 'Rajasthan, India',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    description: 'The Pink City of India, known for its majestic palaces, grand forts, and colorful bazaars.',
    bestTimeToVisit: 'October to March',
    attractions: [
      { name: 'Hawa Mahal', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80' },
      { name: 'Amber Fort', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80' },
      { name: 'City Palace', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=400&q=80' },
    ],
  },
  {
    id: '4',
    name: 'Rishikesh',
    location: 'Uttarakhand, India',
    category: 'Adventure',
    image:  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    description: 'The adventure capital of India, famous for white-water river rafting, bungee jumping, and yoga.',
    bestTimeToVisit: 'September to November & March to May',
    attractions: [
      { name: 'Laxman Jhula', image: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=400&q=80' },
      { name: 'Shivpuri Rafting', image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=400&q=80' },
    ],
  },
];