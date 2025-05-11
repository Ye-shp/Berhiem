"use client";

import type { Challenge, LeaderboardEntry, Submission } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaderboard } from './Leaderboard';
import { SubmissionGallery } from './SubmissionGallery';
import { CalendarDays, Info, ListOrdered, Trophy, Users, Share2, Edit3, Image as ImageIcon, Link as LinkIcon, Mic, FileText, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


interface ChallengeDetailClientProps {
  challenge: Challenge;
  leaderboardEntries: LeaderboardEntry[];
  submissions: Submission[];
}

export function ChallengeDetailClient({ challenge, leaderboardEntries, submissions }: ChallengeDetailClientProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date(challenge.endDate);
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("Challenge Ended");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft(); // Initial call
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [challenge.endDate]);

  const submissionTypeIcons = {
    photo: <ImageIcon className="h-5 w-5 mr-2 text-primary" />,
    text: <FileText className="h-5 w-5 mr-2 text-primary" />,
    link: <LinkIcon className="h-5 w-5 mr-2 text-primary" />,
    audio: <Mic className="h-5 w-5 mr-2 text-primary" />,
  };

  const handleSubmitEntry = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to submit an entry.",
        variant: "destructive",
        action: <Button onClick={() => router.push(`/login?redirect=/challenge/${challenge.id}`)}>Login</Button>
      });
      return;
    }
    // TODO: Implement actual submission logic (e.g., open a modal, navigate to a submission form)
    toast({
      title: "Submission In Progress (Not Implemented)",
      description: `You are logged in as ${user.email}. Actual submission form is needed here.`,
    });
    console.log("User attempting to submit entry:", user.uid, "for challenge:", challenge.id);
  };

  const canSubmit = challenge.status === 'active' && timeLeft !== "Challenge Ended";

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-xl">
        {challenge.imageUrl && (
          <div className="relative h-64 md:h-96 w-full">
            <Image src={challenge.imageUrl} alt={challenge.title} layout="fill" objectFit="cover" priority />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white shadow-md">{challenge.title}</h1>
              <p className="text-lg text-primary mt-1">by {challenge.brand.name}</p>
            </div>
          </div>
        )}
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center space-x-3 p-4 bg-card-foreground/5 rounded-lg">
              <CalendarDays className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Time Remaining</p>
                <p className={`text-lg font-semibold ${timeLeft === "Challenge Ended" ? "text-red-500" : "text-accent"}`}>{timeLeft}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-card-foreground/5 rounded-lg">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="text-lg font-semibold">{challenge.participantsCount}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-card-foreground/5 rounded-lg">
               {submissionTypeIcons[challenge.submissionType]}
              <div>
                <p className="text-sm text-muted-foreground">Submission Type</p>
                <p className="text-lg font-semibold capitalize">{challenge.submissionType}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8">
             <Button 
                size="lg" 
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleSubmitEntry}
                disabled={authLoading || !canSubmit}
              >
              <Edit3 className="mr-2 h-5 w-5" /> 
              {authLoading ? "Loading..." : !user ? "Login to Participate" : canSubmit ? "Submit Entry" : "Submissions Closed"}
            </Button>
            <Button size="lg" variant="outline" className="w-full md:w-auto">
              <Share2 className="mr-2 h-5 w-5" /> Share Challenge
            </Button>
          </div>
          
          {!canSubmit && challenge.status !== 'upcoming' && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Submissions Closed</AlertTitle>
              <AlertDescription>
                This challenge has ended or is not currently active for submissions.
              </AlertDescription>
            </Alert>
          )}
           {challenge.status === 'upcoming' && (
            <Alert className="mb-6 bg-blue-500/10 border-blue-500/30 text-blue-300">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Challenge Upcoming!</AlertTitle>
              <AlertDescription>
                This challenge has not started yet. Check back on {new Date(challenge.startDate).toLocaleDateString()}!
              </AlertDescription>
            </Alert>
          )}


          <Separator className="my-6" />

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="details" className="text-sm md:text-base"><Info className="mr-2 h-4 w-4"/>Details</TabsTrigger>
              <TabsTrigger value="rules" className="text-sm md:text-base"><ListOrdered className="mr-2 h-4 w-4"/>Rules</TabsTrigger>
              <TabsTrigger value="prizes" className="text-sm md:text-base"><Trophy className="mr-2 h-4 w-4"/>Prizes</TabsTrigger>
              <TabsTrigger value="gallery" className="text-sm md:text-base"><ImageIcon className="mr-2 h-4 w-4"/>Gallery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card>
                <CardHeader><CardTitle>Challenge Description</CardTitle></CardHeader>
                <CardContent className="prose prose-invert max-w-none text-foreground">
                  <p>{challenge.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rules">
              <Card>
                <CardHeader><CardTitle>Challenge Rules</CardTitle></CardHeader>
                <CardContent className="prose prose-invert max-w-none text-foreground">
                  <p>{challenge.rules}</p>
                </CardContent>
              </Card>
            </TabsContent>
             <TabsContent value="prizes">
              <Card>
                <CardHeader><CardTitle>Prize Information</CardTitle></CardHeader>
                <CardContent className="prose prose-invert max-w-none text-foreground">
                  <p>{challenge.prizeInfo}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="gallery">
              <Card>
                <CardHeader><CardTitle>Submission Gallery</CardTitle></CardHeader>
                <CardContent>
                  <SubmissionGallery submissions={submissions} submissionType={challenge.submissionType} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {leaderboardEntries.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
          <Leaderboard entries={leaderboardEntries} />
        </section>
      )}
    </div>
  );
}
