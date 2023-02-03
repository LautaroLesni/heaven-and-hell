import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import CatalogRendered from '../components/Catalog/CatalogRendered';

function Catalog() {
    return (
      <div className="CatalogDIV">
        <NavBar />
        <CatalogRendered />
      </div>
    );
  }
  
  export default Catalog;
  