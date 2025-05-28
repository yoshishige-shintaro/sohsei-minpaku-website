'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { 
  Snowflake, 
  Flower, 
  Sun, 
  Leaf 
} from 'lucide-react';

type SeasonalRecommendation = {
  season: string;
  period: string;
  icon: string;
  color: string;
  highlights: string[];
  activities: string[];
  weather: string;
  clothing: string;
};

const seasons: SeasonalRecommendation[] = [
  {
    season: '春',
    period: '3月〜5月',
    icon: 'Flower',
    color: 'text-pink-500',
    highlights: [
      '桜の満開（3月下旬〜4月上旬）',
      '上野公園・千鳥ヶ淵の桜',
      '花見シーズン',
      '過ごしやすい気候'
    ],
    activities: [
      '花見・桜祭り',
      '公園散策',
      '屋外カフェ',
      '庭園巡り'
    ],
    weather: '10-20°C、晴れ・雨',
    clothing: '軽い上着、レイヤー重ね'
  },
  {
    season: '夏',
    period: '6月〜8月',
    icon: 'Sun',
    color: 'text-yellow-500',
    highlights: [
      '夏祭り・花火大会',
      '隅田川花火大会',
      '浅草ほおずき市',
      '夏の風物詩体験'
    ],
    activities: [
      '花火大会',
      '夏祭り',
      '水族館',
      '屋内アクティビティ'
    ],
    weather: '25-35°C、高温多湿',
    clothing: '軽装、日焼け対策、傘'
  },
  {
    season: '秋',
    period: '9月〜11月',
    icon: 'Leaf',
    color: 'text-orange-500',
    highlights: [
      '紅葉の美しさ',
      '明治神宮・六義園の紅葉',
      '食欲の秋',
      '快適な観光シーズン'
    ],
    activities: [
      '紅葉狩り',
      '食べ歩き',
      '温泉・銭湯',
      '文化祭・イベント'
    ],
    weather: '15-25°C、晴れ・爽やか',
    clothing: '長袖、カーディガン'
  },
  {
    season: '冬',
    period: '12月〜2月',
    icon: 'Snowflake',
    color: 'text-blue-500',
    highlights: [
      'イルミネーション',
      '六本木・表参道のライトアップ',
      '温かい料理',
      '初詣・お正月'
    ],
    activities: [
      'イルミネーション巡り',
      '初詣',
      '温かい料理',
      '屋内観光'
    ],
    weather: '0-10°C、晴れ・乾燥',
    clothing: '厚手のコート、防寒具'
  }
];

// アイコンのマッピング
const iconMap: Record<string, JSX.Element> = {
  Flower: <Flower size={48} />,
  Sun: <Sun size={48} />,
  Leaf: <Leaf size={48} />,
  Snowflake: <Snowflake size={48} />
};

type Props = {
  title: string;
  subtitle: string;
};

const SeasonalRecommendationsSection = ({ title, subtitle }: Props) => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {seasons.map((season, index) => (
            <motion.div
              key={season.season}
              variants={itemVariants}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className={`${season.color} mr-4`}>
                  {iconMap[season.icon]}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{season.season}</h3>
                  <p className="text-gray-600">{season.period}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-deep-blue mb-2">見どころ</h4>
                  <ul className="space-y-1">
                    {season.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-wakatake mr-2 mt-1">•</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-deep-blue mb-2">おすすめ活動</h4>
                  <div className="flex flex-wrap gap-2">
                    {season.activities.map((activity, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">気候</h5>
                    <p className="text-gray-600">{season.weather}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">服装</h5>
                    <p className="text-gray-600">{season.clothing}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 年間を通じてのおすすめ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4 text-deep-blue">
            年間を通じてのおすすめ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">屋内スポット</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• 美術館・博物館</li>
                <li>• デパート・ショッピングモール</li>
                <li>• 水族館・動物園</li>
                <li>• 温泉・スパ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">グルメ体験</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• 寿司・日本料理</li>
                <li>• ラーメン・居酒屋</li>
                <li>• 和菓子・抹茶</li>
                <li>• デパ地下グルメ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">文化体験</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• 茶道・書道体験</li>
                <li>• 着物レンタル</li>
                <li>• 歌舞伎・能楽</li>
                <li>• 寺社参拝</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default SeasonalRecommendationsSection;