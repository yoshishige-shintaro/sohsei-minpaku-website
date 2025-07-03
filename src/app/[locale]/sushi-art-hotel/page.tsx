import AccessSection from "@/components/sections/AccessSection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import GallerySection from "@/components/sections/GallerySection";
import HotelHero from "@/components/sections/HotelHero";
import OtherHotelSection from "@/components/sections/OtherHotelSection";
import OverviewSection from "@/components/sections/OverviewSection";
import PriceSection from "@/components/sections/PriceSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import RulesSection from "@/components/sections/RulesSection";
import { hotels } from "@/data/hotels";
import { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const translations = await getTranslations(params.locale);

  return {
    title: "寿司アートホテル",
    description:
      "日本藝術大学アーティストによる寿司テーマの独自アートが楽しめる空間。イームズのダイニングテーブル等こだわりの内装。",
  };
}

export default async function SushiArtHotelPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const translations = await getTranslations(locale);

  // 寿司アートホテルの情報を取得
  const sushiArtHotel = hotels.find((hotel) => hotel.id === "sushi-art-hotel");
  // 現在表示中の施設以外のホテル情報を取得
  const otherHotels = hotels.filter((hotel) => hotel.id !== "sushi-art-hotel");

  // ホテルデータが見つからない場合は例外処理
  if (!sushiArtHotel) {
    throw new Error("ホテルデータが見つかりません");
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
      <OverviewSection hotel={sushiArtHotel} title={translations.hotel.overview} />

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
      <AmenitiesSection hotel={sushiArtHotel} title={translations.hotel.rooms} />

      {/* レビュー */}
      <ReviewsSection reviews={sushiArtHotel.reviews} content={translations.home.reviews} />

      {/* アクセス・周辺情報 */}
      <AccessSection hotel={sushiArtHotel} title={translations.hotel.access} />

      {/* ハウスルール */}
      <RulesSection hotel={sushiArtHotel} title={translations.hotel.rules} />

      {/* 他の施設紹介 */}
      <OtherHotelSection
        hotels={otherHotels}
        locale={locale}
        title={translations.hotel.otherHotel}
        readMore={translations.common.button.readMore}
      />
    </>
  );
}
