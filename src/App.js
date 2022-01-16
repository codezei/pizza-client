// import logo from './logo.svg';
import './App.scss';
import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from "./components/home/Home.jsx"
import Admin from "./components/admin/Admin.jsx"
import {auth} from "./actions/user"
import {getProductsAction} from "./actions/products"
import {useDispatch, useSelector} from "react-redux"




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
        <main>
          <Routes>
            <Route path="/" exact element={<Home/>}></Route>
            {
              isAdmin ? <Route path="/admin" element={<Admin/>}></Route> : null
            }
            {
              !isAdmin ? <Route path="/admin" element={<Navigate to="/" />}></Route> : null
            }
          </Routes>
        </main>
      </div>

    </BrowserRouter>


  );
}

export default App;
