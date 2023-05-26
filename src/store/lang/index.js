import StoreModule from "../module";

class Lang extends StoreModule {

    initState() {
        return {
          lang: 'ru',
        };
      }

  loadLanguage(lang) {
    this.setState({
      ...this.getState(),
      lang: lang,
    },'Переключение языка');
  }
}

export default Lang;
