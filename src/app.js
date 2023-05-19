import React, {useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import useModal from './useModal'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isShowingModal, toggleModal] = useModal();
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const list = store.getState().list;

  // Добавление товаров в корзину
  function addProduct(product) {
    const productInBasket = products.some((item) => item.title === product.title);

    if (productInBasket) {
      const basket = products.map((item) => {
        if (item.title == product.title) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      setProducts(basket);
      setPrice(price + product.price);
    } else {
      setProducts([...products, { ...product, count: 1 }]);
      setPrice(price + product.price);
    }
  }  

  // Удаление товаров из корзины
  function removeProduct(product) {
    setProducts(products.filter((item) => item.code != product.code));
    products.forEach((item) => {
      if (item.title == product.title) {
        setPrice(price - product.price * item.count);
      }
    });
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls 
        show={isShowingModal} 
        onCloseButtonClick={toggleModal}
        products={products} 
        removeProduct={removeProduct}
        price={price}/>
      <List 
        list={list} 
        products={products} 
        addProduct={addProduct}/>
    </PageLayout>
  );
}

export default App;
