'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Hotel } from '@/types/hotel';

type Props = {
  hotel: Hotel;
  title: string;
  subtitle: string;
};

const HotelHero = ({ hotel, title, subtitle }: Props) => {
  return (
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
        <Image
          src={hotel.images[0].src}
          alt={hotel.images[0].alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* コンテンツ */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white z-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-2xl"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* 波紋効果のオーバーレイ - 和モダンなデザインエレメント */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent z-10" />
      <svg
        className="absolute bottom-0 left-0 right-0 z-10 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          fillOpacity="0.1"
          d="M0,32L60,42.7C120,53,240,75,360,69.3C480,64,600,32,720,21.3C840,11,960,21,1080,32C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
    </section>
  );
};

export default HotelHero;