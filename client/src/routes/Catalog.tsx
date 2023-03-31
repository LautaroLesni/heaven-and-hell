import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import CatalogRendered from '../components/Catalog/CatalogRendered';
import Footer from '../components/Footer/Footer';
function Catalog() {
    return (
      <div className="CatalogDIV">
        <NavBar />
        <CatalogRendered /> 
        <Footer/>
      </div>
    );
  }
  
  export default Catalog;
  