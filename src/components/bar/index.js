import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import BasketTool from "../basket-tool";
import Navigation from "../navigation";
import './style.css';

function Bar({onOpen, amount, sum, lang}) {
  const cn = bem('Bar');

  return (
    <div className={cn()}>
       <Navigation/>
       <BasketTool onOpen={onOpen} amount={amount} sum={sum} lang={lang}/>
    </div>
  );
}

export default memo(Bar);