"use client";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { Hotel } from "@/types/hotel";
import { motion } from "framer-motion";
import {
  Bike,
  Car,
  Hammer,
  Home,
  LandPlot,
  Laptop,
  MapPin,
  Thermometer,
  Users,
  Wifi,
} from "lucide-react";

type Props = {
  hotel: Hotel;
  title: string;
};

// アイコンのマッピング
const iconMap: Record<string, JSX.Element> = {
  Home: <Home size={24} />,
  Users: <Users size={24} />,
  Car: <Car size={24} />,
  Wifi: <Wifi size={24} />,
  MapPin: <MapPin size={24} />,
  LandPlot: <LandPlot size={24} />,
  Bike: <Bike size={24} />,
  Laptop: <Laptop size={24} />,
  Hammer: <Hammer size={24} />,
  Thermometer: <Thermometer size={24} />,
};

const OverviewSection = ({ hotel, title }: Props) => {
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

  return (
    <section id="overview" className="py-16 md:py-20 bg-kinari">
      <Container>
        <SectionTitle title={title} center />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* 左側: 施設概要 */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 border-b border-gray-300 pb-2">
              {hotel.name}について
            </h3>
            <p className="text-gray-700 mb-6">{hotel.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Users className="text-deep-blue mr-2" size={18} />
                <span className="text-gray-700 text-sm">最大{hotel.maxGuests}名</span>
              </div>
              <div className="flex items-center">
                <LandPlot className="text-deep-blue mr-2" size={18} />
                <span className="text-gray-700 text-sm">{hotel.size}㎡</span>
              </div>
              <div className="flex items-center">
                <Car className="text-deep-blue mr-2" size={18} />
                <span className="text-gray-700 text-sm">
                  {hotel.parking ? "駐車場あり" : "駐車場なし"}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-deep-blue mr-2" size={18} />
                <span className="text-gray-700 text-sm">{hotel.location.address}</span>
              </div>
            </div>
          </motion.div>

          {/* 右側: 特徴 */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 border-b border-gray-300 pb-2">特徴</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {hotel.features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-wakatake bg-opacity-10 p-4 rounded-full mb-3 text-wakatake">
                    {iconMap[feature.icon]}
                  </div>
                  <h4 className="font-medium mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* 強みと弱み */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* 左側: 強み */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 text-deep-blue">強み</h3>
            <ul className="space-y-2">
              {hotel.strengths.map((strength, index) => (
                <motion.li key={index} variants={itemVariants} className="flex items-start">
                  <span className="text-wakatake mr-2 mt-1">✓</span>
                  <span className="text-gray-700">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 右側: 弱み */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 text-deep-blue">注意点</h3>
            <ul className="space-y-2">
              {hotel.weaknesses.map((weakness, index) => (
                <motion.li key={index} variants={itemVariants} className="flex items-start">
                  <span className="text-gray-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{weakness}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default OverviewSection;
