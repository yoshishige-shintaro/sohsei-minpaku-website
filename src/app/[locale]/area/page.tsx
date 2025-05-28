import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import AreaHeroSection from '@/components/sections/AreaHeroSection';
import TouristSpotsSection from '@/components/sections/TouristSpotsSection';
import CulturalActivitiesSection from '@/components/sections/CulturalActivitiesSection';
import FoodShoppingSection from '@/components/sections/FoodShoppingSection';
import SeasonalRecommendationsSection from '@/components/sections/SeasonalRecommendationsSection';

// メタデータの生成
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const translations = await getTranslations(params.locale);
  
  return {
    title: `${translations.area.title} | ${translations.common.title}`,
    description: translations.area.description,
    openGraph: {
      title: `${translations.area.title} | ${translations.common.title}`,
      description: translations.area.description,
      images: [
        {
          url: '/images/hero/tokyo-area.jpg',
          width: 1200,
          height: 630,
          alt: translations.area.hero.title,
        },
      ],
      locale: params.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${translations.area.title} | ${translations.common.title}`,
      description: translations.area.description,
      images: ['/images/hero/tokyo-area.jpg'],
    },
  };
}

// 地域の魅力ページコンポーネント
export default async function AreaPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale;
  const translations = await getTranslations(locale);

  return (
    <main>
      {/* ヒーローセクション */}
      <AreaHeroSection
        title={translations.area.hero.title}
        subtitle={translations.area.hero.subtitle}
        description={translations.area.hero.description}
      />

      {/* 人気観光スポットセクション */}
      <TouristSpotsSection
        title={translations.area.touristSpots.title}
        subtitle={translations.area.touristSpots.subtitle}
      />

      {/* 文化体験・アクティビティセクション */}
      <CulturalActivitiesSection
        title={translations.area.culturalActivities.title}
        subtitle={translations.area.culturalActivities.subtitle}
      />

      {/* グルメ・ショッピングセクション */}
      <FoodShoppingSection
        title={translations.area.foodShopping.title}
        subtitle={translations.area.foodShopping.subtitle}
      />

      {/* 季節のおすすめセクション */}
      <SeasonalRecommendationsSection
        title={translations.area.seasonal.title}
        subtitle={translations.area.seasonal.subtitle}
      />
    </main>
  );
}
