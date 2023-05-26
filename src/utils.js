/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Пагинация
 * @param {number} currentPage 
 * @param {number} count 
 * @returns Список номеров страниц для пагинации
 */
export function pagination(currentPage, count) {

  const totalPages = Math.ceil(count / 10);
  const maxPagesToShow = 5; // максимальное количество страниц, которые нужно показать
  const pages = [];
  let startPage, endPage;

  if (totalPages <= maxPagesToShow) {
    // показываем все страницы, если их меньше или равно максимальному количеству
    startPage = 1;
    endPage = totalPages;
  } else {
    // иначе показываем несколько страниц вокруг текущей страницы
    if (currentPage == 1) {
      startPage = 1;
      endPage = 3;
    } else if (currentPage == totalPages) {
      startPage = totalPages - 2;
      endPage = totalPages;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }
  }

  // добавляем в массив страницы и разделительные точки
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push(null);
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  if (endPage < totalPages - 1) {
    pages.push(null);
  }
  if (endPage < totalPages) {
    pages.push(totalPages);
  }

  return pages;
}
