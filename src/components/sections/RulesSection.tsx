'use client';

import { motion } from 'framer-motion';
import { Hotel } from '@/types/hotel';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { 
  Clock, 
  Cigarette, 
  Volume2, 
  PawPrint, 
  PartyPopper, 
  Bell 
} from 'lucide-react';

type Props = {
  hotel: Hotel;
  title: string;
};

const RulesSection = ({ hotel, title }: Props) => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // ルールに応じたアイコンを取得
  const getRuleIcon = (rule: string) => {
    if (rule.includes('禁煙')) {
      return <Cigarette size={20} />;
    } else if (rule.includes('騒音')) {
      return <Volume2 size={20} />;
    } else if (rule.includes('ペット')) {
      return <PawPrint size={20} />;
    } else if (rule.includes('パーティー') || rule.includes('イベント')) {
      return <PartyPopper size={20} />;
    } else if (rule.includes('チェックイン')) {
      return <Bell size={20} />;
    } else if (rule.includes('チェックアウト')) {
      return <Clock size={20} />;
    } else {
      return <Clock size={20} />;
    }
  };

  return (
    <section id="rules" className="py-16 md:py-20 bg-kinari">
      <Container>
        <SectionTitle title={title} center />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-10"
        >
          <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {hotel.rules.map((rule, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <div className="bg-deep-blue bg-opacity-10 p-2 rounded-full mr-3 text-deep-blue">
                    {getRuleIcon(rule)}
                  </div>
                  <div>
                    <p className="text-gray-700">{rule}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <h3 className="font-medium text-lg mb-3 text-deep-blue">
                注意事項
              </h3>
              <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>
                  上記ルールに違反された場合、追加料金や退去をお願いする場合があります
                </li>
                <li>
                  貴重品の管理は各自でお願いいたします。紛失・盗難の責任は負いかねます
                </li>
                <li>
                  施設内の備品を破損された場合は、相応の費用をご請求させていただく場合があります
                </li>
                <li>
                  緊急時の連絡先は施設内に掲示しています
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default RulesSection;