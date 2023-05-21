import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({title, onCloseButtonClick, children}) {
  return (
    <div className='Modal'>
      <div className='Modal-content'>
        <div className='Modal-head'>
          <h1>{title}</h1>
          <div className='Modal-actions'>
            <button onClick={onCloseButtonClick}>Закрыть</button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onCloseButtonClick: PropTypes.func,
  children: PropTypes.node
}

export default React.memo(Modal);