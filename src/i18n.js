import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationES from '../public/locales/es/translation.json'

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  es: {
    translation: translationES
  }
}
const detection = {
  order: ['navigator', 'localStorage'],
  lookupQuerystring: 'lng',
  caches: ['localStorage']
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection
  })

export default i18n
