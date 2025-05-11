import { getChallengeById, getLeaderboardByChallengeId, getSubmissionsByChallengeId } from '@/data/mockData';
import { ChallengeDetailClient } from '@/components/challenge/ChallengeDetailClient';
import { notFound } from 'next/navigation';

interface ChallengePageProps {
  params: { id: string };
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const challenge = await getChallengeById(params.id);

  if (!challenge) {
    notFound();
  }

  const leaderboardEntries = await getLeaderboardByChallengeId(params.id);
  const submissions = await getSubmissionsByChallengeId(params.id);

  return (
    <ChallengeDetailClient 
      challenge={challenge} 
      leaderboardEntries={leaderboardEntries}
      submissions={submissions}
    />
  );
}

export async function generateStaticParams() {
  // In a real app, fetch all challenge IDs
  // For now, using mock data IDs
  const challenges = [{ id: 'challenge1' }, { id: 'challenge2' }, { id: 'challenge3' }, { id: 'challenge4' }];
  return challenges.map((challenge) => ({
    id: challenge.id,
  }));
}
