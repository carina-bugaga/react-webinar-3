import {memo, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
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
  const store = useStore();
  const navigate = useNavigate();

  useInit(() => {
    store.actions.profile.getProfileData();
  }, []);

  const select = useSelector(state => ({ 
      userName: state.profile.userName,
      phone: state.profile.phone,
      email: state.profile.email,
      waiting: state.profile.waiting,
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
