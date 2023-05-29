import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Bar from "../../components/bar";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import useTranslation from '../../store/use-translate';
import Loading from '../../components/loading';
import { useParams } from 'react-router-dom';

function Main() {

  const store = useStore();
  let {number} = useParams();

  useEffect(() => {
    number = number == undefined ? 1 : Number(number) 
    store.actions.catalog.load(number);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    count: state.catalog.count,
    lang: state.lang.lang,
    loading: state.catalog.loading,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение списка товаров по текущей странице
    changeList: useCallback((currentPage) => store.actions.catalog.load(currentPage), []),
    // Переключение языка
    toggleLanguage: useCallback((lang) => store.actions.lang.loadLanguage(lang), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={useTranslation('shop')} toggleLanguage={callbacks.toggleLanguage}/>
      <Bar onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} lang={select.lang}/>
      {select.loading ? (
        <Loading />
      ) : (
        <>
          <List list={select.list} renderItem={renders.item}/>
          <Pagination currentPage={select.currentPage} count={select.count} changeList={callbacks.changeList}/>
        </>
      )}
    </PageLayout>

  );
}

export default memo(Main);
