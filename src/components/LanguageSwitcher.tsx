'use client';

import { Locale, locales } from '@/lib/i18n';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  locale: Locale;
};

const LanguageSwitcher = ({ locale }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 現在のパスから言語を切り替えた新しいパスを生成
  const switchLanguage = (newLocale: Locale) => {
    // すでに選択されている言語の場合は何もしない
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // パスから現在のロケールを除去
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  // 表示名マッピング
  const localeNames: Record<Locale, string> = {
    ja: '日本語',
    en: 'English',
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-deep-blue"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={16} />
        <span>{localeNames[locale]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLanguage(l)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  l === locale
                    ? 'bg-kinari text-deep-blue font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                role="menuitem"
              >
                {localeNames[l]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;