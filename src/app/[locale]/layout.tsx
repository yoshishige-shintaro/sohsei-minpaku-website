import '@/styles/globals.css';
import { defaultLocale, Locale, locales } from '@/lib/i18n';
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import { notFound } from 'next/navigation';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
});

const notoSerifJp = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-serif-jp',
});

export const metadata = {
  title: {
    default: '葛西ホテル & 寿司アートホテル',
    template: '%s | 葛西ホテル & 寿司アートホテル',
  },
  description: '東京の魅力を体験する特別な宿泊体験',
};

// ローケールの確認
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // ローケールが有効かチェック
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${notoSansJp.variable} ${notoSerifJp.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
