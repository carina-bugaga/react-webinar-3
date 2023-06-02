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
 * Создание дерева из массива объектов
 */
export function listToTree(list) {
  let map = {}, node, roots = [];

  for (let i = 0; i < list.length; i++) {
    map[list[i]._id] = i;
    list[i].children = [];
  }

  for (let i = 0; i < list.length; i++) {
    node = list[i];
    if (node.parent != undefined) {
      list[map[node.parent._id]].children.push(node);
    } else {
        roots.push(node);
      }
  }
  return roots;
}

/**
 * Создание категорий с добавление префикса из дерева
 */
export function traverse(object, pref = '', res = []) {
  let result = res;

  for(let i of object) {
    let prefix = pref;
    result.push({value:i._id, title:(prefix + i.title)});
    
    if (i.children !== undefined) {
      // если есть children идем вглубь и добавляем префикс
      prefix += '-';
      traverse(i.children, prefix, result);
    } else {
      // если нет сокращаем префикс
      prefix = prefix.slice(0, -1);
    }
  }
  return result;
}