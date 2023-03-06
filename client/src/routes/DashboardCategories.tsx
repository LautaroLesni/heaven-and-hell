import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import DashboardNavbar from '../components/DashboardNavbar/DashboardNavbar';
import CategoriesTable from '../components/DashboardCategories/CategoriesTable';
import CategoriesModalCreate from '../components/DashboardCategories/CategoriesModalCreate';
import './Dashboard.css'


function DashboardCategories() {
  return (
    <div>
      <NavBar />
      <div className='orientarDashboard'>
        <DashboardNavbar />
        <div className='orientarDashboardStuff'>
          <CategoriesModalCreate />
          <CategoriesTable />
        </div>
      </div>
    </div>
  );
}

export default DashboardCategories;