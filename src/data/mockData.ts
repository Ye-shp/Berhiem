import type { Brand, Challenge, User, Submission, LeaderboardEntry, Reward } from '@/lib/types';

const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alice Wonderland',
    avatarUrl: 'https://picsum.photos/seed/user1/200/200',
    bio: 'Curiouser and curiouser! Lover of tea parties and challenging adventures.',
    participationHistory: [
      { challengeId: 'challenge1', challengeTitle: 'Creative Photo Contest', submissionDate: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'winner' },
      { challengeId: 'challenge3', challengeTitle: 'Eco Innovators Hub', submissionDate: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'participated' },
    ],
    rewardsEarned: [
      { 
        id: 'reward1', 
        name: 'Grand Prize Winner Trophy', 
        description: 'For winning the Creative Photo Contest', 
        dateEarned: new Date(Date.now() - 86400000 * 4).toISOString(), 
        challengeId: 'challenge1',
        isClaimed: false,
        claimDetails: 'Your trophy will be shipped to your registered address. Please confirm your address within 7 days.'
      },
    ],
    followedBrands: [], // Will be populated later
    sharingStatistics: { totalShares: 25, challengesShared: 3 },
  },
  {
    id: 'user2',
    name: 'Bob The Builder',
    avatarUrl: 'https://picsum.photos/seed/user2/200/200',
    bio: 'Can we fix it? Yes, we can! Building my way through challenges.',
    participationHistory: [
      { challengeId: 'challenge2', challengeTitle: 'Tech Startup Pitch', submissionDate: new Date(Date.now() - 86400000 * 10).toISOString(), status: 'participated' },
    ],
    rewardsEarned: [
      {
        id: 'reward4',
        name: 'Participation Certificate',
        description: 'For participating in the Tech Startup Pitch',
        dateEarned: new Date(Date.now() - 86400000 * 9).toISOString(),
        challengeId: 'challenge2',
        isClaimed: true,
        claimDetails: 'Certificate has been emailed to you.'
      }
    ],
    followedBrands: [], // Will be populated later
    sharingStatistics: { totalShares: 10, challengesShared: 1 },
  },
];

const mockBrands: Brand[] = [
  {
    id: 'brand1',
    name: 'PixelPerfect Inc.',
    logoUrl: 'https://picsum.photos/seed/brand1logo/100/100',
    description: 'Crafting digital experiences that inspire and engage. Join our creative community!',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/pixelperfect' },
      { platform: 'instagram', url: 'https://instagram.com/pixelperfect' },
    ],
    followerCount: 12500,
    challenges: [], // Will be populated later
    primaryColor: '#F5F500', // Yellow
    secondaryColor: '#000000', // Black
    accentColor: '#FF3A00', // Red
  },
  {
    id: 'brand2',
    name: 'Innovate Solutions',
    logoUrl: 'https://picsum.photos/seed/brand2logo/100/100',
    description: 'Pioneering the future of technology. We empower innovators and thinkers.',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/company/innovate-solutions' },
    ],
    followerCount: 78000,
    challenges: [], // Will be populated later
    primaryColor: '#007BFF', // Blue
    secondaryColor: '#FFFFFF', // White
    accentColor: '#28A745', // Green
  },
  {
    id: 'brand3',
    name: 'Eco Warriors United',
    logoUrl: 'https://picsum.photos/seed/brand3logo/100/100',
    description: 'Dedicated to a sustainable future. Join our movement for a greener planet.',
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/ecowarriors' },
    ],
    followerCount: 5500,
    challenges: [], // Will be populated later
    primaryColor: '#28A745', // Green
    secondaryColor: '#F8F9FA', // Light Gray
    accentColor: '#FFC107', // Amber
  },
];

mockUsers[0].followedBrands = [mockBrands[0], mockBrands[2]];
mockUsers[1].followedBrands = [mockBrands[1]];

const mockSubmissions: Submission[] = [
  { id: 'sub1', userId: 'user1', userName: 'Alice Wonderland', userAvatarUrl: 'https://picsum.photos/seed/user1/50/50', contentUrl: 'https://picsum.photos/seed/sub1img/600/400', submissionDate: new Date(Date.now() - 86400000 * 6).toISOString(), votes: 152 },
  { id: 'sub2', userId: 'user2', userName: 'Bob The Builder', userAvatarUrl: 'https://picsum.photos/seed/user2/50/50', textContent: 'My innovative pitch for a sustainable future.', submissionDate: new Date(Date.now() - 86400000 * 11).toISOString(), votes: 98 },
  { id: 'sub3', userId: 'user1', userName: 'Alice Wonderland', userAvatarUrl: 'https://picsum.photos/seed/user1/50/50', contentUrl: 'https://picsum.photos/seed/sub3img/600/400', submissionDate: new Date(Date.now() - 86400000 * 3).toISOString(), votes: 205 },
];

const mockChallenges: Challenge[] = [
  {
    id: 'challenge1',
    title: 'Creative Photo Contest: Urban Jungle',
    description: 'Capture the essence of nature thriving in urban environments. Show us your unique perspective!',
    rules: '1. Original photos only. 2. Max 3 submissions. 3. Hashtag #UrbanJungleChallenge.',
    brand: mockBrands[0],
    imageUrl: 'https://picsum.photos/seed/challenge1img/800/400',
    startDate: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    endDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    prizeInfo: 'Winner gets a $500 gear voucher and feature on our page!',
    submissionType: 'photo',
    participantsCount: 120,
    submissions: [mockSubmissions[0]],
    status: 'active',
    winnerSelectionMethod: 'communityVote',
  },
  {
    id: 'challenge2',
    title: 'Tech Startup Pitch Competition',
    description: 'Pitch your groundbreaking tech idea to a panel of experts. Change the world!',
    rules: '1. 5-min video pitch. 2. Detailed business plan. 3. Focus on innovation.',
    brand: mockBrands[1],
    imageUrl: 'https://picsum.photos/seed/challenge2img/800/400',
    startDate: new Date(Date.now() - 86400000 * 20).toISOString(), // 20 days ago
    endDate: new Date(Date.now() - 86400000 * 5).toISOString(), // Ended 5 days ago
    prizeInfo: 'Top 3 startups get seed funding and mentorship.',
    submissionType: 'link', // Link to video
    participantsCount: 75,
    submissions: [mockSubmissions[1]],
    status: 'ended',
    winnerSelectionMethod: 'creatorSelected',
  },
  {
    id: 'challenge3',
    title: 'Eco Innovators Hub: Green Solutions',
    description: 'Submit your innovative solutions for a sustainable future. From waste reduction to renewable energy.',
    rules: '1. Detailed project proposal. 2. Focus on impact and feasibility. 3. Team submissions welcome.',
    brand: mockBrands[2],
    imageUrl: 'https://picsum.photos/seed/challenge3img/800/400',
    startDate: new Date(Date.now() + 86400000 * 2).toISOString(), // Starts in 2 days
    endDate: new Date(Date.now() + 86400000 * 15).toISOString(), // Ends in 15 days
    prizeInfo: '$1000 grant for the most impactful project.',
    submissionType: 'text', // Proposal document
    participantsCount: 0,
    submissions: [mockSubmissions[2]],
    status: 'upcoming',
    winnerSelectionMethod: 'creatorSelected',
  },
   {
    id: 'challenge4',
    title: 'Soundscape Challenge: City Rhythms',
    description: 'Create an audio piece that captures the unique soundscape of your city.',
    rules: '1. Max 3 minutes. 2. Original audio. 3. MP3 format.',
    brand: mockBrands[0],
    imageUrl: 'https://picsum.photos/seed/challenge4img/800/400',
    startDate: new Date(Date.now() - 86400000 * 3).toISOString(), 
    endDate: new Date(Date.now() + 86400000 * 12).toISOString(), 
    prizeInfo: 'High-quality headphones and software license.',
    submissionType: 'audio',
    participantsCount: 45,
    submissions: [],
    status: 'active',
    winnerSelectionMethod: 'communityVote',
  },
];

mockBrands[0].challenges = [mockChallenges[0], mockChallenges[3]];
mockBrands[1].challenges = [mockChallenges[1]];
mockBrands[2].challenges = [mockChallenges[2]];


const mockLeaderboard: LeaderboardEntry[] = [
  { userId: 'user1', userName: 'Alice Wonderland', userAvatarUrl: 'https://picsum.photos/seed/user1/50/50', score: 205, rank: 1 },
  { userId: 'userExternal1', userName: 'Charlie Chaplin', userAvatarUrl: 'https://picsum.photos/seed/userExt1/50/50', score: 180, rank: 2 },
  { userId: 'user2', userName: 'Bob The Builder', userAvatarUrl: 'https://picsum.photos/seed/user2/50/50', score: 98, rank: 3 },
  { userId: 'userExternal2', userName: 'Diana Prince', userAvatarUrl: 'https://picsum.photos/seed/userExt2/50/50', score: 75, rank: 4 },
];

const allMockRewards: Reward[] = [
    ...mockUsers.flatMap(u => u.rewardsEarned),
    { 
      id: 'reward2', 
      name: 'Early Bird Participant Badge', 
      description: 'For joining challenges early!', 
      dateEarned: new Date(Date.now() - 86400000 * 20).toISOString(),
      isClaimed: true,
      claimDetails: 'This badge has been automatically added to your profile.'
    },
    { 
      id: 'reward3', 
      name: 'Top Sharer Bonus - $25 Gift Card', 
      description: 'For exceptional sharing efforts in Q1.', 
      dateEarned: new Date(Date.now() - 86400000 * 1).toISOString(),
      isClaimed: false,
      claimDetails: 'Click "Claim Reward" to receive your $25 Amazon gift card code via email.'
    },
];

export const getChallenges = async (): Promise<Challenge[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockChallenges), 300));
};

export const getChallengeById = async (id: string): Promise<Challenge | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(mockChallenges.find(c => c.id === id)), 300));
};

export const getBrands = async (): Promise<Brand[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockBrands), 300));
};

export const getBrandById = async (id: string): Promise<Brand | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(mockBrands.find(b => b.id === id)), 300));
};

export const getUsers = async (): Promise<User[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockUsers), 300));
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  return new Promise(resolve => setTimeout(() => {
    const user = mockUsers.find(u => u.id === id);
    if (user) {
      // Ensure user rewards are part of the allMockRewards pool for consistency if needed elsewhere
      // or simply return the user as is if rewards are self-contained.
      // For this setup, user.rewardsEarned is already populated.
    }
    resolve(user);
  }, 300));
};

export const getSubmissionsByChallengeId = async (challengeId: string): Promise<Submission[]> => {
  return new Promise(resolve => setTimeout(() => {
    const challenge = mockChallenges.find(c => c.id === challengeId);
    resolve(challenge ? challenge.submissions : []);
  }, 300));
};

export const getLeaderboardByChallengeId = async (challengeId: string): Promise<LeaderboardEntry[]> => {
  const challenge = await getChallengeById(challengeId);
  if (challenge && (challenge.status === 'active' || challenge.status === 'ended')) {
    return new Promise(resolve => setTimeout(() => resolve(mockLeaderboard), 300));
  }
  return new Promise(resolve => setTimeout(() => resolve([]), 300));
};

export const getRewardsByUserId = async (userId: string): Promise<Reward[]> => {
    const user = await getUserById(userId);
    if (user) {
        return new Promise(resolve => setTimeout(() => resolve(user.rewardsEarned), 300));
    }
    return new Promise(resolve => setTimeout(() => resolve([]), 300));
};

export const getRewardById = async (id: string): Promise<Reward | undefined> => {
  return new Promise(resolve => setTimeout(() => {
    // Search in allMockRewards which consolidates rewards from users and general ones.
    const reward = allMockRewards.find(r => r.id === id);
    resolve(reward);
  }, 300));
};

// Default brand name for AI share preview, can be overridden in the form.
export const DEFAULT_BRAND_NAME_FOR_AI = "Berhiem";
