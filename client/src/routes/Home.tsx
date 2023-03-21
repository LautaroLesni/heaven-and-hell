import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import { motion } from 'framer-motion';
import Caroussel from '../components/Carousel/Carousel'

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
      <Caroussel />
    </div>
  );
}

export default Home;
