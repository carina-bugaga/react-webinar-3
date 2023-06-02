import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import { Link } from "react-router-dom";

function LoginTool({btnIn, btnOut, checkLogin, logout, isLoggedIn, link, userName}){
  return (
    <div className='LoginTool'>
      {!isLoggedIn ? (
          <button className='LoginTool-btn' onClick={checkLogin}>
            {btnIn}
          </button>
      ) : (
        <div>
          <Link to={link} className='LoginTool-user'>
            {userName}
          </Link>
          <button className='LoginTool-btn' onClick={logout}>
            {btnOut}
          </button>
        </div>
      )}
    </div>
  )
}

LoginTool.propTypes = {
  btnIn: PropTypes.string,
  btnOut: PropTypes.string,
  checkLogin: PropTypes.func,
  logout: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  link: PropTypes.string,
  userName: PropTypes.string,
};

export default memo(LoginTool);
