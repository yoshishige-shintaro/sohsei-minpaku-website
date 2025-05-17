import { Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

export default async function LocalePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const translations = await getTranslations(params.locale);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-4">{translations.common.title}</h1>
        <p className="text-xl mb-8">{translations.common.description}</p>
        <p>実装進捗: 2/9 完了</p>
        <p className="text-gray-600 mt-4">共通コンポーネント（ヘッダー、フッター、レイアウト）を実装しました</p>
      </section>
    </div>
  );
}
