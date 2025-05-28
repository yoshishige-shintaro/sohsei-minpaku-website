'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { MapPin, Clock, Yen } from 'lucide-react';

type Place = {
  id: string;
  name: string;
  description: string;
  category: 'グルメ' | 'ショッピング';
  type: string;
  image: string;
  location: string;
  openingHours: string;
  priceRange: string;
  specialties: string[];
};

const places: Place[] = [
  {
    id: 'tsukiji-outer',
    name: '築地場外市場',
    description: '新鮮な海産物と伝統的な日本料理が楽しめる、東京で最も有名な市場の一つ。',
    category: 'グルメ',
    type: '市場・グルメ',
    image: '/images/places/tsukiji.jpg',
    location: '中央区築地',
    openingHours: '5:00-14:00',
    priceRange: '¥500-3,000',
    specialties: ['海鮮丼', 'まぐろ', '玉子焼き', '築地ラーメン']
  },
  {
    id: 'shibuya-crossing',
    name: '渋谷センター街',
    description: '若者文化の中心地。最新のファッション、コスメ、グルメが集まる活気あふれるエリア。',
    category: 'ショッピング',
    type: 'ショッピング街',
    image: '/images/places/shibuya.jpg',
    location: '渋谷区道玄坂',
    openingHours: '10:00-21:00',
    priceRange: '¥1,000-10,000',
    specialties: ['ファッション', 'コスメ', 'アクセサリー', 'カフェ']
  },
  {
    id: 'ginza',
    name: '銀座',
    description: '高級ブランドと老舗が軒を連ねる、東京で最も洗練されたショッピングエリア。',
    category: 'ショッピング',
    type: '高級商店街',
    image: '/images/places/ginza.jpg',
    location: '中央区銀座',
    openingHours: '10:00-20:00',
    priceRange: '¥3,000-50,000',
    specialties: ['高級ブランド', '和菓子', '寿司', 'デパート']
  },
  {
    id: 'harajuku',
    name: '原宿竹下通り',
    description: 'ポップカルチャーの聖地。個性的なファッションとスイーツで若者に大人気。',
    category: 'ショッピング',
    type: 'カルチャー街',
    image: '/images/places/harajuku.jpg',
    location: '渋谷区神宮前',
    openingHours: '10:00-20:00',
    priceRange: '¥500-5,000',
    specialties: ['原宿ファッション', 'クレープ', 'コットンキャンディー', 'アニメグッズ']
  },
  {
    id: 'ramen-street',
    name: 'らーめん激戦区',
    description: '東京各地の名店が集まるラーメンの聖地。様々なスタイルのラーメンを味わえる。',
    category: 'グルメ',
    type: 'ラーメン街',
    image: '/images/places/ramen.jpg',
    location: '新宿・渋谷・池袋',
    openingHours: '11:00-23:00',
    priceRange: '¥800-2,000',
    specialties: ['醤油ラーメン', '味噌ラーメン', 'つけ麺', '豚骨ラーメン']
  },
  {
    id: 'depachika',
    name: 'デパ地下グルメ',
    description: 'デパートの地下にある食料品売り場。高品質なお弁当やスイーツが豊富。',
    category: 'グルメ',
    type: 'デパ地下',
    image: '/images/places/depachika.jpg',
    location: '新宿・銀座・池袋',
    openingHours: '10:00-21:00',
    priceRange: '¥500-3,000',
    specialties: ['お弁当', 'スイーツ', '惣菜', '和菓子']
  }
];

type Props = {
  title: string;
  subtitle: string;
};

const FoodShoppingSection = ({ title, subtitle }: Props) => {
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // カテゴリ別にグループ化
  const groumeSpots = places.filter(place => place.category === 'グルメ');
  const shoppingSpots = places.filter(place => place.category === 'ショッピング');

  const PlaceCard = ({ place }: { place: Place }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative h-48">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-2 left-2 bg-wakatake text-white text-xs px-2 py-1 rounded">
          {place.type}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{place.name}</h3>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {place.description}
        </p>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-xs text-gray-600">
            <MapPin size={12} className="mr-1" />
            <span>{place.location}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Clock size={12} className="mr-1" />
            <span>{place.openingHours}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Yen size={12} className="mr-1" />
            <span>{place.priceRange}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {place.specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="bg-kinari text-deep-blue text-xs px-2 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <SectionTitle title={title} subtitle={subtitle} center />

        {/* グルメセクション */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center text-deep-blue">
            グルメスポット
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {groumeSpots.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </motion.div>

        {/* ショッピングセクション */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center text-deep-blue">
            ショッピングスポット
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shoppingSpots.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </motion.div>

        {/* おすすめ情報 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-kinari rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-3 text-deep-blue">
            お得な情報
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2">グルメのコツ</h4>
              <ul className="space-y-1 list-disc pl-5">
                <li>築地は早朝がおすすめ（午前中に売り切れることも）</li>
                <li>デパ地下は夕方に値引きされることが多い</li>
                <li>人気店は事前予約か早めの来店を</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">ショッピングのコツ</h4>
              <ul className="space-y-1 list-disc pl-5">
                <li>免税対象店舗では税率優遇あり</li>
                <li>セール時期は1月と7月が狙い目</li>
                <li>原宿・渋谷は土日が特に混雑</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FoodShoppingSection;