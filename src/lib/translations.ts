import { Locale } from '@/lib/i18n';

// 指定したロケールの翻訳データを読み込む関数
export async function getTranslations(locale: Locale) {
  try {
    // 翻訳ファイルの動的インポート
    const translations = await import(`@/locales/${locale}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    // エラー時はからのオブジェクトを返す
    return {};
  }
}

// ネストされたオブジェクトからキーパスに基づいて値を取得する関数
export function getTranslation(obj: any, path: string, defaultValue: string = '') {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }

  return result || defaultValue;
}