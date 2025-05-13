
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  participationHistory: ChallengeParticipation[];
  rewardsEarned: Reward[];
  followedBrands: Brand[];
  sharingStatistics: {
    totalShares: number;
    challengesShared: number;
  };
}

export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  description: string;
  socialLinks: { platform: string; url: string }[];
  followerCount: number;
  challenges: Challenge[]; // Can be paginated or limited in API responses
  primaryColor?: string; // for AI preview
  secondaryColor?: string; // for AI preview
  accentColor?: string; // for AI preview
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  rules: string;
  brand: Brand;
  imageUrl?: string;
  startDate: string; // ISO Date string
  endDate: string; // ISO Date string
  prizeInfo: string;
  submissionType: 'photo' | 'text' | 'link' | 'audio';
  participantsCount: number;
  submissions: Submission[]; // Can be paginated or limited
  status: 'active' | 'upcoming' | 'ended' | 'draft';
  winnerSelectionMethod: 'communityVote' | 'creatorSelected';
}

export interface ChallengeParticipation {
  challengeId: string;
  challengeTitle: string;
  submissionDate: string; // ISO Date string
  status: 'submitted' | 'pending' | 'winner' | 'participated';
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  challengeId?: string; // Optional: link to specific challenge
  dateEarned: string; // ISO Date string
  isClaimed: boolean;
  claimDetails?: string; // Instructions or details about the reward
}

export interface Submission {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  contentUrl?: string; // For photo, link, audio
  textContent?: string; // For text submissions
  submissionDate: string; // ISO Date string
  votes?: number;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  score: number; // Could be votes, shares, etc.
  rank: number;
}

export type SocialPlatform = 'facebook' | 'twitter' | 'instagram';

