
'use client';

import type { Reward } from '@/lib/types';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Gift, Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';

interface ClaimRewardClientProps {
  reward: Reward;
}

export function ClaimRewardClient({ reward: initialReward }: ClaimRewardClientProps) {
  const [reward, setReward] = useState<Reward>(initialReward);
  const [isClaiming, setIsClaiming] = useState(false);
  const { toast } = useToast();

  // Sync initialReward prop with state
  useEffect(() => {
    setReward(initialReward);
  }, [initialReward]);


  const handleClaimReward = async () => {
    setIsClaiming(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would make an API call here to mark the reward as claimed.
    // For now, we just update the local state and show a toast.
    setReward(prev => ({ ...prev, isClaimed: true }));
    setIsClaiming(false);
    toast({
      title: 'Reward Claimed!',
      description: `${reward.name} has been successfully claimed. (Mock Action)`,
      variant: 'default',
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-8">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <Gift className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">Claim Your Reward</CardTitle>
          <CardDescription>Congratulations on earning: <span className="font-semibold text-primary">{reward.name}</span></CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-1">Reward Details:</h3>
            <p className="text-muted-foreground">{reward.description}</p>
          </div>
          
          {reward.claimDetails && (
            <div>
              <h3 className="font-semibold text-lg mb-1">How to Claim:</h3>
              <p className="text-muted-foreground">{reward.claimDetails}</p>
            </div>
          )}

          {reward.isClaimed ? (
            <Alert variant="default" className="bg-green-500/10 border-green-500/30 text-green-300">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <AlertTitle>Already Claimed</AlertTitle>
              <AlertDescription>
                This reward has already been claimed on {new Date(reward.dateEarned).toLocaleDateString()}.
              </AlertDescription>
            </Alert>
          ) : (
             <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Ready to Claim?</AlertTitle>
                <AlertDescription>
                  Once claimed, this action might be irreversible depending on the reward type. Ensure your details are up to date.
                </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {!reward.isClaimed && (
            <Button
              onClick={handleClaimReward}
              disabled={isClaiming || reward.isClaimed}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
            >
              {isClaiming ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Gift className="mr-2 h-5 w-5" /> Claim Reward Now
                </>
              )}
            </Button>
          )}
          <Button variant="outline" asChild className="w-full">
            <Link href={`/profile/${reward.userId || 'user1'}`}>Back to Profile</Link> {/* Assuming reward has userId or default */}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
