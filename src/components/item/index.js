import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item({item, onAddProduct}){
 return (
    <div className={'Item'}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-price'>{item.price.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,})}
      </div>
      <div className='Item-actions'>
        <button onClick={() => onAddProduct(item)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  addProduct: PropTypes.func
}

export default React.memo(Item);
