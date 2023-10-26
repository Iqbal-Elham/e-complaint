// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import faTranslation from "./locales/fa.json";
import psTranslation from "./locales/ps.json";

const resources = {
  fa: {
    translation: faTranslation,
  },
  ps: {
    translation: psTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fa", // Default language
  fallbackLng: "fa", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
