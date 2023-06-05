import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from './use-selector';

// Хук для проверки аутентификации пользователя и перенаправления 
// на страницу входа в случае необходимости.

export default function useProfileSession() {

  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn;
}

