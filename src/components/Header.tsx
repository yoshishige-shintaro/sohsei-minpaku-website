"use client";

import { Locale } from "@/lib/i18n";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

type NavItem = {
  href: string;
  label: string;
};

type Props = {
  locale: Locale;
  nav: {
    home: string;
    kasaiHotel: string;
    sushiArtHotel: string;
    sushiArtHotelIchinoe: string;
    area: string;
    faq: string;
  };
};

export const Header = ({ locale, nav }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/kasai-hotel`, label: nav.kasaiHotel },
    { href: `/${locale}/sushi-art-hotel`, label: nav.sushiArtHotel },
    { href: `/${locale}/sushi-art-hotel-ichinoe`, label: nav.sushiArtHotelIchinoe },
    // { href: `/${locale}/area`, label: nav.area },
    { href: `/${locale}/faq`, label: nav.faq },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // アクティブなナビゲーションアイテムかどうかを判定
  const isActive = (href: string) => {
    if (href === `/${locale}` && pathname === `/${locale}`) {
      return true;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* ロゴ */}
        <Link href={`/${locale}`} className="flex items-center">
          <span className="text-deep-blue font-serif text-xl md:text-2xl font-bold">
            Kasai & Sushi Art
          </span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                isActive(item.href)
                  ? "text-deep-blue font-bold"
                  : "text-gray-600 hover:text-deep-blue"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} />
        </nav>

        {/* モバイルメニューボタン */}
        <button
          className="md:hidden text-deep-blue"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "閉じる" : "メニューを開く"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* モバイルナビゲーション */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg pb-4">
          <nav className="flex flex-col space-y-3 px-4 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm py-2 px-3 rounded font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? "bg-kinari text-deep-blue font-bold"
                    : "text-gray-600 hover:text-deep-blue hover:bg-gray-100"
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 px-3">
              <LanguageSwitcher locale={locale} />
            </div>
          </nav>
        </div>
      )}

      {/* 予約ボタン（モバイル固定） */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-3 z-50">
        <a
          href="#booking"
          className="block w-full text-center bg-deep-blue text-white py-3 px-4 rounded-md font-medium"
        >
          予約する
        </a>
      </div>
    </header>
  );
};

export default Header;
