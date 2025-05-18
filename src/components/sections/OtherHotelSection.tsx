'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Hotel } from '@/types/hotel';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { LinkButton } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Locale } from '@/lib/i18n';

type Props = {
  hotel: Hotel;
  locale: Locale;
  title: string;
  readMore: string;
};

const OtherHotelSection = ({ hotel, locale, title, readMore }: Props) => {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <SectionTitle title={title} center />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 max-w-4xl mx-auto bg-kinari rounded-lg overflow-hidden shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* 画像 */}
            <motion.div
              variants={imageVariants}
              className="relative h-64 md:h-full overflow-hidden"
            >
              <Image
                src={hotel.images[0].src}
                alt={hotel.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* テキスト */}
            <motion.div
              variants={containerVariants}
              className="p-6 md:p-8"
            >
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold mb-3"
              >
                {hotel.name}
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-gray-600 mb-4"
              >
                {hotel.subtitle}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 mb-4"
              >
                <div className="bg-deep-blue bg-opacity-10 text-deep-blue text-sm px-3 py-1 rounded-full">
                  最大{hotel.maxGuests}名
                </div>
                <div className="bg-deep-blue bg-opacity-10 text-deep-blue text-sm px-3 py-1 rounded-full">
                  {hotel.size}㎡
                </div>
                {hotel.parking && (
                  <div className="bg-deep-blue bg-opacity-10 text-deep-blue text-sm px-3 py-1 rounded-full">
                    駐車場あり
                  </div>
                )}
              </motion.div>
              <motion.p
                variants={itemVariants}
                className="text-gray-700 mb-6"
              >
                {hotel.description}
              </motion.p>
              <motion.div variants={itemVariants}>
                <LinkButton
                  href={`/${locale}/${hotel.id}-hotel`}
                  variant="primary"
                  className="inline-flex items-center"
                >
                  {readMore}
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default OtherHotelSection;