import { getRewardById, getRewardsByUserId } from '@/data/mockData'; // Assuming getRewardsByUserId might give all rewards for static params
import { ClaimRewardClient } from '@/components/rewards/ClaimRewardClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Reward } from '@/lib/types';


interface ClaimRewardPageProps {
  params: { rewardId: string };
}

export async function generateMetadata({ params }: ClaimRewardPageProps): Promise<Metadata> {
  const reward = await getRewardById(params.rewardId);
  if (!reward) {
    return {
      title: 'Reward Not Found | Berhiem',
    };
  }
  return {
    title: `Claim Reward: ${reward.name} | Berhiem`,
    description: `Claim your earned reward: ${reward.description}.`,
  };
}


export default async function ClaimRewardPage({ params }: ClaimRewardPageProps) {
  const reward = await getRewardById(params.rewardId);

  if (!reward) {
    notFound();
  }

  return (
    <ClaimRewardClient reward={reward} />
  );
}

export async function generateStaticParams() {
  // Fetch all possible reward IDs. 
  // For simplicity, let's mock this with a few known reward IDs from our mock data.
  // In a real app, you'd fetch all distinct reward IDs from your database.
  // This is a bit tricky with current mockData structure. Let's assume we have access to `allMockRewards` from mockData.
  // We'll use specific IDs that we know exist.
  const mockRewardIds = ['reward1', 'reward2', 'reward3', 'reward4']; 
  
  return mockRewardIds.map((id) => ({
    rewardId: id,
  }));
}
