import * as translations from './translations';

class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
     // Храним текущую локаль в состоянии сервиса
    this.locale = 'ru';
  }
    /**
   * Перевод фразу по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(lang = this.locale, text, plural) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined'){
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  // Метод для изменения текущей локали
  setLocale(locale) {
    this.locale = locale;
  }
}

export default I18nService;

