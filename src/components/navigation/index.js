import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";
import useTranslation from '../../store/use-translate';

function Navigation({address}) {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <div className={cn('link')}><Link to={address}>{useTranslation('main')}</Link></div>
    </div>
  );
}

Navigation.PropTypes = {
  address: PropTypes.string,
};

export default memo(Navigation);
