export default {
  /**
   * Загрузка комментария
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего списка комментариев и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});
      
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=*,author(profile)`
        });
        // Комментарии загружен успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
        
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  /**
   * Добавление комментария
   * @param text 
   * @param parent 
   * @returns {Function}
   */
  addComment: (text, parent) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/add-start'});
      const obj = {text, parent}
      
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=*,author(profile)`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj)
        });
        // Комментарий добавлен успешно
        dispatch({type: 'comments/add-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/add-error'});
      }
    }
  },
}
