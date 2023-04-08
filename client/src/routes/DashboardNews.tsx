import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import DashboardNavbar from '../components/DashboardNavbar/DashboardNavbar';
import NewsTable from '../components/DashboardNews/NewsTable';
import NewsModalCreate from '../components/DashboardNews/NewsModalCreate';
import './Dashboard.css'


function DashboardNews() {
  return (
    <div>
      <NavBar />
      <div className='orientarDashboard'>
        <DashboardNavbar />
        <div className='orientarDashboardStuff'>
        <div className='RightsideDashboard'>
          <NewsModalCreate />
          <NewsTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNews;