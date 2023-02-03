import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home';
import Catalog from './routes/Catalog';
import SpecificProduct from './components/Catalog/SpecificProduct';
import Dashboard from './routes/Dashboard';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Catalog />}></Route>
        <Route path='/products/:id' element={<SpecificProduct />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
