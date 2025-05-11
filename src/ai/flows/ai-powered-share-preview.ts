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
  platform: z.enum(['facebook', 'twitter', 'instagram']).describe('The platform the share preview is for.'),
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

const prompt = ai.definePrompt({
  name: 'generateSharePreviewPrompt',
  input: {schema: GenerateSharePreviewInputSchema},
  output: {schema: GenerateSharePreviewOutputSchema},
  prompt: `You are an AI that generates share preview images for social media platforms.  You must return the image as a data URI, and alt text that describes the image.

  The challenge is named "{{challengeName}}", and is hosted by "{{brandName}}".  The challenge description is: {{challengeDescription}}

  The platform that this image will be shared on is {{platform}}.

  The brand uses the following colors: primary: {{primaryColor}}, secondary: {{secondaryColor}}, accent: {{accentColor}}.

  You must adhere to the image size constraints for the platform. Make a best effort if the exact constraints are not known.
`,
});

const generateSharePreviewFlow = ai.defineFlow(
  {
    name: 'generateSharePreviewFlow',
    inputSchema: GenerateSharePreviewInputSchema,
    outputSchema: GenerateSharePreviewOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: [
        {
          text: await prompt(input).then(response => response?.altText ?? '')
        }
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      imageUrl: media.url ?? '',
      altText: input.challengeName, // Provide a default alt text
    };
  }
);
