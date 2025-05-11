import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Flame, Home, UserCircle, Presentation, Bot } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Flame className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl bg-gradient-to-r from-[var(--gradient-accent-from)] to-[var(--gradient-accent-to)] bg-clip-text text-transparent">
            ChallengerVerse
          </span>
        </Link>
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center">
              <Home className="mr-1 h-4 w-4" />
              Feed
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profile/user1" className="flex items-center">
              <UserCircle className="mr-1 h-4 w-4" />
              Profile
            </Link>
          </Button>
           <Button variant="ghost" size="sm" asChild>
            <Link href="/brand/brand1" className="flex items-center">
              <Presentation className="mr-1 h-4 w-4" />
              Brands
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/share-preview" className="flex items-center">
              <Bot className="mr-1 h-4 w-4" />
              Share AI
            </Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Create Challenge
          </Button>
        </nav>
      </div>
    </header>
  );
}
