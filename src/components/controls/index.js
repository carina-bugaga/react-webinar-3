import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils";
import './style.css';

function Controls({isShowingModal, products }){
  
  return (
      <div className='Controls'>
        <div className='Controls-basket'>В корзине:</div>
        <div className='Controls-basket-quantity'>
          {products.list.length > 0 ?
            ` ${products.list.length} ${plural(products.list.length, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} 
              / ${products.totalPrice.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              maximumFractionDigits: 0,})}`
            : 'пусто'}
            {' '}
        </div>
        <button className='Controls-actions' onClick={isShowingModal}>Перейти</button>
      </div>
  )
}

Controls.propTypes = {
  isShowingModal: PropTypes.func,
  products: PropTypes.object
};

export default React.memo(Controls);
