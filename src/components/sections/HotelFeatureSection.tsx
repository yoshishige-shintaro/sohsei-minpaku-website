"use client";

import { LinkButton } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Locale } from "@/lib/i18n";
import { Hotel } from "@/types/hotel";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  hotel: Hotel;
  locale: Locale;
  isReversed?: boolean;
  content: {
    title: string;
    subtitle: string;
    description: string;
    readMore: string;
  };
};

const HotelFeatureSection = ({ hotel, locale, isReversed = false, content }: Props) => {
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
    <section id={hotel.id} className="py-16 md:py-24 bg-white">
      <Container>
        <div
          className={`flex flex-col ${
            isReversed ? "md:flex-row-reverse" : "md:flex-row"
          } gap-8 md:gap-12 items-center`}
        >
          {/* 画像部分 */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
              <Image
                src={hotel.images[0].src}
                alt={hotel.images[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* テキスト部分 */}
          <motion.div
            className="w-full md:w-1/2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-3">
              {content.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-6">
              {content.subtitle}
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-700 mb-6">
              {content.description}
            </motion.p>

            {/* 特徴リスト */}
            <motion.div variants={containerVariants} className="mb-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hotel.strengths.slice(0, 4).map((strength, index) => (
                  <motion.li key={index} variants={itemVariants} className="flex items-start">
                    <span className="text-wakatake mr-2 mt-1">
                      <Check size={16} />
                    </span>
                    <span className="text-gray-700 text-sm">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* ボタン */}
            <motion.div variants={itemVariants}>
              <LinkButton href={`/${locale}/${hotel.id}`} variant="primary">
                {content.readMore}
              </LinkButton>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HotelFeatureSection;
