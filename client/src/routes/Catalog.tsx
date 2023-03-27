import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import CatalogRendered from '../components/Catalog/CatalogRendered';
import bosque from '../utils/bosque.png'
function Catalog() {
    return (
      <div className="CatalogDIV">
        <NavBar />
        <CatalogRendered /> 
      </div>
    );
  }
  
  export default Catalog;
  