import React from "react";
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from "react";
import { motion } from 'framer-motion'
import heavenandhell from '../../utils/heavenandhell2.png'
import { useCustomSelector, useCustomDispatch } from "../../hooks/hooks";
import { setToken } from "../../redux/slices/user";

const NavBar = () => {
    const { token } = useCustomSelector((state) => state.user)
    const dispatch = useCustomDispatch()
    const [hamburger, setHamburguer] = useState(false)
    /* const [animation, setAnimation] = useState(true) */
    const hamburgerHandler = () => setHamburguer(!hamburger)
    /* const animationHandler = () => setAnimation(false) */
    const logout = () =>{
        dispatch(setToken(''))
    }

    return (
        <motion.div className={"header"}>
            <Link to='/'><img src={heavenandhell} alt="heaven_and_hell" className="heavenlogo" /></Link>
            {token === '' ?
                <ul className={hamburger ? "nav-menu active" : "nav-menu"}>
                    <li>
                        <Link to='/'><h4>Inicio</h4></Link>
                    </li>
                    <li>
                        <Link to='/products'><h4>Catalogo</h4></Link>
                    </li>
                    <li>
                        <Link to='/'><h4>Sobre Nosotros</h4></Link>
                    </li>
                    <li>
                        <Link to='/'><h4>Contacto</h4></Link>
                    </li>
                </ul> :
                <ul className={hamburger ? "nav-menu active" : "nav-menu"}>
                    <li>
                        <Link to='/'><h4>Inicio</h4></Link>
                    </li>
                    <li>
                        <Link to='/products'><h4>Catalogo</h4></Link>
                    </li>
                    <li>
                        <Link to='/'><h4>Sobre Nosotros</h4></Link>
                    </li>
                    <li>
                        <Link to='/'><h4>Contacto</h4></Link>
                    </li>
                    <li>
                        <Link to='/dashboard/home' style={{color:'rgb(207, 193, 116)'}}><h4>Dashboard</h4></Link>
                    </li>
                    <li>
                        <button className="logoutbutton" onClick={logout}>Logout</button>
                    </li>
                </ul>}
            <div className={"hamburguer"} onClick={hamburgerHandler}>
                {hamburger ? <FaTimes size={30} style={{ color: "rgb(101, 7, 7)" }} /> :
                    <FaBars size={30} style={{ color: "rgb(101, 7, 7)" }} />
                }
            </div>
        </motion.div>
    )
}

export default NavBar