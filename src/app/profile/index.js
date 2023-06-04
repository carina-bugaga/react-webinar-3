import {memo, useEffect} from 'react';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import SignIn from '../../containers/sign-in';
import Spinner from "../../components/spinner";
import ProfileForm from '../../components/profile-form';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const select = useSelector(state => ({ 
      userName: state.user.userName,
      phone: state.user.phone,
      email: state.user.email,
      waiting: state.user.waiting,
      isLoggedIn: state.user.isLoggedIn,
    }));

  useEffect(() => {
    if(!select.isLoggedIn && !localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [select.isLoggedIn]); 

  const {t} = useTranslate();

  return (
    <PageLayout>
      <SignIn/>
      <Head title={t('profile')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileForm user={select.userName} phone={select.phone} email={select.email} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
