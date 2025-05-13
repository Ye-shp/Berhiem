import type { Reward } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Gift, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RewardsListProps {
  rewards: Reward[];
}

export function RewardsList({ rewards }: RewardsListProps) {
  if (!rewards || rewards.length === 0) {
    return <p className="text-muted-foreground">No rewards earned yet. Keep participating!</p>;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Rewards Earned</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="p-4 rounded-lg border bg-card-foreground/5 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-md ${reward.isClaimed ? 'bg-green-500/20' : 'bg-gradient-to-r from-[var(--gradient-accent-from)] to-[var(--gradient-accent-to)]'}`}>
                    {reward.isClaimed ? <CheckCircle className="h-6 w-6 text-green-400" /> : <Award className="h-6 w-6 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{reward.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                    {reward.challengeId && (
                      <Link href={`/challenge/${reward.challengeId}`} className="text-xs text-primary hover:underline mt-1 block">
                        From challenge: {reward.challengeId}
                      </Link>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Earned: {new Date(reward.dateEarned).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-col items-start sm:items-end">
                  {reward.isClaimed ? (
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      <CheckCircle className="mr-1 h-3.5 w-3.5" />
                      Claimed
                    </Badge>
                  ) : (
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href={`/rewards/claim/${reward.id}`}>
                        Claim Reward <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                   {reward.claimDetails && !reward.isClaimed && (
                     <p className="text-xs text-muted-foreground mt-2 text-left sm:text-right max-w-xs">{reward.claimDetails}</p>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
