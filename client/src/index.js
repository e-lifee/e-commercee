import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'; // BrowserRouter'ı Router olarak da kullanabilirsiniz
import './index.css';
import Login from './Pages/Login';
import App from './App';
import DivList from './components/DivList';
import CategoryProducts from './components/CategoryProducts';
import AboutUs from './Pages/AboutUs';
import Cart from './Pages/Cart'
import OurTeam from './Pages/OurTeam';
import Navbar from './components/Navbar'
import Orders from './Pages/Orders';
import CartForm from './Pages/CartForm';
import Favorites from './Pages/Favorites';
import SearchCategory from './Pages/SearchCategory';
import Home from './Pages/Home';
ReactDOM.render(
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path="/" element={<App/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/categories/:category_id/products" element={<CategoryProducts/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/team' element={<OurTeam/>}/>
      <Route path='/customerOrder' element={<Orders/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/form' element={<CartForm/>}/>
      <Route path='/favs' element={<Favorites/>}/>
      <Route path='/search' element={<SearchCategory/>}/>
    </Routes>
  </Router>
  ,
  document.getElementById('root')
);