'use client';

import { motion } from 'framer-motion';
import { Hotel } from '@/types/hotel';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { LinkButton } from '@/components/ui/Button';
import { Calendar } from 'lucide-react';

type Props = {
  hotel: Hotel;
  title: string;
  weekday: string;
  weekend: string;
  perNight: string;
  attention: string;
  bookNow: string;
};

const PriceSection = ({ 
  hotel, 
  title, 
  weekday, 
  weekend, 
  perNight,
  attention,
  bookNow
}: Props) => {
  // 料金をフォーマット
  const formatPrice = (price: number) => {
    return price.toLocaleString('ja-JP');
  };

  // アニメーションのバリアント
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="price" className="py-16 md:py-20 bg-white">
      <Container>
        <SectionTitle title={title} center />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-10"
        >
          <div className="bg-kinari rounded-lg p-8 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 平日料金 */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center"
              >
                <h3 className="text-xl font-medium mb-4 text-deep-blue">
                  {weekday}
                </h3>
                <p className="text-3xl font-bold mb-2">
                  ¥{formatPrice(hotel.price.weekday)}
                  <span className="text-base font-normal text-gray-500 ml-1">
                    {perNight}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {/* 税込表示など */}
                  消費税・サービス料込み
                </p>
              </motion.div>

              {/* 週末・祝日料金 */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center"
              >
                <h3 className="text-xl font-medium mb-4 text-deep-blue">
                  {weekend}
                </h3>
                <p className="text-3xl font-bold mb-2">
                  ¥{formatPrice(hotel.price.weekend)}
                  <span className="text-base font-normal text-gray-500 ml-1">
                    {perNight}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {/* 税込表示など */}
                  消費税・サービス料込み
                </p>
              </motion.div>
            </div>

            {/* 注意事項 */}
            <motion.div variants={itemVariants} className="mt-8">
              <h4 className="font-medium mb-2">{attention}</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                <li>料金は{hotel.maxGuests}名までの宿泊料金です</li>
                <li>チェックイン: 15:00～20:00</li>
                <li>チェックアウト: ～10:00</li>
                <li>キャンセルポリシーはAirbnbの規定に準じます</li>
                <li>清掃料・リネン交換料を含みます</li>
              </ul>
            </motion.div>

            {/* 予約ボタン */}
            <motion.div
              variants={itemVariants}
              className="mt-8 text-center"
            >
              <LinkButton
                href={hotel.airbnbUrl}
                variant="primary"
                isExternal
                className="px-8 py-3 text-base"
              >
                <Calendar size={18} className="mr-2" />
                {bookNow}
              </LinkButton>
              <p className="mt-3 text-xs text-gray-500">
                Airbnbでの予約ページに移動します
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default PriceSection;