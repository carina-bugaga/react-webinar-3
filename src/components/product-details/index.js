import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import { numberFormat } from '../../utils';
import PropTypes from "prop-types";
import './style.css';

function ProductDatails({product, addToBasket}){

  const cn = bem('Product');

  const callbacks = {
    onAdd: (e) => addToBasket(product._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('text')}>
        <p>{product.description}</p>
        <p>Страна производитель: <b>{product.madeIn?.title} ({product.madeIn?.code})</b></p>
        <p>Категория: <b>{product.category?.title}</b></p>
        <p>Год выпуска: <b>{product.edition}</b></p>
        <h2>Цена: {numberFormat(product.price)} ₽</h2>
        <button onClick={callbacks.onAdd}>Добавить</button>
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
