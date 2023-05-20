import React, {useCallback} from "react";
import PropTypes from "prop-types";
import List from "../list";
import Product from "../product";
import './style.css';

function Modal({onCloseButtonClick, products, price, onRemoveProduct}) {
  const callbacks = {
    onRenderItem: useCallback((products) => {
      return (
        <Product product={products} onRemoveProduct={onRemoveProduct}/>
      )
    })
  }

  return (
    <div className='Modal'>
      <div className='Modal-content'>
        <div className='Modal-head'>
          <h1>Корзина</h1>
          <div className='Modal-actions'>
            <button onClick={onCloseButtonClick}>Закрыть</button>
          </div>
        </div>
        <List list={products} onRenderItem={callbacks.onRenderItem}/>
        <div className='Modal-footer'>
          <div className='Modal-footer-total'>Итого</div>
          <div className='Modal-footer-sum'> 
            {price > 0 ? 
              `${price.toLocaleString('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                maximumFractionDigits: 0,})}` : '0 ₽'}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onCloseButtonClick: PropTypes.func,
  products: PropTypes.array,
  price: PropTypes.number,
  onRemoveProduct: PropTypes.func
}

export default React.memo(Modal);