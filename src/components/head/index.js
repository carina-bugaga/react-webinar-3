import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, toggleLanguage}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div id="language-switcher">
        <button onClick={() => toggleLanguage('ru')}>RU</button>
        <button onClick={() => toggleLanguage('en')}>EN</button>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
