import StoreModule from "../module";

/**
 * Состояние пользователя
 */
class UserState extends StoreModule {

  initState() {
    return {
      userName: '',
      phone: '',
      email: '',
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
   
      await fetch('/api/v1/users/sign',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => { 
          localStorage.setItem('token', data.result.token);
          this.setState({
            userName: data.result.user.profile.name,
            phone: data.result.user.profile.phone,
            email: data.result.user.email,
            waiting: false,
            isLoggedIn: true,
          }, 'Пользователь авторизован');
        })
      
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
          phone: data.result.profile.phone,
          email: data.result.email,
          waiting: false,
          isLoggedIn: true,
      }, 'Авторизация по токену');
      })
      
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        userName: '',
        phone: '',
        email: '',
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
    this.setState({
      waiting: true
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
      localStorage.removeItem('token');
      this.setState({
        userName: '',
        phone: '',
        email: '',
        waiting: false,
        isLoggedIn: false,
      });
    }
  }
}

export default UserState;
