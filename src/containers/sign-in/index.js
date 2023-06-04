import {memo, useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import LoginTool from "../../components/login-tool";


function SignIn() {

  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    userName: state.user.userName,
    error: state.user.error,
    waiting: state.user.waiting,
    isLoggedIn: state.user.isLoggedIn,
  }));

  useEffect(() => {
    if(!select.isLoggedIn && localStorage.getItem('token')) {
      store.actions.user.loginByToken();
    }
  }, []);

  const callbacks ={
    // Выход пользователя
    logout: useCallback(() => store.actions.user.logout(), [store]),
  };
  
  //Проверка авторизации пользователя
  const checkLogin = () => {
    if(!select.isLoggedIn) {navigate('/login')};
  };

  // Функция для локализации текстов
  const {t} = useTranslate();

  return (
    <SideLayout side='end' border='bottom'>
        <LoginTool btnIn={t('sign.in')} 
                   btnOut={t('sign.out')} 
                   logout={callbacks.logout}
                   checkLogin={checkLogin}
                   isLoggedIn={select.isLoggedIn}
                   link='/profile' 
                   userName={select.userName}/>
    </SideLayout>
  );
}

export default memo(SignIn);
