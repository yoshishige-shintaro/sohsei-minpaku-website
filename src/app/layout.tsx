import '@/styles/globals.css';
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${notoSerifJp.variable}`}>
      <body>
        {/* ルートレイアウトは単にリダイレクト用のページをレンダリング */}
        {children}
      </body>
    </html>
  );
}
