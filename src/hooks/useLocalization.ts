import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage, LANGUAGES, type LanguageCode } from "../constants/internationalization";
import i18n from "../constants/internationalization";

export function useLocalization() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<LanguageCode>(
    (i18n.language as LanguageCode) || "en",
  );

  const setLanguageCode = useCallback(async (code: LanguageCode) => {
    await changeLanguage(code);
    setLanguage(code);
  }, []);

  return { t, language, languages: LANGUAGES, setLanguage: setLanguageCode };
}
