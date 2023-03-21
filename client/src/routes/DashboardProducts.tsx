import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import DashboardNavbar from '../components/DashboardNavbar/DashboardNavbar';
import ProductsTable from '../components/DashboardProducts/ProductsTable';
import ProductsModalCreate from '../components/DashboardProducts/ProductsModalCreate';

function DashboardProducts() {
    return (
      <div>
        <NavBar />
        <div className='orientarDashboard'>
        <DashboardNavbar />
        <div className='orientarDashboardStuff'>
          <div className='RightsideDashboard'>
          <ProductsModalCreate />
        <ProductsTable />
          </div>
        </div>
        </div>
      </div>
    );
  }
  
  export default DashboardProducts;
  