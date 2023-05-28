import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Loading(){
  return (
    <div className="spinner"></div>
  )
}

export default memo(Loading);
