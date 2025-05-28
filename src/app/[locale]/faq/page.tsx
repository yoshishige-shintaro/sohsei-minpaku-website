import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import FAQSection from '@/components/sections/FAQSection';

// メタデータの生成
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const translations = await getTranslations(params.locale);
  
  return {
    title: `${translations.faq.title} | ${translations.common.title}`,
    description: translations.faq.subtitle,
    openGraph: {
      title: `${translations.faq.title} | ${translations.common.title}`,
      description: translations.faq.subtitle,
      locale: params.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${translations.faq.title} | ${translations.common.title}`,
      description: translations.faq.subtitle,
    },
  };
}

// よくある質問ページコンポーネント
export default async function FAQPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale;
  const translations = await getTranslations(locale);

  return (
    <main>
      <FAQSection
        title={translations.faq.title}
        subtitle={translations.faq.subtitle}
        faqItems={translations.faq.items}
        categories={translations.faq.categories}
      />
    </main>
  );
}
