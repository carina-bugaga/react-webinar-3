import useSelector from "../store/use-selector";
import JSONtranslate from 'translate.json';

/**
 * Хук для перевода 
 * @return {Store}
 */
export default function useTranslation(key) {
  
  const select = useSelector(state => ({
    lang: state.lang.lang,
  }));

    return JSONtranslate[select.lang][key];

}