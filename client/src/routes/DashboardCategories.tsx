import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import DashboardNavbar from '../components/DashboardNavbar/DashboardNavbar';
import './Dashboard.css'


function DashboardCategories() {
    return (
      <div>
        <NavBar />
        <div className='orientarDashboard'>
        <DashboardNavbar />
        <h1>DashboardCategories</h1>
        </div>
      </div>
    );
  }
  
  export default DashboardCategories;