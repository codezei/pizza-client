import './App.scss';
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/home/Home.jsx"
import Admin from "./components/admin/Admin.jsx"
import NoMatch from "./components/noMatch/NoMatch.jsx"
import {auth} from "./actions/user"
import {getProductsAction} from "./actions/products"
import {useDispatch, useSelector} from "react-redux"
import Parametres from "./components/parametres/Parametres"
import Header from "./components/header/Header"
import Account from "./components/account/Account"
import Setting from "./components/account/Setting"
import History from "./components/account/History"
import Order from "./components/order/Order"
import OrderDetails from "./components/order/OrderDetails"
import './components/popup/Popup.scss'
import OrderAccepted from './components/order/OrderAccepted';
import Popup from "./components/popup/Popup.jsx"
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
            </Route>
            <Route path="/pizza" element={<Pizza/>}>
              <Route path="parametres/:id" element={<Popup children={<Parametres></Parametres>} />}></Route> 
            </Route>
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
