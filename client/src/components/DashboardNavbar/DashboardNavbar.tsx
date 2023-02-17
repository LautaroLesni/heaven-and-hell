import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './DashboardNavbar.css'

const activeStyle = {
  borderBottom: "3px solid rgb(7, 41, 101)",
  backgroundColor:'rgb(215, 215, 215)'
}

function DashboardNavbar() {
  return (
    <motion.div className={"header-dashboard"}>
      <h1>Admin Dashboard</h1>
      <ul className={"nav-dashboard-menu"}>
        <li>
          <NavLink to='/dashboard/home' style={({ isActive }) =>
            isActive ? activeStyle : undefined}><h4>Inicio</h4></NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/products' style={({ isActive }) =>
            isActive ? activeStyle : undefined}><h4>Productos</h4></NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/categories' style={({ isActive }) =>
            isActive ? activeStyle : undefined}><h4>Categorias</h4></NavLink>
        </li>
      </ul>
    </motion.div>
  );
}

export default DashboardNavbar;
