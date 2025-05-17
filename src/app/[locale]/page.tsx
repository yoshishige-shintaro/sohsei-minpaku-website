import { Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import { hotels } from '@/data/hotels';
import HeroSection from '@/components/sections/HeroSection';
import HotelFeatureSection from '@/components/sections/HotelFeatureSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import BookingSection from '@/components/sections/BookingSection';

// すべてのレビューを結合して表示用に整形
const prepareReviews = () => {
  return hotels.flatMap((hotel) =>
    hotel.reviews.map((review) => ({
      ...review,
      hotel: hotel.id as 'kasai' | 'sushi-art',
    }))
  );
};

export default async function HomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale;
  const translations = await getTranslations(locale);
  const allReviews = prepareReviews();

  return (
    <>
      {/* ヒーローセクション */}
      <HeroSection
        locale={locale}
        content={translations.home.hero}
      />

      {/* 葛西ホテル紹介 */}
      <HotelFeatureSection
        hotel={hotels[0]}
        locale={locale}
        content={translations.home.kasaiHotel}
      />

      {/* 寿司アートホテル紹介 */}
      <HotelFeatureSection
        hotel={hotels[1]}
        locale={locale}
        isReversed
        content={translations.home.sushiArtHotel}
      />

      {/* レビューセクション */}
      <ReviewsSection
        reviews={allReviews}
        content={translations.home.reviews}
      />

      {/* 予約セクション */}
      <BookingSection
        hotels={hotels}
        locale={locale}
        content={{
          ...translations.home.booking,
          weekday: translations.hotel.weekday,
          weekend: translations.hotel.weekend,
          perNight: translations.hotel.perNight,
          bookNow: translations.common.button.bookNow,
        }}
      />
    </>
  );
}
