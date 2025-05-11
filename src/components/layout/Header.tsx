'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Flame, Home, UserCircle, Presentation, Bot, LogIn, LogOut, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'; // next/navigation for App Router

export function Header() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleCreateChallengeClick = () => {
    if (!user) {
      router.push('/login?redirect=/create-challenge'); // Assuming /create-challenge page, adjust if needed
    } else {
      // router.push('/create-challenge'); // Navigate to create challenge page if it exists
      // For now, let's just log or toast, as /create-challenge page isn't defined
      console.log("User wants to create a challenge.");
      // toast({ title: "Create Challenge", description: "This feature is coming soon!" });
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Flame className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl bg-gradient-to-r from-[var(--gradient-accent-from)] to-[var(--gradient-accent-to)] bg-clip-text text-transparent">
            ChallengerVerse
          </span>
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center">
              <Home className="mr-1 h-4 w-4" />
              Feed
            </Link>
          </Button>
          
          <Button variant="ghost" size="sm" asChild>
            <Link href="/brand/brand1" className="flex items-center"> {/* Example link, can be dynamic list of brands */}
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

          {loading ? (
            <Button variant="ghost" size="sm" disabled>Loading...</Button>
          ) : user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                {/* For demo, linking to user1. In a real app, user.uid would be from Firebase.
                    And profile page would fetch data based on this UID.
                    Current mockData.ts only has 'user1' and 'user2'.
                    If user.uid is not 'user1' or 'user2', /profile/[uid] will 404 with current mock data.
                */}
                <Link href={`/profile/${user.uid || 'user1'}`} className="flex items-center">
                  <UserCircle className="mr-1 h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={logout} className="flex items-center">
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login" className="flex items-center">
                  <LogIn className="mr-1 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/signup" className="flex items-center">
                  <UserPlus className="mr-1 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
          
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleCreateChallengeClick}
            disabled={loading}
          >
            Create Challenge
          </Button>
        </nav>
      </div>
    </header>
  );
}
