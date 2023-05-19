import React from "react";
import PropTypes from 'prop-types';
import List from "../list";
import {plural} from "../../utils";
import './style.css';

function Controls({show, onCloseButtonClick, products, removeProduct, price}){
  
  return (
    <>
      <div className='Controls'>
        <div className='Controls-basket'>В корзине:</div>
        <div className='Controls-basket-quantity'>
          {products.length > 0 ?
            ` ${products.length} ${plural(products.length, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })}`
            : 'пусто'}
            {' '}
          {price > 0 ? 
            `/ ${price.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              maximumFractionDigits: 0,})}` : ''}
        </div>
        <button className='Controls-actions' onClick={onCloseButtonClick}>Перейти</button>
      </div>
      {show ? 
        <div className='Modal'>
              <div className='Modal-content'>
                <div className='Modal-head'>
                  <h1>Корзина</h1>
                  <div className='Modal-actions'>
                      <button onClick={onCloseButtonClick}>Закрыть</button>
                  </div>
                </div>
                <div className='Modal-product'>
                  <List show={show} products={products} removeProduct={removeProduct}/>
                </div>
                <div className='Modal-footer'>
                  <div className='Modal-footer-total'>Итого</div>
                  <div className='Modal-footer-sum'> 
                    {price > 0 ? 
                     `${price.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        maximumFractionDigits: 0,})}` : '0 ₽'}</div>
                </div>
              </div>
          </div> : ''
      }
    </>
  )
}

Controls.propTypes = {
  show: PropTypes.bool,
  onCloseButtonClick: PropTypes.func,
  products: PropTypes.array,
  price: PropTypes.number,
  removeProduct: PropTypes.func
};
Controls.defaultProps = {
  show: false,
}

export default React.memo(Controls);
