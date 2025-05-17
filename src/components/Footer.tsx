import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { Locale } from '@/lib/i18n';

type Props = {
  locale: Locale;
  footer: {
    copyright: string;
    privacyPolicy: string;
    contact: string;
  };
};

const Footer = ({ locale, footer }: Props) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-blue text-white pt-12 pb-16 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ロゴと説明 */}
          <div>
            <Link href={`/${locale}`} className="inline-block mb-4">
              <span className="font-serif text-xl md:text-2xl font-bold">
                Kasai & Sushi Art
              </span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              東京の魅力を体験する特別な宿泊体験をご提供します。葛西ホテルと寿司アートホテルで思い出に残る滞在を。
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-sakura transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-sakura transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:info@example.com"
                className="text-white hover:text-sakura transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* クイックリンク */}
          <div>
            <h3 className="text-lg font-medium mb-4">リンク</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-white transition-colors"
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/kasai-hotel`}
                  className="hover:text-white transition-colors"
                >
                  葛西ホテル
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/sushi-art-hotel`}
                  className="hover:text-white transition-colors"
                >
                  寿司アートホテル
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/area`}
                  className="hover:text-white transition-colors"
                >
                  地域の魅力
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/faq`}
                  className="hover:text-white transition-colors"
                >
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="text-lg font-medium mb-4">{footer.contact}</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">〒132-0035</p>
              <p className="mb-2">東京都江戸川区平井1-2-3</p>
              <p className="mb-2">
                <a
                  href="tel:+81-3-1234-5678"
                  className="hover:text-white transition-colors"
                >
                  03-1234-5678
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@example.com"
                  className="hover:text-white transition-colors"
                >
                  info@example.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            {footer.copyright.replace('2025', currentYear.toString())}
          </p>
          <div className="flex space-x-4 text-sm text-gray-400">
            <Link
              href={`/${locale}/privacy-policy`}
              className="hover:text-white transition-colors"
            >
              {footer.privacyPolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;