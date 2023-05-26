import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import useTranslation from "../../store/use-translate";

function Controls({onAdd}){
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{useTranslation('add')}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
