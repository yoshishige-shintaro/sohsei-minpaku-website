"use client";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { Hotel } from "@/types/hotel";
import { motion } from "framer-motion";
import {
  Bath,
  BedDouble,
  CookingPot,
  Microwave,
  RefrigeratorIcon,
  ShowerHead,
  Thermometer,
  Tv,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";

type Props = {
  hotel: Hotel;
  title: string;
};

// アイコンのマッピング
const amenityIconMap: Record<string, JSX.Element> = {
  "Wi-Fi": <Wifi size={20} />,
  エアコン: <Thermometer size={20} />,
  テレビ: <Tv size={20} />,
  冷蔵庫: <RefrigeratorIcon size={20} />,
  電子レンジ: <Microwave size={20} />,
  IHクッキングヒーター: <CookingPot size={20} />,
  洗濯乾燥機: <Waves size={20} />,
  "バスタオル・フェイスタオル": <Bath size={20} />,
  "シャンプー・コンディショナー・ボディソープ": <ShowerHead size={20} />,
  歯ブラシ: <Utensils size={20} />,
  プロジェクター: <Tv size={20} />,
};

const AmenitiesSection = ({ hotel, title }: Props) => {
  // アニメーションのバリアント
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="amenities" className="py-16 md:py-20 bg-kinari">
      <Container>
        <SectionTitle title={title} center />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-10"
        >
          {/* 部屋構成 */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8"
          >
            <h3 className="text-xl font-medium mb-4 text-deep-blue border-b border-gray-200 pb-2">
              部屋構成
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <BedDouble className="text-wakatake mr-2" size={20} />
                <span className="text-gray-700">広さ: {hotel.size}㎡</span>
              </div>
              <div className="flex items-center">
                <BedDouble className="text-wakatake mr-2" size={20} />
                <span className="text-gray-700">最大宿泊人数: {hotel.maxGuests}名</span>
              </div>
              {/* ホテルごとの部屋構成情報はデータに含めるべき */}
              <div className="flex items-center">
                <BedDouble className="text-wakatake mr-2" size={20} />
                <span className="text-gray-700">
                  ベッドルーム: {hotel.id === "kasai" ? "3部屋" : "2部屋"}
                </span>
              </div>
              <div className="flex items-center">
                <Bath className="text-wakatake mr-2" size={20} />
                <span className="text-gray-700">バスルーム: 1室</span>
              </div>
            </div>
          </motion.div>

          {/* アメニティ一覧 */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-xl font-medium mb-6 text-deep-blue border-b border-gray-200 pb-2">
              アメニティ・設備
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.amenities.map((amenity, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-center">
                  <span className="text-wakatake mr-2">
                    {amenityIconMap[amenity] || <Utensils size={20} />}
                  </span>
                  <span className="text-gray-700 text-sm">{amenity}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 注意事項 */}
          <motion.div
            variants={itemVariants}
            className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-xl font-medium mb-4 text-deep-blue border-b border-gray-200 pb-2">
              備考
            </h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
              <li>全館禁煙です</li>
              <li>ペットの同伴はできません</li>
              <li>パーティーやイベントの開催はご遠慮ください</li>
              <li>チェックイン前・チェックアウト後の荷物預かりは対応しておりません</li>
              <li>
                {hotel.id === "kasai"
                  ? "駐車場は1台分無料でご利用いただけます（事前予約制）"
                  : "駐車場はございません。近隣のコインパーキングをご利用ください"}
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AmenitiesSection;
