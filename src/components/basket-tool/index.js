import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import useTranslation from '../../store/use-translate';

function BasketTool({sum, amount, onOpen, lang}) {
  const cn = bem('BasketTool');

  const translateAmount = (amount) => {
   const empty =  useTranslation('empty');
    if (amount) {
      if (lang == 'ru') {
        return `${amount} ${plural(amount, {one:'товар', few:'товара', many:'товаров'})} / ${numberFormat(sum)} ₽`
      } else {
        return `${amount} ${plural(amount, {one:'product', other:'products'},'en-US')} / ${numberFormat(sum)} ₽`
      }
    } else {
      return empty;
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('link')}><Link to="/">{useTranslation('main')}</Link></div>
      <div className={cn('right')}>
        <span className={cn('label')}>{useTranslation('inBasket')}:</span>
        <span className={cn('total')}>
          {translateAmount(amount)}
        </span>
        <button onClick={onOpen}>{useTranslation('goToBasket')}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
