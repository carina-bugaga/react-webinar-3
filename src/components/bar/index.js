import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import BasketTool from "../basket-tool";
import Navigation from "../navigation";
import './style.css';

function Bar({address, onOpen, amount, sum, lang}) {
  const cn = bem('Bar');

  return (
    <div className={cn()}>
       <Navigation address={address}/>
       <BasketTool onOpen={onOpen} amount={amount} sum={sum} lang={lang}/>
    </div>
  );
}

Bar.PropTypes = {
  address: PropTypes.string,
  onOpen: PropTypes.func,
  amount: PropTypes.number,
  sum: PropTypes.number,
  lang: PropTypes.string,
};

export default memo(Bar);