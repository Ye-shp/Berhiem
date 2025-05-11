import type { Reward } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Gift } from 'lucide-react';
import Link from 'next/link';

interface RewardsListProps {
  rewards: Reward[];
}

export function RewardsList({ rewards }: RewardsListProps) {
  if (!rewards || rewards.length === 0) {
    return <p className="text-muted-foreground">No rewards earned yet. Keep participating!</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards Earned</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="p-4 rounded-md border bg-gradient-to-br from-accent/10 to-primary/10 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gradient-to-r from-[var(--gradient-accent-from)] to-[var(--gradient-accent-to)] rounded-md">
                   <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{reward.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                  {reward.challengeId && (
                    <Link href={`/challenge/${reward.challengeId}`} className="text-xs text-primary hover:underline mt-1 block">
                      From challenge
                    </Link>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Earned: {new Date(reward.dateEarned).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
