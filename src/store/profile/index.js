import StoreModule from "../module";

/**
 * Детальная информация о профиле пользователя
 */
class Profile extends StoreModule {

  initState() {
    return {
      userName: '',
      phone: '',
      email: '',
      waiting: false
    }
  }

   /**
   * Получение данных авторизованного пользователя (по токену)
   */
   async getProfileData() {
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
      }, 'Получены данные пользователя');
      })
      
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        userName: '',
        phone: '',
        email: '',
        error: error.message,
        waiting: false
      });
    }
  }  

}

export default Profile;
