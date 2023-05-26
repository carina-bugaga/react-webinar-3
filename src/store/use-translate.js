import useSelector from "../store/use-selector";
import json from 'translate.json';

/**
 * Хук для перевода 
 * @return {Store}
 */
export default function useTranslation(key) {
  
  const select = useSelector(state => ({
    lang: state.lang.lang,
  }));
  
  return json[select.lang][key];
}