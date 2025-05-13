import type { User } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit3, Users, Share, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="shadow-xl overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="h-48 bg-gradient-to-r from-primary/30 to-accent/30" data-ai-hint="profile cover abstract">
           <Image src={user.avatarUrl ? user.avatarUrl.replace('/200/200', '/1200/300') : "https://picsum.photos/seed/defaultcover/1200/300"} alt="Profile cover" layout="fill" objectFit="cover" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <Avatar className="h-32 w-32 border-4 border-background shadow-lg" data-ai-hint="profile picture person">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-4xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pt-20 text-center">
        <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
        {user.bio && <p className="text-muted-foreground mt-2 max-w-md mx-auto">{user.bio}</p>}
        
        <div className="mt-6 flex justify-center space-x-4">
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-card-foreground/5 rounded-lg">
            <Users className="h-6 w-6 mx-auto mb-1 text-primary" />
            <p className="text-2xl font-semibold">{user.followedBrands.length}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
          <div className="p-4 bg-card-foreground/5 rounded-lg">
            <Share className="h-6 w-6 mx-auto mb-1 text-primary" />
            <p className="text-2xl font-semibold">{user.sharingStatistics.totalShares}</p>
            <p className="text-sm text-muted-foreground">Total Shares</p>
          </div>
          <div className="p-4 bg-card-foreground/5 rounded-lg">
            <BarChart3 className="h-6 w-6 mx-auto mb-1 text-primary" />
            <p className="text-2xl font-semibold">{user.participationHistory.length}</p>
            <p className="text-sm text-muted-foreground">Challenges Joined</p>
          </div>
        </div>

        {user.followedBrands.length > 0 && (
          <div className="mt-8 text-left">
            <h3 className="text-lg font-semibold mb-3">Followed Brands</h3>
            <div className="flex flex-wrap gap-3">
              {user.followedBrands.map(brand => (
                <Link key={brand.id} href={`/brand/${brand.id}`}>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    {brand.logoUrl && <Avatar className="h-5 w-5" data-ai-hint="brand logo small"><AvatarImage src={brand.logoUrl} alt={brand.name} /></Avatar>}
                    <span>{brand.name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
