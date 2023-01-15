// import logo from './logo.svg';
import './App.scss';

import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/home/Home.jsx"
import Admin from "./components/admin/Admin.jsx"
// import Cart from "./components/cart/Cart.jsx"
import NoMatch from "./components/noMatch/NoMatch.jsx"
import {auth} from "./actions/user"
import {getProductsAction} from "./actions/products"
import {useDispatch, useSelector} from "react-redux"
import Filter from "./components/filter/Filter"
import Parametres from "./components/parametres/Parametres"
import Header from "./components/header/Header"
// import Login from "./components/login/Login"
import Account from "./components/account/Account"
import Setting from "./components/account/Setting"
import History from "./components/account/History"
// import Registration from "./components/registration/Registration"
import Order from "./components/order/Order"
import OrderDetails from "./components/order/OrderDetails"
import './components/popup/Popup.scss'
import OrderAccepted from './components/order/OrderAccepted';
import Popup from "./components/popup/Popup.jsx"
import PopupSide from './components/popup/PopupSide';
import OrderCheckout from './components/order/OrderCheckout';
import PopupsHash from './components/popup/PopupsHash';
import Pizza from './components/pizza/Pizza';

function App() {
  const dispatch = useDispatch()
  const isAdmin = useSelector(state=>{return state.user.isAdmin})
  const isAuth = useSelector(state=>{return state.user.isAuth})
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
              <Route path="parametres/:id" element={<Popup children={<Parametres></Parametres>} />}></Route> 
              {/* <Route path="cart" element={<PopupSide title="Ваш заказ" children={<Cart></Cart>} />}></Route>  */}
              <Route path="filter" element={<PopupSide title="Фильтры" children={<Filter></Filter>} />}></Route> 
              {/* <Route path="login" element={<Popup children={<Login></Login>} />}></Route> 
              <Route path="registration" element={<Popup children={<Registration></Registration>} />}></Route>  */}
            </Route>
            <Route path="/pizza" element={<Pizza/>}></Route>
            <Route path="/order" element={<Order/>}>
              <Route path="checkout" element={<OrderCheckout/>}></Route> 
              <Route path="accepted/:id" element={<OrderAccepted/>}></Route> 
              <Route path="details/:id" element={<OrderDetails/>}></Route> 
            </Route>

            <Route path="*" element={<NoMatch/>}></Route>
            
            {
              isAdmin ? 
              <Route path="/admin" element={<Admin/>}></Route> 
              : isAuth ? 
              <Route path="/account" element={<Account/>}>
                <Route path="setting" element={<Setting/>}></Route> 
                <Route path="history" element={<History/>}></Route> 
              </Route> : null
            }
          </Routes>
        </main>
        <PopupsHash isAuth={isAuth}></PopupsHash>
      </div>

    </BrowserRouter>


  );
}

export default App;
