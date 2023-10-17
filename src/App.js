import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Search from './components/search';
import ProductList from './components/productlist';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/loginform';
import ProductForm from './components/productform';
import UseEffectDemo from './components/useeffectdemo';
import ViewProduct from './components/viewproduct';
import Counter from './components/useReducerDemo';
import BankAccount from './components/bankaccount';
import CustomerReg from './components/customerReg';
import Logout from './components/logout';
function App() {
  // let products=[{
  //   id:"1",
  //   name:"Apple",
  //   price:"100",
  //   quantity:1,
  //   category:"Fruits"

  // },{
  //   id:"2",
  //   name:"Banana",
  //   price:"150",
  //   quantity:11,
  //   category:"Fruits"

  // }]
   const[searchTerm,setSearchTerm]=useState('');
   const handleChange=(event)=>{
    
       console.log(event.target.value);
    
     setSearchTerm(event.target.value);
       //console.log(event.target);
   }
  // products=products.filter((p)=>p.name.toLowerCase().includes(searchTerm.toLowerCase()));
   let [username,setUsername]=useState('')
   let[authorities,setAuthorities]=useState('')
   useEffect(()=>{
    setUsername(localStorage.getItem("username"))
    setAuthorities(localStorage.getItem("authorities"))
   },[])
   
  return (
    <div className="App">
      <BrowserRouter>
      <nav className="nav navbar-expand navbar-dark">
        <div className="nav-link">
            <Link to="/products">Products</Link>
          </div> 
          {!username? <div className="nav-link">
            <Link to="/loginform">Login</Link>
          </div>:<div className="nav-link">
            <Link to="/logout">Logout</Link>
          </div>
          }
          {authorities==='Admin'?
          <div className="nav-link">
            <Link to="/productform">Add Product</Link>
          </div>
          :''
  }
  {authorities==='User'?
  <div className="nav-link">Offers</div>:''}
  {username?<div className="nav-link">Welcome{username}</div>:''}
          <div className="nav-link">
            <Link to="/useeffectdemo">Use Effect Demo</Link>
          </div>
            <div className="nav-link">
              <Link to="/viewproduct">View Products</Link>
            </div>
          {!username?<div className="nav-link">
          <Link to="/register">Register</Link>
          </div>:'' }       
          </nav>
       <b>State change Demo</b>
       <Routes>
        <Route path="/products"
        element={
        <React.Fragment>
          <Search onSearch={handleChange}/>
         <ProductList/>
        </React.Fragment>
        }
        />
<Route path="/loginform" element={<LoginForm setUsername={setUsername}
setAuthorities={setAuthorities}/>}></Route>
<Route path="/productform" element={<ProductForm/>}></Route>
<Route path="/useeffectdemo" element={<UseEffectDemo/>}></Route>
<Route path="/edit/:pid" element={<ProductForm/>}></Route>
<Route path="/viewproducts/:id" element={<ViewProduct/>}></Route>
<Route path={"/register"} element={<CustomerReg/>}></Route>
<Route path="/logout"
element={<Logout
setUsername={setUsername}
setAuthorities={setAuthorities}/>}></Route>
       </Routes>
       <Counter></Counter>
        <BankAccount></BankAccount>
       </BrowserRouter> 
     </div>
  )
}

export default App;
