// import logo from './logo.svg';
import './App.scss';
import React from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from "./components/home/Home.jsx"
import Admin from "./components/admin/Admin.jsx"


function App() {
  return (


<BrowserRouter>
  <div className="App">
    <main>
      <Routes>
        <Route path="/" exact element={<Home/>}>

        </Route>
        <Route path="/admin" element={<Admin/>}>

        </Route>
      </Routes>
    </main>
  </div>

</BrowserRouter>


  );
}

export default App;
