import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState, products: {list: [], totalPrice: 0}};
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }

  /**
   * Добавление товаров в корзину
   * @param listItem
   */
  addProduct(listItem) {
    const newBasketState = {};
    const products = this.state.products;
    const itemToAdd = this.state.list.find((item) => item.code == listItem.code);
    const isProductAlreadyInBasket = products.list.some((item) => item.code == listItem.code);

    if (isProductAlreadyInBasket) {
      newBasketState.list = products.list.map((item) => {
        if (item.code == listItem.code) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    } else {
      newBasketState.list = [...products.list, { ...itemToAdd, count: 1 }];
    }

    newBasketState.totalPrice = products.list.reduce((acc, item) => acc + item.price * item.count, 0) + itemToAdd.price;
    this.setState({ ...this.state, products: newBasketState });
  }  

   /**
   * Удаление товаров из корзины
   * @param listItem
   */
  removeProduct(listItem) {
    const newBasketState = {};
    const products = this.state.products;   
    const productInBasket = products.list.find((item) => item.code == listItem.code);
    newBasketState.list = [...products.list.filter((item) => item.code != listItem.code)];
    newBasketState.totalPrice = products.totalPrice - productInBasket.price * productInBasket.count;
    this.setState({...this.state, products: newBasketState});
  } 
}

export default Store;
