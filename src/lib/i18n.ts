import uk from "@/../public/locales/uk/common.json";
import en from "@/../public/locales/en/common.json";

const translations = { uk, en };

export function getTranslation(locale: string) {
  return translations[locale as keyof typeof translations] || translations.en;
}
