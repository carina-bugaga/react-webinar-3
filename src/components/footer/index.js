import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Footer({totalPrice}){
  return (
    <div className={'Footer'}>
      <div className='Footer-total'>Итого</div>
      <div className='Footer-sum'> 
        {totalPrice > 0 ? 
          `${totalPrice.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0,})}` : '0 ₽'}
      </div>
    </div>
  );
}

Footer.propTypes = {
  totalPrice: PropTypes.number
}

export default React.memo(Footer);