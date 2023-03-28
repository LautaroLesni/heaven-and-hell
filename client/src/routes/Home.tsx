import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import { motion } from 'framer-motion';
import Caroussel from '../components/Carousel/Carousel'
import s from './Home.module.css'
import Proposito from '../components/Home/Proposito';
import HomeNews from '../components/Home/HomeNews';

/* initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ delay: 0, stiffness: 0, duration: 0.8 }}
viewport={{ once: true }} */

function Home() {
  return (
    <div className={s.HomeDIV}>
      <motion.div>
        <NavBar />
      </motion.div>
      <Caroussel />

      <motion.h2
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0, stiffness: 0, duration: 1.8 }}
        viewport={{ once: true }}
      >Acerca de Nosotros</motion.h2>
      <Proposito />
      <motion.h2
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0, stiffness: 0, duration: 1.8 }}
        viewport={{ once: true }}
      >Noticias</motion.h2>
      <HomeNews />
    </div>
  );
}

export default Home;
