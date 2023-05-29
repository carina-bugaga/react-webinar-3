import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useLocation, useParams } from 'react-router-dom';
import ProductDetails from '../../components/product-details';
import Bar from '../../components/bar';
import Loading from '../../components/loading';
import { addressURL } from '../../components/properties';

function Product() {

  const store = useStore();
  const {id} = useParams();
  const location = useLocation();

  useEffect(() => {
    store.actions.catalog.searchById(id);
  }, [location]);

  const select = useSelector(state => ({
    product: state.catalog.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.lang,
    loading: state.catalog.loading,
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
      <Bar address={addressURL.Main} onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} lang={select.lang}/>
      {select.loading ? (
        <Loading />
      ) : (
        <ProductDetails product={select.product} addToBasket={callbacks.addToBasket}/>
      )}
    </PageLayout>
  );
}

export default memo(Product);
