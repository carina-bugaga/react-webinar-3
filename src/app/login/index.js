import {memo, useCallback, useEffect, useState} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import SignIn from '../../containers/sign-in';
import SideLayout from '../../components/side-layout';
import Spinner from "../../components/spinner";
import LoginForm from '../../components/login-form';
import { useNavigate } from 'react-router-dom';

function Login() {

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    error: state.user.error,
    waiting: state.user.waiting,
    isLoggedIn: state.user.isLoggedIn,
  }));
  const [values, setValues] = useState({login: '', password: ''});

  useEffect(() => {
    if (select.isLoggedIn) {navigate('/');}}, [select.isLoggedIn]);
  
  function handleLoginUser(e) {
    e.preventDefault();
    callbacks.loginUser(values);
  }

  const callbacks = {
    // Авторизация пользователя
    loginUser: useCallback(data => store.actions.user.login(data), [values]),
  };

  const {t} = useTranslate();

  return (
    <PageLayout>
      <SignIn/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <SideLayout side='start'>
        <Spinner active={select.waiting}>
          <LoginForm values={values} 
                     setValues={setValues}
                     error={select.error} 
                     loginUser={handleLoginUser}/>
        </Spinner>
      </SideLayout>
    </PageLayout>
  );
}

export default memo(Login);
