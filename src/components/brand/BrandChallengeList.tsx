import type { Challenge } from '@/lib/types';
import { ChallengeCard } from '@/components/challenge/ChallengeCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarCheck, History } from 'lucide-react';

interface BrandChallengeListProps {
  challenges: Challenge[];
}

export function BrandChallengeList({ challenges }: BrandChallengeListProps) {
  const activeChallenges = challenges.filter(c => c.status === 'active' || c.status === 'upcoming');
  const pastChallenges = challenges.filter(c => c.status === 'ended');

  return (
    <Tabs defaultValue="active" className="w-full mt-8">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="active" className="text-base"><CalendarCheck className="mr-2 h-5 w-5"/>Current Challenges</TabsTrigger>
        <TabsTrigger value="past" className="text-base"><History className="mr-2 h-5 w-5"/>Past Challenges</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        {activeChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No active or upcoming challenges from this brand right now.</p>
        )}
      </TabsContent>
      <TabsContent value="past">
        {pastChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">This brand has no past challenges recorded.</p>
        )}
      </TabsContent>
    </Tabs>
  );
}
