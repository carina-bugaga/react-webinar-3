import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Product({product, onRemoveProduct}){
  return (
    <div className={'Product'}>
      <div className='Product-code'>{product.code}</div>
      <div className='Product-title'>{product.title}</div>
      <div className='Product-price'>{product.price.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,})}
      </div>
      <p className='Product-count'>{product.count} шт</p> 
      <div className='Product-actions'>
      <button onClick={() => onRemoveProduct(product)}>Удалить</button>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onRemoveProduct: PropTypes.func
}

export default React.memo(Product);