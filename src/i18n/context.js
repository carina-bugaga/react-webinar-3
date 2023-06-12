import {createContext, useMemo, useState} from "react";
import useServices from '../hooks/use-services';

/**
 * @type {React.Context<{}>}
 */
export const I18nContext = createContext({});

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */
export function I18nProvider({children}) {
  const services = useServices();
  const [locale, setLocale] = useState(() => services.i18n.locale);

  const i18n = useMemo(() => ({
    // Код локали
    lang: locale,
    // Функция для смены локали
    setLang: setLocale,
    // Функция для локализации текстов с замыканием на код языка
    t: (text, number) => services.i18n.translate(locale, text, number)
  }), [locale]);

  return (
    <I18nContext.Provider value={i18n}>
      {children}
    </I18nContext.Provider>
  );
}
