import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import useTranslate from '../../hooks/use-translate';

function ProfileForm({user, phone, email}){

  const cn = bem('ProfileForm');

  // Функция для локализации текстов
  const {t} = useTranslate();

  return (
    <div className={cn()}>
      <h2>{t('profile')}</h2>
      <div className={cn('line')}>
        <div className={cn('field')}>{t('user.name')}: </div>
        <div className={cn('bold')}>{user}</div>
      </div>
      <div className={cn('line')}>
        <div className={cn('field')}>{t('phone')}: </div>
        <div className={cn('bold')}>{phone}</div>
      </div>
      <div className={cn('line')}>
        <div className={cn('field')}>{t('email')} : </div>
        <div className={cn('bold')}>{email}</div>
      </div>
    </div>
  )
}

ProfileForm.propTypes = {
  user: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
};

export default memo(ProfileForm);
