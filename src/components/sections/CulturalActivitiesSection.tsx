'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { 
  Palette, 
  Music, 
  Utensils, 
  Shirt,
  Camera,
  TreePine
} from 'lucide-react';

type Activity = {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string;
  priceRange: string;
  location: string;
};

const activities: Activity[] = [
  {
    id: 'sushi-making',
    name: '寿司作り体験',
    description: '職人から学ぶ本格的な寿司作り。新鮮な食材を使って、自分だけの寿司を作る貴重な体験。',
    icon: 'Utensils',
    duration: '2-3時間',
    priceRange: '¥5,000-8,000',
    location: '築地・銀座エリア'
  },
  {
    id: 'tea-ceremony',
    name: '茶道体験',
    description: '日本の伝統文化である茶道の心を学ぶ。静寂な空間で抹茶を点てる瞑想的な時間。',
    icon: 'TreePine',
    duration: '1-2時間',
    priceRange: '¥3,000-5,000',
    location: '浅草・上野エリア'
  },
  {
    id: 'kimono-rental',
    name: '着物レンタル',
    description: '美しい着物を着て東京の街を散策。プロによる着付けとヘアセットで完璧な和装体験。',
    icon: 'Shirt',
    duration: '半日-1日',
    priceRange: '¥3,000-10,000',
    location: '浅草・原宿エリア'
  },
  {
    id: 'calligraphy',
    name: '書道体験',
    description: '筆と墨で日本の文字の美しさを表現。心を込めて一文字一文字を書く精神的な体験。',
    icon: 'Palette',
    duration: '1-2時間',
    priceRange: '¥2,000-4,000',
    location: '銀座・日本橋エリア'
  },
  {
    id: 'karaoke',
    name: 'カラオケ体験',
    description: '日本発祥のカラオケで思い切り歌って楽しむ。最新の設備と豊富な楽曲で盛り上がろう。',
    icon: 'Music',
    duration: '1-3時間',
    priceRange: '¥1,000-3,000',
    location: '渋谷・新宿エリア'
  },
  {
    id: 'photo-tour',
    name: 'フォトツアー',
    description: 'プロカメラマンと一緒に東京の隠れた撮影スポットを巡る。インスタ映えする写真を撮影。',
    icon: 'Camera',
    duration: '3-4時間',
    priceRange: '¥8,000-15,000',
    location: '東京各所'
  }
];

// アイコンのマッピング
const iconMap: Record<string, JSX.Element> = {
  Utensils: <Utensils size={32} />,
  TreePine: <TreePine size={32} />,
  Shirt: <Shirt size={32} />,
  Palette: <Palette size={32} />,
  Music: <Music size={32} />,
  Camera: <Camera size={32} />
};

type Props = {
  title: string;
  subtitle: string;
};

const CulturalActivitiesSection = ({ title, subtitle }: Props) => {
  // アニメーションのバリアント
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="py-16 md:py-20 bg-kinari">
      <Container>
        <SectionTitle title={title} subtitle={subtitle} center />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-wakatake bg-opacity-20 text-wakatake rounded-full p-3 mr-4">
                  {iconMap[activity.icon]}
                </div>
                <h3 className="text-lg font-semibold">{activity.name}</h3>
              </div>
              
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {activity.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">所要時間:</span>
                  <span className="text-gray-700">{activity.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">料金目安:</span>
                  <span className="text-gray-700">{activity.priceRange}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">エリア:</span>
                  <span className="text-gray-700">{activity.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 注意事項 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-white rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-3 text-deep-blue">
            体験予約について
          </h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li>事前予約が必要な体験が多いため、滞在前の予約をおすすめします</li>
            <li>料金は時期や内容により変動する場合があります</li>
            <li>言語対応状況は事前にご確認ください（多くの体験で英語対応可能）</li>
            <li>キャンセルポリシーは各体験により異なります</li>
            <li>詳細な予約方法は、各宿泊施設でご案内いたします</li>
          </ul>
        </motion.div>
      </Container>
    </section>
  );
};

export default CulturalActivitiesSection;