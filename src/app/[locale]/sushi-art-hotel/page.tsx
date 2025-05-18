import { Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import { hotels } from '@/data/hotels';
import HotelHero from '@/components/sections/HotelHero';
import GallerySection from '@/components/sections/GallerySection';
import OverviewSection from '@/components/sections/OverviewSection';
import PriceSection from '@/components/sections/PriceSection';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import AccessSection from '@/components/sections/AccessSection';
import RulesSection from '@/components/sections/RulesSection';
import OtherHotelSection from '@/components/sections/OtherHotelSection';

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const translations = await getTranslations(params.locale);
  
  return {
    title: '寿司アートホテル',
    description: '日本藝術大学アーティストによる寿司テーマの独自アートが楽しめる空間。イームズのダイニングテーブル等こだわりの内装。',
  };
}

export default async function SushiArtHotelPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale;
  const translations = await getTranslations(locale);
  
  // 寿司アートホテルの情報を取得
  const sushiArtHotel = hotels.find(hotel => hotel.id === 'sushi-art');
  // もう一方のホテル情報を取得
  const kasaiHotel = hotels.find(hotel => hotel.id === 'kasai');
  
  // ホテルデータが見つからない場合は例外処理
  if (!sushiArtHotel || !kasaiHotel) {
    throw new Error('ホテルデータが見つかりません');
  }

  return (
    <>
      {/* ヒーローセクション */}
      <HotelHero 
        hotel={sushiArtHotel} 
        title={sushiArtHotel.name}
        subtitle={sushiArtHotel.subtitle}
      />
      
      {/* 写真ギャラリー */}
      <GallerySection 
        hotel={sushiArtHotel} 
        title={translations.hotel.rooms}
        viewGallery={translations.common.button.viewGallery}
      />
      
      {/* 施設概要＋特徴 */}
      <OverviewSection 
        hotel={sushiArtHotel} 
        title={translations.hotel.overview}
      />
      
      {/* 料金セクション */}
      <PriceSection 
        hotel={sushiArtHotel} 
        title={translations.hotel.price}
        weekday={translations.hotel.weekday}
        weekend={translations.hotel.weekend}
        perNight={translations.hotel.perNight}
        attention={translations.hotel.attention}
        bookNow={translations.common.button.bookNow}
      />
      
      {/* 部屋・設備詳細 */}
      <AmenitiesSection 
        hotel={sushiArtHotel} 
        title={translations.hotel.rooms}
      />
      
      {/* レビュー */}
      <ReviewsSection 
        reviews={sushiArtHotel.reviews}
        content={translations.home.reviews}
      />
      
      {/* アクセス・周辺情報 */}
      <AccessSection 
        hotel={sushiArtHotel} 
        title={translations.hotel.access}
      />
      
      {/* ハウスルール */}
      <RulesSection 
        hotel={sushiArtHotel} 
        title={translations.hotel.rules}
      />
      
      {/* もう一方の施設紹介 */}
      <OtherHotelSection 
        hotel={kasaiHotel}
        locale={locale}
        title={translations.hotel.otherHotel}
        readMore={translations.common.button.readMore}
      />
    </>
  );
}