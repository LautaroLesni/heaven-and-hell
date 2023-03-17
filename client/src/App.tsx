import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home';
import Catalog from './routes/Catalog';
import SpecificProduct from './components/Catalog/SpecificProduct';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import ProtectedAdmin from './components/AdminProtector/ProtectedRoute';
import IsLogged from './components/AdminProtector/IsLogged';
import DashboardCategories from './routes/DashboardCategories';
import DashboardProducts from './routes/DashboardProducts';
import DashboardRedirect from './components/AdminProtector/DashboardRedirect';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Catalog />}></Route>
        <Route path='/products/:id' element={<SpecificProduct />}></Route>
        <Route path='/dashboard' element={<DashboardRedirect></DashboardRedirect>}></Route>
        <Route path='/dashboard/home' element={<ProtectedAdmin><Dashboard /></ProtectedAdmin>}></Route>
        <Route path='/dashboard/products' element={<ProtectedAdmin><DashboardProducts /></ProtectedAdmin>}></Route>
        <Route path='/dashboard/categories' element={<ProtectedAdmin><DashboardCategories /></ProtectedAdmin>}></Route>
        <Route path='/login' element={<IsLogged><Login /></IsLogged>}></Route>
      </Routes>
    </div>
  );
}

export default App;
