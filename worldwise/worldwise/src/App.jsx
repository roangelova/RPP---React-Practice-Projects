import { BrowserRouter, Route, Routes } from "react-router-dom"

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />} >
          <Route index element={<p> List of cities</p>} />
          <Route path='cities' element={<p> List of cities</p>} />
          <Route path='countries' element={<p> List of countries</p>} />
          <Route path='form' element={<p>form</p>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
