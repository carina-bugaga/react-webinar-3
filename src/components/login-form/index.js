import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import useTranslate from '../../hooks/use-translate';
import Input from '../input';

function LoginForm({values, setValues, error, loginUser}){

  const cn = bem('LoginForm');

  // Функция для локализации текстов
  const {t} = useTranslate();

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('sign.in')}</h2>
      <div className={cn('field')}>{t('login')}</div>
      <Input type='text' value={values.login} onChange={e => setValues({...values, login: e})} theme='small'/> 
      <div className={cn('field')}>
        {t('password')}
      </div>
      <Input type='password' value={values.password} onChange={e => setValues({...values, password: e})} theme='small'/>
      {error && <div className={cn('error')}>{error}</div>}
      <br/>
      <button type='submit' className={cn('btn')} onClick={loginUser}>
        {t('login.in')}
      </button>
    </div>
  )
}

LoginForm.propTypes = {
  values: PropTypes.object,
  setValues: PropTypes.func,
  error: PropTypes.string,
  loginUser: PropTypes.func,
};

export default memo(LoginForm);
