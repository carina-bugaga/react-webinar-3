import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){

  const {showModal, addProduct, removeProduct} = props;

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{props.item.price.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,})}
      </div>
      {showModal ?
        <p className='Item-count'>{props.item.count} шт</p> 
      : ''}
      <div className='Item-actions'>
        {showModal ? 
        <button onClick={() => removeProduct(props.item)}>Удалить</button>
        : <button onClick={() => addProduct(props.item)}>Добавить</button>
        }
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
  addProduct: PropTypes.func,
  removeProduct: PropTypes.func
}

export default React.memo(Item);
