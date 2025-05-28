'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/ui/Container';

type Props = {
  title: string;
  subtitle: string;
  description: string;
};

const AreaHeroSection = ({ title, subtitle, description }: Props) => {
  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
        <Image
          src="/images/hero/tokyo-area.jpg"
          alt="東京の街並み"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* コンテンツ */}
      <Container className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
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
          className="text-xl md:text-2xl mb-6 max-w-2xl"
        >
          {subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg max-w-3xl leading-relaxed"
        >
          {description}
        </motion.p>
      </Container>

      {/* 装飾的な要素 */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
};

export default AreaHeroSection;