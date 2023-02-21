import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import DashboardNavbar from '../components/DashboardNavbar/DashboardNavbar';
import ProductsTable from '../components/DashboardProducts/ProductsTable';

function DashboardProducts() {
    return (
      <div>
        <NavBar />
        <div className='orientarDashboard'>
        <DashboardNavbar />
        <ProductsTable/>
        </div>
      </div>
    );
  }
  
  export default DashboardProducts;
  