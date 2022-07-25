import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // here we will place our translations...
    resources: {
      en: { 
        translation: { 
          callout: "Callout Type:" 
        }
      },
      fr: { 
        translation: { 
          callout: "Type de légende :" 
        }
      },
    },
  });

export default i18n;
