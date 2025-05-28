'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { MapPin, Clock, Star } from 'lucide-react';

type Spot = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  distance: string;
  openingHours: string;
  nearbyHotel: 'kasai' | 'sushi-art' | 'both';
};

const touristSpots: Spot[] = [
  {
    id: 'teamlab',
    name: 'チームラボプラネッツ',
    description: 'デジタルアートの世界に没入できる体験型美術館。水に入るミュージアムとして話題の最新アート空間。',
    category: 'アート・文化',
    image: '/images/spots/teamlab.jpg',
    rating: 4.5,
    distance: '葛西ホテルから車で15分',
    openingHours: '10:00-22:00',
    nearbyHotel: 'kasai'
  },
  {
    id: 'disney',
    name: '東京ディズニーリゾート',
    description: '世界中で愛される夢の国。東京ディズニーランドと東京ディズニーシーで特別な体験を。',
    category: 'テーマパーク',
    image: '/images/spots/disney.jpg',
    rating: 4.8,
    distance: '葛西ホテルから車で15分',
    openingHours: '8:00-22:00',
    nearbyHotel: 'kasai'
  },
  {
    id: 'skytree',
    name: '東京スカイツリー',
    description: '東京の新しいランドマーク。高さ634mからの絶景と多彩なショッピング・グルメが楽しめる。',
    category: '観光名所',
    image: '/images/spots/skytree.jpg',
    rating: 4.3,
    distance: '寿司アートホテルから徒歩20分',
    openingHours: '8:00-22:00',
    nearbyHotel: 'sushi-art'
  },
  {
    id: 'asakusa',
    name: '浅草寺',
    description: '東京最古の寺院。雷門から仲見世通りを歩き、本堂での参拝で江戸情緒を感じる。',
    category: '歴史・文化',
    image: '/images/spots/asakusa.jpg',
    rating: 4.4,
    distance: '寿司アートホテルから電車で15分',
    openingHours: '6:00-17:00',
    nearbyHotel: 'sushi-art'
  },
  {
    id: 'tsukiji',
    name: '築地場外市場',
    description: '新鮮な海産物や食材が並ぶ市場。本格的な寿司や海鮮丼を楽しめる名店が多数。',
    category: 'グルメ',
    image: '/images/spots/tsukiji.jpg',
    rating: 4.2,
    distance: '両ホテルから電車で30分',
    openingHours: '5:00-14:00',
    nearbyHotel: 'both'
  },
  {
    id: 'kasai-park',
    name: '葛西臨海公園',
    description: '東京湾を望む広大な公園。水族館、観覧車、バーベキュー場などファミリーで楽しめる。',
    category: '自然・公園',
    image: '/images/spots/kasai-park.jpg',
    rating: 4.1,
    distance: '葛西ホテルから徒歩25分',
    openingHours: '24時間',
    nearbyHotel: 'kasai'
  }
];

type Props = {
  title: string;
  subtitle: string;
};

const TouristSpotsSection = ({ title, subtitle }: Props) => {
  // アニメーションのバリアント
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // 星評価を表示するヘルパー関数
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <SectionTitle title={title} subtitle={subtitle} center />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {touristSpots.map((spot) => (
            <motion.div
              key={spot.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={spot.image}
                  alt={spot.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 left-2 bg-deep-blue text-white text-xs px-2 py-1 rounded">
                  {spot.category}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1 mr-2">
                    {renderStars(spot.rating)}
                  </div>
                  <span className="text-sm text-gray-600">{spot.rating}</span>
                </div>
                
                <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                  {spot.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin size={12} className="mr-1" />
                    <span>{spot.distance}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock size={12} className="mr-1" />
                    <span>{spot.openingHours}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default TouristSpotsSection;