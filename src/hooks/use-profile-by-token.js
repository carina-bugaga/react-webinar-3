import { useEffect } from 'react';
import useSelector from './use-selector';
import useStore from './use-store';

// Хук для проверки аутентификации пользователя по токену

export default function useProfileByToken() {

  const store = useStore();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  
  useEffect(() => {
    if(!isLoggedIn && localStorage.getItem('token')) {
      store.actions.user.loginByToken();
    }
  }, []);
}
