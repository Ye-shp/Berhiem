import { ChallengeCard } from '@/components/challenge/ChallengeCard';
import { getChallenges, getUserById } from '@/data/mockData';
import type { Challenge } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

export default async function HomePage() {
  const allChallenges = await getChallenges();
  // Simulate a logged-in user and their followed brands
  const currentUser = await getUserById('user1');
  const followedBrandIds = currentUser?.followedBrands.map(b => b.id) || [];

  const followedChallenges = allChallenges.filter(c => followedBrandIds.includes(c.brand.id) && c.status !== 'ended');
  const popularChallenges = allChallenges
    .filter(c => !followedBrandIds.includes(c.brand.id) && c.status === 'active')
    .sort((a, b) => b.participantsCount - a.participantsCount)
    .slice(0, 6); // Show top 6 popular
  
  // Placeholder for "friends participating" - could be complex to mock simply
  const friendsChallenges: Challenge[] = []; 

  return (
    <div className="space-y-12">
      {followedChallenges.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-primary">
            From Brands You Follow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {followedChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} isPrioritized />
            ))}
          </div>
        </section>
      )}

      {friendsChallenges.length > 0 && (
         <>
          <Separator className="my-8 bg-border/50" />
          <section>
            <h2 className="text-3xl font-bold mb-6">Friends Are Joining</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {friendsChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </section>
        </>
      )}
      
      {popularChallenges.length > 0 && (
        <>
          {followedChallenges.length > 0 && <Separator className="my-8 bg-border/50" />}
          <section>
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-accent">
              Popular Challenges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </section>
        </>
      )}

      {followedChallenges.length === 0 && popularChallenges.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-muted-foreground">No active challenges right now.</h2>
          <p className="text-muted-foreground mt-2">Check back soon or explore brands!</p>
        </div>
      )}
    </div>
  );
}
