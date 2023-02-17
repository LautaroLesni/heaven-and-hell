import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import DashboardNavbar from '../components/DashboardNavbar/DashboardNavbar';

function DashboardProducts() {
    return (
      <div>
        <NavBar />
        <div className='orientarDashboard'>
        <DashboardNavbar />
        <h1>DashboardProducts</h1>
        </div>
      </div>
    );
  }
  
  export default DashboardProducts;
  