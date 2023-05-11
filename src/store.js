/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState
    this.listeners = [] // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener)
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener)
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener()
  }

  /**
   * Генератор уникальных чисел
   */
  generateNumber() {
    return Math.random().toString(36).substring(2, 6)
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.generateNumber(), title: 'Новая запись' },
      ],
    })
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    })
  }

  /**
   * Выделение записи по коду и подсчет числа нажатий
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          item.selected = !item.selected
          item.count > 0 ? item.count++ : item.count = 1
        } else {
          item.selected = false
        }
        return item
      }),
    })
  }
}

export default Store
