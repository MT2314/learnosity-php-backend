import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // here we will place our translations...
    // resources: {
    //   en: { 
    //     translation: { 
    //       callout: "Callout Type:" 
    //     }
    //   },
    //   fr: { 
    //     translation: { 
    //       callout: "Type de légende :" 
    //     }
    //   },
    //   ch: { 
    //     translation: { 
    //       callout: "标注类型:" 
    //     }
    //   },
    // },
  });

export default i18n;
