'use client';

import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { Hotel } from '@/types/hotel';
import { Calendar, Home, Users } from 'lucide-react';
import Image from 'next/image';

type Props = {
  hotels: Hotel[];
  locale: Locale;
  content: {
    title: string;
    subtitle: string;
    bookNow: string;
    weekday: string;
    weekend: string;
    perNight: string;
  };
};

const BookingSection = ({ hotels, locale, content }: Props) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ja-JP');
  };

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
    <section id="booking" className="py-16 md:py-24 bg-white">
      <Container>
        <SectionTitle title={content.title} subtitle={content.subtitle} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
        >
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              variants={itemVariants}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="relative h-48 md:h-56">
                <Image
                  src={hotel.images[0].src}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={16} className="mr-1" />
                    <span>最大{hotel.maxGuests}名</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Home size={16} className="mr-1" />
                    <span>{hotel.size}㎡</span>
                  </div>
                </div>
                <div className="flex justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">{content.weekday}</p>
                    <p className="text-lg font-semibold">
                      ¥{formatPrice(hotel.price.weekday)}
                      <span className="text-sm font-normal text-gray-500">
                        {content.perNight}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{content.weekend}</p>
                    <p className="text-lg font-semibold">
                      ¥{formatPrice(hotel.price.weekend)}
                      <span className="text-sm font-normal text-gray-500">
                        {content.perNight}
                      </span>
                    </p>
                  </div>
                </div>
                <a
                  href={hotel.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-deep-blue hover:bg-opacity-90 text-white py-3 px-4 rounded-md font-medium transition-colors"
                >
                  <span className="flex items-center justify-center">
                    <Calendar size={18} className="mr-2" />
                    {content.bookNow}
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default BookingSection;