import { getUserById, getRewardsByUserId } from '@/data/mockData';
import { UserProfile } from '@/components/user/UserProfile';
import { ParticipationHistory } from '@/components/user/ParticipationHistory';
import { RewardsList } from '@/components/user/RewardsList';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

interface UserProfilePageProps {
  params: { userId: string };
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const user = await getUserById(params.userId);

  if (!user) {
    notFound();
  }
  
  // Rewards might be part of user object or fetched separately
  // For this mock, user.rewardsEarned is already populated in mockData
  // const rewards = await getRewardsByUserId(params.userId);


  return (
    <div className="space-y-8">
      <UserProfile user={user} />
      <Separator className="my-8 bg-border/50" />
      <ParticipationHistory history={user.participationHistory} />
      <Separator className="my-8 bg-border/50" />
      <RewardsList rewards={user.rewardsEarned} />
    </div>
  );
}

export async function generateStaticParams() {
  // In a real app, fetch all user IDs or handle dynamically
  const users = [{ id: 'user1' }, { id: 'user2' }];
  return users.map((user) => ({
    userId: user.id,
  }));
}
