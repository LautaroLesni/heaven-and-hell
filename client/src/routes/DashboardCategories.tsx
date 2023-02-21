import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import DashboardNavbar from '../components/DashboardNavbar/DashboardNavbar';
import CategoriesTable from '../components/DashboardCategories/CategoriesTable';
import './Dashboard.css'


function DashboardCategories() {
    return (
      <div>
        <NavBar />
        <div className='orientarDashboard'>
        <DashboardNavbar />
        <CategoriesTable/>
        </div>
      </div>
    );
  }
  
  export default DashboardCategories;