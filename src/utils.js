const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Cклонение слов в зависимости от количества/числа/цифры/суммы
 * @param n число 
 * @param word склоняемое слово 
 * @param forms варианты окончаний
 * @returns склоненное слово
 */
export function pluralize(n, word, forms) {
  return word + (n % 10 == 1 && n % 100 != 11
        ? forms[0]
        : (n % 10 >= 2 && n % 10 <= 4
        && (n % 100 < 10
            || n % 100 >= 20) ? forms[1] : forms[2]));
}
