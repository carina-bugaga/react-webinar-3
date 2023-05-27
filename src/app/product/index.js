import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import ProductDetails from '../../components/product-details';

function Product() {

  const store = useStore();
  const {id} = useParams();

  useEffect(() => {
    store.actions.catalog.searchById(id);
  }, []);

  const select = useSelector(state => ({
    product: state.catalog.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.lang,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение языка
    toggleLanguage: useCallback((lang) => store.actions.lang.loadLanguage(lang), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.product.title} toggleLanguage={callbacks.toggleLanguage}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ProductDetails product={select.product} addToBasket={callbacks.addToBasket}/>
    </PageLayout>
  );
}

export default memo(Product);
