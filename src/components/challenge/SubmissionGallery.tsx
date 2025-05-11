import type { Submission } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, MessageSquare, LinkIcon, Mic } from 'lucide-react';

interface SubmissionGalleryProps {
  submissions: Submission[];
  submissionType: 'photo' | 'text' | 'link' | 'audio';
}

export function SubmissionGallery({ submissions, submissionType }: SubmissionGalleryProps) {
  if (!submissions || submissions.length === 0) {
    return <p className="text-muted-foreground">No submissions yet. Be the first!</p>;
  }

  const renderSubmissionContent = (submission: Submission) => {
    switch (submissionType) {
      case 'photo':
        return submission.contentUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image src={submission.contentUrl} alt={`Submission by ${submission.userName}`} layout="fill" objectFit="cover" />
          </div>
        ) : <p className="text-muted-foreground">Image not available</p>;
      case 'text':
        return <p className="text-sm text-foreground line-clamp-4 p-4 bg-muted rounded-md">{submission.textContent || "No text content."}</p>;
      case 'link':
        return (
          <a href={submission.contentUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-4 bg-muted rounded-md hover:bg-muted/80 transition-colors">
            <LinkIcon className="h-5 w-5 text-primary" />
            <span className="text-sm text-primary truncate">{submission.contentUrl || "No link provided."}</span>
          </a>
        );
      case 'audio':
         return (
          <div className="p-4 bg-muted rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <Mic className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Audio Submission</span>
            </div>
            {submission.contentUrl ? (
              <audio controls src={submission.contentUrl} className="w-full">
                Your browser does not support the audio element.
              </audio>
            ) : <p className="text-xs text-muted-foreground">Audio not available.</p>}
          </div>
        );
      default:
        return <p className="text-muted-foreground">Unsupported submission type.</p>;
    }
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {submissions.map((submission) => (
        <Card key={submission.id} className="overflow-hidden shadow-md hover:shadow-primary/10 transition-shadow">
          <CardContent className="p-4 space-y-3">
            {renderSubmissionContent(submission)}
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={submission.userAvatarUrl} alt={submission.userName} />
                  <AvatarFallback>{submission.userName.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-muted-foreground">{submission.userName}</span>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                  {submission.votes || 0}
                </button>
                 {/* Placeholder for comments count */}
                <button className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors">
                  <MessageSquare className="h-3.5 w-3.5 mr-1" /> 0 
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
