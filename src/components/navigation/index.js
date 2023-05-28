import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";
import useTranslation from '../../store/use-translate';

function Navigation() {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <div className={cn('link')}><Link to="/">{useTranslation('main')}</Link></div>
    </div>
  );
}

export default memo(Navigation);
