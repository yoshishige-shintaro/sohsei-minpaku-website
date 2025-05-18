'use client';

import { motion } from 'framer-motion';
import { Hotel } from '@/types/hotel';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { MapPin, Train, Car, Clock } from 'lucide-react';

type Props = {
  hotel: Hotel;
  title: string;
};

const AccessSection = ({ hotel, title }: Props) => {
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

  // アイコンのマッピング
  const getTransportIcon = (method: string) => {
    if (method.includes('タクシー') || method.includes('車')) {
      return <Car size={18} className="text-wakatake mr-2" />;
    } else if (method.includes('電車') || method.includes('駅')) {
      return <Train size={18} className="text-wakatake mr-2" />;
    } else {
      return <Clock size={18} className="text-wakatake mr-2" />;
    }
  };

  return (
    <section id="access" className="py-16 md:py-20 bg-white">
      <Container>
        <SectionTitle title={title} center />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* 左側: 地図 */}
          <motion.div variants={itemVariants} className="overflow-hidden rounded-lg shadow-md">
            <div className="relative w-full h-72 md:h-96">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  hotel.location.address
                )}&t=m&z=15&output=embed&iwloc=near`}
                title={`${hotel.name}の地図`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0"
              ></iframe>
            </div>
          </motion.div>

          {/* 右側: アクセス情報 */}
          <motion.div variants={itemVariants}>
            <div className="bg-kinari rounded-lg p-6 shadow-sm">
              <div className="flex items-start mb-4">
                <MapPin className="text-deep-blue mt-1 mr-2" size={20} />
                <div>
                  <h3 className="font-medium text-lg mb-1">所在地</h3>
                  <p className="text-gray-700">{hotel.location.address}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-lg mb-3">周辺スポットへのアクセス</h3>
                <ul className="space-y-4">
                  {hotel.location.nearbySpots.map((spot, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="flex items-start"
                    >
                      {getTransportIcon(spot.transportMethod)}
                      <div>
                        <h4 className="font-medium">{spot.name}</h4>
                        <p className="text-sm text-gray-600">
                          {spot.distance} • {spot.transportMethod}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-lg mb-3">交通アクセス</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  {hotel.id === 'kasai' ? (
                    <>
                      <li className="flex items-start">
                        <Train size={18} className="text-wakatake mr-2 mt-0.5" />
                        <span>JR総武線「葛西」駅から徒歩10分</span>
                      </li>
                      <li className="flex items-start">
                        <Car size={18} className="text-wakatake mr-2 mt-0.5" />
                        <span>首都高速湾岸線「葛西」ICから車で10分</span>
                      </li>
                      <li className="flex items-start">
                        <Car size={18} className="text-wakatake mr-2 mt-0.5" />
                        <span>無料駐車場1台分あり（要予約）</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <Train size={18} className="text-wakatake mr-2 mt-0.5" />
                        <span>東京メトロ「浅草」駅から徒歩15分</span>
                      </li>
                      <li className="flex items-start">
                        <Train size={18} className="text-wakatake mr-2 mt-0.5" />
                        <span>都営浅草線「本所吾妻橋」駅から徒歩5分</span>
                      </li>
                      <li className="flex items-start">
                        <Car size={18} className="text-wakatake mr-2 mt-0.5" />
                        <span>近隣にコインパーキングあり（有料）</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AccessSection;