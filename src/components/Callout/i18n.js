import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from "react-i18next";
import enTranslation from './locales/en/en.json';
import frTranslation from './locales/fr/fr.json';
import cnTranslation from './locales/cn/cn.json';
import esTranslation from './locales/es/es.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  cn: {
    translation: cnTranslation,
  },
  es: {
    translation: esTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
