import {useContext} from "react";
import {I18nContext} from "../i18n/context";  

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {

  const { lang, setLang, t } = useContext(I18nContext);

  // Возвращаем объект с текущей локалью, функцией для ее изменения и функцией для перевода текстов
  return {
    lang,
    setLang,
    t
  };
}
