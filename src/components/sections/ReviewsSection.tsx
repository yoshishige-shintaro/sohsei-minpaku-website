'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Review } from '@/types/hotel';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

type Props = {
  reviews: Review[];
  content: {
    title: string;
    subtitle: string;
  };
};

const ReviewsSection = ({ reviews, content }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const totalSlides = reviews.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  // タッチイベントハンドラー（モバイル用）
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // 左スワイプ
      handleNextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // 右スワイプ
      handlePrevSlide();
    }
  };

  // 星評価を表示するヘルパー関数
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="py-16 md:py-24 bg-kinari">
      <Container>
        <SectionTitle title={content.title} subtitle={content.subtitle} />

        <div className="relative overflow-hidden max-w-4xl mx-auto">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="w-full flex-shrink-0 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1 mb-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{review.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{review.author}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="text-sm text-wakatake">
                      {review.hotel === 'kasai' ? '葛西ホテル' : '寿司アートホテル'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ナビゲーションボタン */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all z-10"
            aria-label="前のレビュー"
          >
            <ChevronLeft size={20} className="text-deep-blue" />
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all z-10"
            aria-label="次のレビュー"
          >
            <ChevronRight size={20} className="text-deep-blue" />
          </button>

          {/* ドットインジケーター */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-deep-blue' : 'bg-gray-300'
                }`}
                aria-label={`レビュー ${index + 1}に移動`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ReviewsSection;