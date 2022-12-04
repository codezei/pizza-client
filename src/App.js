// import logo from './logo.svg';
import './App.scss';

import React from "react";
import {BrowserRouter, Routes, Route, createBrowserHistory} from 'react-router-dom'
import Home from "./components/home/Home.jsx"
import Admin from "./components/admin/Admin.jsx"
import Cart from "./components/cart/Cart.jsx"
import NoMatch from "./components/noMatch/NoMatch.jsx"
import Popup from "./components/popup/Popup.jsx"
import {auth} from "./actions/user"
import {getProductsAction} from "./actions/products"
import {useDispatch, useSelector} from "react-redux"
import Filter from "./components/filter/Filter"
import Parametres from "./components/parametres/Parametres"
import Pizza from "./components/pizza/Pizza"
import Header from "./components/header/Header"





function App() {
  const dispatch = useDispatch()
  const isAdmin = useSelector(state=>{return state.user.isAdmin})

  
  React.useEffect(()=>{
    dispatch(auth())
    dispatch(getProductsAction())
  }, [])


  return (


    <BrowserRouter>
      <div className="App">
      <Header></Header>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} basename="/">
              <Route path="filter" element={<Filter/>}></Route>
              <Route path="cart" element={<Cart/>}></Route>
              <Route path="parametres/:id" element={<Parametres/>}></Route>
            </Route>
            <Route path="/pizza" element={<Pizza/>} basename="/pizza">
              <Route path="filter" element={<Filter/>}></Route>
              <Route path="cart" element={<Cart/>}></Route>
              <Route path="parametres/:id" element={<Parametres/>}></Route>
            </Route>
  
            {
              isAdmin ? <Route path="/admin" element={<Admin/>}></Route> : null
            }
            <Route path="*" element={<NoMatch/>}></Route>

          </Routes>
        </main>
      </div>

    </BrowserRouter>


  );
}

export default App;
