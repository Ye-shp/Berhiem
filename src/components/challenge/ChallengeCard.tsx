import Link from 'next/link';
import Image from 'next/image';
import type { Challenge } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Users, CalendarDays, Trophy, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChallengeCardProps {
  challenge: Challenge;
  isPrioritized?: boolean;
}

export function ChallengeCard({ challenge, isPrioritized = false }: ChallengeCardProps) {
  const timeRemaining = (): string => {
    const endDate = new Date(challenge.endDate);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    return "Ending soon";
  };

  const statusColors = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    upcoming: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    ended: 'bg-red-500/20 text-red-400 border-red-500/30',
    draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <Card className={`overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 ${isPrioritized ? 'border-2 border-primary' : 'border-border'}`}>
      {challenge.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={challenge.imageUrl}
            alt={challenge.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint="challenge theme"
          />
           <Badge className={`absolute top-2 right-2 capitalize ${statusColors[challenge.status]}`}>
            {challenge.status}
          </Badge>
          {isPrioritized && (
             <Badge variant="default" className="absolute top-2 left-2 bg-gradient-to-r from-[var(--gradient-accent-from)] to-[var(--gradient-accent-to)] text-white">
              Followed Brand
            </Badge>
          )}
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-bold truncate" title={challenge.title}>
          {challenge.title}
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Tag className="h-4 w-4 mr-1.5 text-primary" />
          <span>By {challenge.brand.name}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4" title={challenge.description}>
          {challenge.description}
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1.5 text-primary" />
            <span>{challenge.participantsCount} Participants</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1.5 text-primary" />
            <span>{timeRemaining()}</span>
          </div>
          <div className="flex items-center col-span-2">
            <Trophy className="h-4 w-4 mr-1.5 text-primary" />
            <span className="truncate" title={challenge.prizeInfo}>{challenge.prizeInfo}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/challenge/${challenge.id}`}>
            View Challenge <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
