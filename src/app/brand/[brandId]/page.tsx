import { getBrandById, getChallenges } from '@/data/mockData';
import { BrandProfile } from '@/components/brand/BrandProfile';
import { BrandChallengeList } from '@/components/brand/BrandChallengeList';
import { notFound } from 'next/navigation';
import type { Challenge } from '@/lib/types';

interface BrandPageProps {
  params: { brandId: string };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const brand = await getBrandById(params.brandId);

  if (!brand) {
    notFound();
  }

  // In a real app, challenges would be fetched filtered by brandId
  const allChallenges = await getChallenges();
  const brandChallenges = allChallenges.filter(c => c.brand.id === brand.id);

  return (
    <div className="space-y-8">
      <BrandProfile brand={brand} />
      <BrandChallengeList challenges={brandChallenges} />
    </div>
  );
}

export async function generateStaticParams() {
  // In a real app, fetch all brand IDs
  const brands = [{ id: 'brand1' }, { id: 'brand2' }, { id: 'brand3' }];
  return brands.map((brand) => ({
    brandId: brand.id,
  }));
}
