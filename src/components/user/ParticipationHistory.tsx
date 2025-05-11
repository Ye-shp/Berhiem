import type { ChallengeParticipation } from '@/lib/types';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Trophy } from 'lucide-react';

interface ParticipationHistoryProps {
  history: ChallengeParticipation[];
}

const statusIconsAndColors = {
  submitted: { icon: <Clock className="h-4 w-4" />, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  pending: { icon: <Clock className="h-4 w-4" />, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  winner: { icon: <Trophy className="h-4 w-4" />, color: 'bg-primary/20 text-primary border-primary/30' },
  participated: { icon: <CheckCircle className="h-4 w-4" />, color: 'bg-green-500/20 text-green-400 border-green-500/30' },
};

export function ParticipationHistory({ history }: ParticipationHistoryProps) {
  if (!history || history.length === 0) {
    return <p className="text-muted-foreground">No participation history yet. Go join some challenges!</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participation History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {history.map((item) => (
            <li key={item.challengeId} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-md border bg-card-foreground/5 hover:bg-card-foreground/10 transition-colors">
              <div>
                <Link href={`/challenge/${item.challengeId}`} className="font-semibold text-primary hover:underline">
                  {item.challengeTitle}
                </Link>
                <p className="text-xs text-muted-foreground">
                  Submitted: {new Date(item.submissionDate).toLocaleDateString()}
                </p>
              </div>
              <Badge className={`mt-2 sm:mt-0 capitalize flex items-center gap-1.5 ${statusIconsAndColors[item.status]?.color || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                {statusIconsAndColors[item.status]?.icon}
                {item.status}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
