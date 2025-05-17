import { defaultLocale } from '@/lib/i18n';
import { redirect } from 'next/navigation';

// ルートページはデフォルトのロケールにリダイレクト
export default function Home() {
  redirect(`/${defaultLocale}`);
}
