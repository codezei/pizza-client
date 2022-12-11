// import logo from './logo.svg';
import './App.scss';

import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/home/Home.jsx"
import Admin from "./components/admin/Admin.jsx"
import Cart from "./components/cart/Cart.jsx"
import NoMatch from "./components/noMatch/NoMatch.jsx"
import {auth} from "./actions/user"
import {getProductsAction} from "./actions/products"
import {useDispatch, useSelector} from "react-redux"
import Filter from "./components/filter/Filter"
import Parametres from "./components/parametres/Parametres"
import Header from "./components/header/Header"
import Login from "./components/login/Login"
import Account from "./components/account/Account"
import Setting from "./components/account/Setting"
import History from "./components/account/History"
import Registration from "./components/registration/Registration"
import Order from "./components/order/Order"
import './components/popup/Popup.scss'



function App() {
  const dispatch = useDispatch()
  const isAdmin = useSelector(state=>{return state.user.isAdmin})
  const showLoginPopup = useSelector((state)=>{return state.app.showLoginPopup})
  const showRegistrationPopup = useSelector((state)=>{return state.app.showRegistrationPopup})
  const showFilterPopup = useSelector((state)=>{return state.app.showFilterPopup})
  const showCartPopup = useSelector((state)=>{return state.app.showCartPopup})



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
              
            </Route>
            {/* <Route path="/filter" element={<Filter/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route> */}
            <Route path="/order" element={<Order/>}></Route>
            <Route path="/parametres/:id" element={<Parametres/>}></Route>
            <Route path="*" element={<NoMatch/>}></Route>
            {
              isAdmin ? <Route path="/admin" element={<Admin/>}></Route> 
              : 
              <Route path="/account" element={<Account/>}>
                <Route path="setting" element={<Setting/>}></Route> 
                <Route path="history" element={<History/>}></Route> 
              </Route>
            }
          </Routes>
        </main>
        {
            showLoginPopup ? <Login></Login> : null
        }
        {
            showRegistrationPopup ? <Registration></Registration> : null
        }
        {
            showFilterPopup ? <Filter></Filter> : null
        }
        {
            showCartPopup ? <Cart></Cart> : null
        }
      </div>

    </BrowserRouter>


  );
}

export default App;
