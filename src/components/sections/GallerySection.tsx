'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import { Hotel } from '@/types/hotel';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { useState } from 'react';
import { Camera, X } from 'lucide-react';

type Props = {
  hotel: Hotel;
  title: string;
  viewGallery: string;
};

const GallerySection = ({ hotel, title, viewGallery }: Props) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // ライトボックスを表示
  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setShowLightbox(true);
    // スクロールを禁止
    document.body.style.overflow = 'hidden';
  };

  // ライトボックスを閉じる
  const closeLightbox = () => {
    setShowLightbox(false);
    // スクロールを再開
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <SectionTitle title={title} center />

        {/* メインギャラリー */}
        <div className="mt-8">
          <Splide
            options={{
              perPage: 1,
              gap: '1rem',
              arrows: true,
              pagination: true,
              breakpoints: {
                768: {
                  perPage: 1,
                },
                1024: {
                  perPage: 3,
                },
              },
            }}
            aria-label={`${hotel.name}の写真ギャラリー`}
          >
            {hotel.images.map((image, index) => (
              <SplideSlide key={index}>
                <div
                  className="relative h-64 md:h-80 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                      <Camera className="mr-2" size={20} />
                      {viewGallery}
                    </span>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>

        {/* ライトボックス */}
        {showLightbox && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
              aria-label="閉じる"
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-5xl h-[80vh]">
              <Image
                src={hotel.images[currentImage].src}
                alt={hotel.images[currentImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* ナビゲーションボタン */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {hotel.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImage ? 'bg-white' : 'bg-gray-400'
                  }`}
                  aria-label={`画像 ${index + 1} に移動`}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default GallerySection;