import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./locales/en.json";
import es from "./locales/es.json";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

const STORAGE_KEY = "cityride.language";

function deviceLanguage(): LanguageCode {
  const locales = Localization.getLocales();
  const code = locales?.[0]?.languageCode ?? "en";
  return (LANGUAGES.find((l) => l.code === code)?.code ?? "en") as LanguageCode;
}

let initialized = false;

export async function initI18n(): Promise<void> {
  if (initialized) return;
  initialized = true;

  let saved: LanguageCode = deviceLanguage();
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGES.some((l) => l.code === stored)) {
      saved = stored as LanguageCode;
    }
  } catch {
    saved = deviceLanguage();
  }

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: saved,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export async function changeLanguage(code: LanguageCode): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, code);
  await i18n.changeLanguage(code);
}

export default i18n;
