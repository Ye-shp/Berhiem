'use server';
/**
 * @fileOverview AI-powered share preview generator.
 *
 * - generateSharePreview - A function that generates a share preview based on the platform.
 * - GenerateSharePreviewInput - The input type for the generateSharePreview function.
 * - GenerateSharePreviewOutput - The return type for the generateSharePreview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSharePreviewInputSchema = z.object({
  challengeName: z.string().describe('The name of the challenge.'),
  challengeDescription: z.string().describe('A description of the challenge.'),
  challengeImageUrl: z.string().url().describe('The URL of the main image for the challenge.'),
  platform: z.enum(['imessage', 'instagram']).describe('The platform the share preview is for (iMessage or Instagram).'),
  brandName: z.string().describe('The name of the brand hosting the challenge.'),
  primaryColor: z.string().describe('The primary color of the brand, in hex format (e.g., #000000).'),
  secondaryColor: z.string().describe('The secondary color of the brand, in hex format (e.g., #F5F500).'),
  accentColor: z.string().describe('The accent color of the brand, in hex format (e.g., #FF3A00).'),
});
export type GenerateSharePreviewInput = z.infer<typeof GenerateSharePreviewInputSchema>;

const GenerateSharePreviewOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated share preview image.'),
  altText: z.string().describe('Alt text for the image.'),
});
export type GenerateSharePreviewOutput = z.infer<typeof GenerateSharePreviewOutputSchema>;

export async function generateSharePreview(input: GenerateSharePreviewInput): Promise<GenerateSharePreviewOutput> {
  return generateSharePreviewFlow(input);
}

const generateSharePreviewFlow = ai.defineFlow(
  {
    name: 'generateSharePreviewFlow',
    inputSchema: GenerateSharePreviewInputSchema,
    outputSchema: GenerateSharePreviewOutputSchema,
  },
  async (input) => {
    const response = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // Ensure this model supports image generation and multimodal input
      prompt: [
        { media: { url: input.challengeImageUrl } },
        {
            text: `You are an AI assistant for Berhiem.
Given the challenge image (provided as media), challenge details, and target social media platform, your tasks are:

1.  **Use the provided challenge image directly** for the share preview. Do NOT generate a new image.
2.  **Generate a concise and compelling alt text for the PROVIDED challenge image.** This alt text should be descriptive and relevant to the challenge and the visual.

The brand's colors are: Primary: ${input.primaryColor}, Secondary: ${input.secondaryColor}, Accent: ${input.accentColor}. The challenge is "${input.challengeName}" by "${input.brandName}". Description: "${input.challengeDescription}". The target platform is "${input.platform}".

Return ONLY the alt text as your text response. The provided challenge image URL will be used as the image for the preview.`,
        },
      ],
      config: {
        responseModalities: ['TEXT'], // Only expect text back as we are re-using the input image
      },
    });

    return {
      imageUrl: input.challengeImageUrl, // Use the original challenge image URL
      altText: response.text?.trim() || `${input.challengeName} - Shared on ${input.platform} by ${input.brandName}`, // Fallback for alt text
    };
  }
);
