import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Item from './components/item';
import Head from "./components/head";
import Modal from './components/modal';
import PageLayout from "./components/page-layout";
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
    })
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls products={products} isShowingModal={toggleModal}/>
      <List list={list} onRenderItem={callbacks.onRenderItem}/>
        {isShowingModal ? 
          <Modal 
            onCloseButtonClick={toggleModal}
            products={products.list} 
            price={products.totalPrice}
            onRemoveProduct={callbacks.onRemoveProduct}/>
        : ''}
    </PageLayout>
  );
}

export default App;
