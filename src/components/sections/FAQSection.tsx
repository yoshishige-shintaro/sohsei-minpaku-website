'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

type Props = {
  title: string;
  subtitle: string;
  faqItems: FAQItem[];
  categories: {
    all: string;
    booking: string;
    facilities: string;
    access: string;
    pricing: string;
    rules: string;
    other: string;
  };
};

const FAQSection = ({ title, subtitle, faqItems, categories }: Props) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredItems = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const categoryTabs = [
    { key: 'all', label: categories.all },
    { key: 'booking', label: categories.booking },
    { key: 'facilities', label: categories.facilities },
    { key: 'access', label: categories.access },
    { key: 'pricing', label: categories.pricing },
    { key: 'rules', label: categories.rules },
    { key: 'other', label: categories.other },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <SectionTitle title={title} subtitle={subtitle} />

        {/* カテゴリータブ */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === tab.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ項目 */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    {openItems.includes(item.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {openItems.includes(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                          {item.answer.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-2 last:mb-0">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* お問い合わせセクション */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              他にご質問はありますか？
            </h3>
            <p className="text-gray-600 mb-6">
              上記以外のご質問やご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
