import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, onRenderItem}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>{onRenderItem(item)}</div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  onRenderItem: PropTypes.func
};

export default React.memo(List);
