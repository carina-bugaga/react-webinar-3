import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Routes, Route } from 'react-router-dom';
import Product from './product';
import { addressURL } from '../components/properties';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={addressURL.Main} element={<Main/>}/>
        <Route path={addressURL.Product} element={<Product/>}/>
        <Route path={addressURL.Page} element={<Main/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
