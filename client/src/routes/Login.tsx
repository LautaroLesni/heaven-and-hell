import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import { motion } from 'framer-motion';
import LoginForm from '../components/Login/LoginForm';

function Login() {
    


  return (
    <div className="App">
        <NavBar />
      <LoginForm />
    </div>
  );
}

export default Login;
