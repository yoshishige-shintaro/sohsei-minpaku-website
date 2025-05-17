'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import Container from '@/components/ui/Container';

type HeroSlide = {
  id: number;
  imageSrc: string;
  alt: string;
};

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    imageSrc: '/images/hero/hero-1.jpg',
    alt: '葛西ホテル外観',
  },
  {
    id: 2,
    imageSrc: '/images/hero/hero-2.jpg',
    alt: '寿司アートホテル',
  },
  {
    id: 3,
    imageSrc: '/images/hero/hero-3.jpg',
    alt: 'リビングルーム',
  },
];

type Props = {
  locale: Locale;
  content: {
    title: string;
    subtitle: string;
  };
};

const HeroSection = ({ locale, content }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // スライドの自動切り替え
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // アニメーションのバリアント
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3 + 0.3,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* スライドショー */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
            <Image
              src={slide.imageSrc}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* ヒーローコンテンツ */}
      <Container className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
        >
          {content.title}
        </motion.h1>
        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-xl md:text-2xl mb-8 max-w-2xl"
        >
          {content.subtitle}
        </motion.p>
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <a
            href="#hotels"
            className="bg-white text-deep-blue hover:bg-opacity-90 transition duration-300 py-3 px-8 rounded-md font-medium"
          >
            詳しく見る
          </a>
        </motion.div>
      </Container>

      {/* スライド切り替えインジケーター */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`スライド ${index + 1}に移動`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;