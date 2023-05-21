import React, {useCallback} from 'react';
import Controls from "./components/controls";
import Item from './components/item';
import Footer from './components/footer';
import Head from "./components/head";
import List from "./components/list";
import Modal from './components/modal';
import PageLayout from "./components/page-layout";
import Product from './components/product';
import useModal from './useModal'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isShowingModal, toggleModal] = useModal();
  const list = store.getState().list;
  const products = store.getState().products;

  const callbacks = {
    onAddProduct: useCallback((code) =>{
      store.addProduct(code);
    }, [store]),

    onRemoveProduct: useCallback((code) =>{
      store.removeProduct(code);
    }, [store]),

    onRenderItem: useCallback((item) => {
      return (
        <Item item={item} onAddProduct={callbacks.onAddProduct}/>
      )
    }),

    onRenderProduct: useCallback((products) => {
      return (
        <Product product={products} onRemoveProduct={callbacks.onRemoveProduct}/>
      )
    })
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls products={products} isShowingModal={toggleModal}/>
      <List list={list} onRenderItem={callbacks.onRenderItem}/>
        {isShowingModal ? 
          <Modal title='Корзина' onCloseButtonClick={toggleModal}>
            <List list={products.list} onRenderItem={callbacks.onRenderProduct}/>
            <Footer totalPrice={products.totalPrice}/>
          </Modal>
        : ''}
    </PageLayout>
  );
}

export default App;
