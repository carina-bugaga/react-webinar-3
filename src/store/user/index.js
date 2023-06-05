import StoreModule from "../module";

/**
 * Состояние пользователя
 */
class UserState extends StoreModule {

  initState() {
    return {
      userName: '',
      error: '',
      waiting: false,
      isLoggedIn: false
    }
  }

  /**
   * Авторизация пользователя
   */
  async login(data) {
    // Установка признака ожидания загрузки
    this.setState({
      waiting: true
    })

    try {
      if (!data.login.length) {
        throw new Error('Введите логин');
      }
      if (!data.password.length) {
        throw new Error('Введите пароль');
      }
   
      const response = await fetch('/api/v1/users/sign',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(data),
        });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error.data.issues[0].message);
      } else {
        localStorage.setItem('token', body.result.token);
        this.setState({
          userName: body.result.user.profile.name,
          waiting: false,
          isLoggedIn: true,
        }, 'Пользователь авторизован');
      }
      
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        error: error.message,
        waiting: false
      });
    }
  }
    
    /**
   * Вход для авторизованного пользователя (по токену)
   */
  async loginByToken() {
    // Установка признака ожидания загрузки
    this.setState({
      waiting: true
    })

    try {
      await fetch('/api/v1/users/self',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Token': localStorage.getItem('token')
        },
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          userName: data.result.profile.name,
          waiting: false,
          isLoggedIn: true,
      }, 'Авторизация по токену');
      })
      
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        userName: '',
        error: error.message,
        isLoggedIn: false,
        waiting: false
      });
    }
  }  

  /**
   * Выход пользователя
   */
  async logout() {
    // Установка признака ожидания загрузки
    localStorage.removeItem('token')
    this.setState({
      waiting: true,
      userName: '',
      isLoggedIn: false,
    })

    try {
      await fetch('/api/v1/users/sign',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': localStorage.getItem('token')
          },
        }
      );
    } finally {
      this.setState({
        ...this.getState(),
        waiting: false
      });
    }
  }

  dropError() {
    this.setState({
      ...this.getState(),
      error: '',
    }, 'Обнуление текста ошибки');
  }
}

export default UserState;
