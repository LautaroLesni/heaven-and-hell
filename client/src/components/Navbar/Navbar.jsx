import React from "react";
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from "react";
import { motion } from 'framer-motion'
import heavenandhell from '../../utils/heavenandhell2.png'

const NavBar = () => {
    const [hamburger, setHamburguer] = useState(false)
    /* const [animation, setAnimation] = useState(true) */
    const hamburgerHandler = () => setHamburguer(!hamburger)
    /* const animationHandler = () => setAnimation(false) */

    return (
        <motion.div className={"header"}>
            <Link to='/'><img src={heavenandhell} alt="heaven_and_hell" className="heavenlogo" /></Link>
            <ul className={hamburger ? "nav-menu active" : "nav-menu"}>
                <li>
                    <Link to='/'><h4>Home</h4></Link>
                </li>
                <li>
                    <Link to='/products'><h4>Catalog</h4></Link>
                </li>
                <li>
                    <Link to='/'><h4>About</h4></Link>
                </li>
                <li>
                    <Link to='/'><h4>Contact</h4></Link>
                </li>
            </ul>
            <div className={"hamburguer"} onClick={hamburgerHandler}>
                {hamburger ? <FaTimes size={30} style={{ color: "rgb(101, 7, 7)" }} /> :
                    <FaBars size={30} style={{ color: "rgb(101, 7, 7)" }} />
                }
            </div>
        </motion.div>
    )
}

export default NavBar