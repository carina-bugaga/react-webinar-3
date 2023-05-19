import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, show, products, addProduct, removeProduct}){

  const showItems = show ? products : list;

  return (
    <div className='List'>{
      showItems.map(item =>
        <div key={item.code} className='List-item'>
          <Item 
            item={item} 
            showModal={show} 
            addProduct={addProduct} 
            removeProduct={removeProduct}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  show: PropTypes.bool,
  products: PropTypes.array,
  addProduct: PropTypes.func,
  removeProduct: PropTypes.func
};

export default React.memo(List);
