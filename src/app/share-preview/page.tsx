import { SharePreviewGenerator } from '@/components/share/SharePreviewGenerator';

export const metadata = {
  title: 'AI Share Preview | Berhiem',
  description: 'Generate AI-powered share previews for your challenges on Berhiem.',
};

export default function SharePreviewPage() {
  return (
    <div>
      <SharePreviewGenerator />
    </div>
  );
}
