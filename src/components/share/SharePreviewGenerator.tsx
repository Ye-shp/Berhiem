"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from 'next/image';
import { generateSharePreview, type GenerateSharePreviewInput, type GenerateSharePreviewOutput } from '@/ai/flows/ai-powered-share-preview';
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  challengeName: z.string().min(3, "Challenge name must be at least 3 characters"),
  challengeDescription: z.string().min(10, "Description must be at least 10 characters"),
  platform: z.enum(['facebook', 'twitter', 'instagram']),
  brandName: z.string().min(2, "Brand name is required"),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color (e.g. #RRGGBB)"),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color (e.g. #RRGGBB)"),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color (e.g. #RRGGBB)"),
});

type SharePreviewFormValues = z.infer<typeof formSchema>;

export function SharePreviewGenerator() {
  const [preview, setPreview] = useState<GenerateSharePreviewOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SharePreviewFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      challengeName: "My Awesome Challenge",
      challengeDescription: "This is a super fun challenge where you can win amazing prizes by showcasing your creativity!",
      platform: 'twitter',
      brandName: "ChallengerVerse",
      primaryColor: "#F5F500", // Yellow
      secondaryColor: "#000000", // Black
      accentColor: "#FF3A00", // Red
    },
  });

  const onSubmit: SubmitHandler<SharePreviewFormValues> = async (data) => {
    setIsLoading(true);
    setPreview(null);
    try {
      const result = await generateSharePreview(data);
      setPreview(result);
      toast({
        title: "Preview Generated!",
        description: "Your AI-powered share preview is ready.",
      });
    } catch (error) {
      console.error("Error generating share preview:", error);
      toast({
        title: "Error Generating Preview",
        description: "Something went wrong. Please try again. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">AI Share Preview Generator</CardTitle>
          <CardDescription>
            Generate a social media share preview for your challenge using AI. 
            Fill in the details below to see the magic happen.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="challengeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Challenge Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Summer Photo Contest" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="challengeDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Challenge Description</FormLabel>
                    <FormControl><Textarea placeholder="Briefly describe the challenge..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Platform</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl><Input placeholder="e.g., AwesomeBrand Co." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Color</FormLabel>
                      <FormControl><Input type="color" {...field} className="p-1 h-10" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="secondaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Color</FormLabel>
                      <FormControl><Input type="color" {...field} className="p-1 h-10" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accentColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accent Color</FormLabel>
                      <FormControl><Input type="color" {...field} className="p-1 h-10" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Preview"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className="shadow-xl sticky top-24">
        <CardHeader>
          <CardTitle>Generated Preview</CardTitle>
          <CardDescription>This is how your challenge might look when shared.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
          {isLoading && (
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="mt-2 text-muted-foreground">AI is thinking...</p>
            </div>
          )}
          {!isLoading && preview && preview.imageUrl && (
            <div className="w-full max-w-md">
              <Image 
                src={preview.imageUrl} 
                alt={preview.altText || "Generated share preview"} 
                width={500} 
                height={250} 
                className="rounded-md border border-border object-contain aspect-[2/1]"
                data-ai-hint="social media post"
              />
              <p className="text-xs text-muted-foreground mt-2 italic text-center">{preview.altText}</p>
            </div>
          )}
          {!isLoading && preview && !preview.imageUrl && (
             <p className="text-muted-foreground">AI could not generate an image. Please try again or adjust inputs.</p>
          )}
          {!isLoading && !preview && (
            <p className="text-muted-foreground">Your generated preview will appear here.</p>
          )}
        </CardContent>
         <CardFooter className="text-xs text-muted-foreground pt-4">
            Note: AI image generation is experimental. Results may vary. The actual image might be a placeholder or a stylized representation.
        </CardFooter>
      </Card>
    </div>
  );
}
