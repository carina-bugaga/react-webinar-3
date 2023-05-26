import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';
import { pagination } from "../../utils";

function Pagination({currentPage, count, changeList}){

  const cn = bem('Pagination');
  const pages = pagination(currentPage, count);  
  
  return (
    <ul className={cn()}>
      {pages.map((number, index) => {
        if(number == null) {
          return (<li key={index} className={cn('item', {dots: true})}>&#8230;</li>);            
        } else {
          return (
            <li key={index} 
                className={number == currentPage ? cn('item', {active: true}): cn('item')} 
                onClick={() =>changeList(number)}>
                {number}
            </li>
        )}
      })}
    </ul>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  count: PropTypes.number,
  changeList: PropTypes.func.isRequired,
};

export default memo(Pagination);
