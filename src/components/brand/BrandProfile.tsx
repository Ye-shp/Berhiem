import type { Brand } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Link as LinkIcon, Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';

interface BrandProfileProps {
  brand: Brand;
}

const socialIconMap: { [key: string]: React.ElementType } = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
};

export function BrandProfile({ brand }: BrandProfileProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col items-center text-center p-6 md:p-8 bg-card-foreground/5">
        {brand.logoUrl && (
          <div className="relative h-32 w-32 mb-4 rounded-full overflow-hidden border-4 border-primary shadow-md" data-ai-hint="brand logo">
            <Image src={brand.logoUrl} alt={`${brand.name} logo`} layout="fill" objectFit="cover" />
          </div>
        )}
        <CardTitle className="text-3xl font-bold">{brand.name}</CardTitle>
        <div className="flex items-center text-muted-foreground mt-2">
          <Users className="h-5 w-5 mr-2 text-primary" />
          <span>{brand.followerCount.toLocaleString()} Followers</span>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <p className="text-foreground leading-relaxed mb-6 text-center md:text-left">{brand.description}</p>
        
        {brand.socialLinks && brand.socialLinks.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Connect with us</h3>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {brand.socialLinks.map((link) => {
                const Icon = socialIconMap[link.platform.toLowerCase()] || LinkIcon;
                return (
                  <Button key={link.platform} variant="outline" size="sm" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Icon className="h-4 w-4 mr-2" />
                      {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        
        <div className="flex justify-center md:justify-start">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Follow Brand
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
