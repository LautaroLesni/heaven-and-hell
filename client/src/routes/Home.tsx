import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import { motion } from 'framer-motion';

/* initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ delay: 0, stiffness: 0, duration: 0.8 }}
viewport={{ once: true }} */

function Home() {
  return (
    <div className="App">
      <motion.div>
        <NavBar />
      </motion.div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
