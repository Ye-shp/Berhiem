import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Added for potential Genkit served images (e.g. from local dev inspector or if it proxies images)
      // This might be needed if AI generated image URLs are from genkit dev server in local environment.
      // For production, ensure AI generated images are stored and served from a persistent CDN/storage.
      {
        protocol: 'http', // Genkit dev server is usually http
        hostname: '127.0.0.1', // Genkit default host
        // port: 'YOUR_GENKIT_PORT', // Typically 4000 or 3100, specify if not default HTTP/HTTPS port
        // pathname: '/**', // Adjust if Genkit serves images under a specific path
      },
       {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Firebase Auth user profile pictures
      }
    ],
  },
};

export default nextConfig;
