import { SharePreviewGenerator } from '@/components/share/SharePreviewGenerator';

export const metadata = {
  title: 'AI Share Preview | ChallengerVerse',
  description: 'Generate AI-powered share previews for your challenges.',
};

export default function SharePreviewPage() {
  return (
    <div>
      <SharePreviewGenerator />
    </div>
  );
}
