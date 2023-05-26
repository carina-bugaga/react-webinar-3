import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import { numberFormat } from '../../utils';
import PropTypes from "prop-types";
import './style.css';
import useTranslation from "../../store/use-translate";

function ProductDatails({product, addToBasket}){

  const cn = bem('Product');

  const callbacks = {
    onAdd: (e) => addToBasket(product._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('text')}>
        <p>{product.description}</p>
        <p>{useTranslation('country')}: <b>{product.madeIn?.title} ({product.madeIn?.code})</b></p>
        <p>{useTranslation('category')}: <b>{product.category?.title}</b></p>
        <p>{useTranslation('year')}: <b>{product.edition}</b></p>
        <h2>{useTranslation('price')}: {numberFormat(product.price)} ₽</h2>
        <button onClick={callbacks.onAdd}>{useTranslation('add')}</button>
      </div>
    </div>
  )};


ProductDatails.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.shape({ 
      title: PropTypes.string, 
      code: PropTypes.string }),
    category: PropTypes.shape({
      title: PropTypes.string }),
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  addToBasket: PropTypes.func,
}; 

ProductDatails.defaultProps = {
  onAdd: () => {},
}

export default memo(ProductDatails);
