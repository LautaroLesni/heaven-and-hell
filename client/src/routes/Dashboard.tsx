import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import DashboardHome from '../components/DashboardHome/DashboardHome';
import DashboardNavbar from '../components/DashboardNavbar/DashboardNavbar';

function Dashboard() {
    return (
      <div className="App">
        <NavBar />
        <div className='orientarDashboard'>
        <DashboardNavbar />
        <DashboardHome />
        </div>
      </div>
    );
  }
  
  export default Dashboard;
  