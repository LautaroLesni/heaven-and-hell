import React from "react";
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from "react";
import { motion } from 'framer-motion'
import heavenandhell from '../../utils/heavenandhell2.png'
import { useCustomSelector, useCustomDispatch } from "../../hooks/hooks";
import { setToken } from "../../redux/slices/user";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const NavBar = () => {
    const { token } = useCustomSelector((state) => state.user)
    const dispatch = useCustomDispatch()
    const [hamburger, setHamburguer] = useState(false)
    /* const [animation, setAnimation] = useState(true) */
    const hamburgerHandler = () => setHamburguer(!hamburger)
    /* const animationHandler = () => setAnimation(false) */
    const logout = () => {
        dispatch(setToken(''))
    }

    const iconproperties = {
        position: 'relative',
        top: '6px',
        fontSize: 35,
        color: '#5e0505',
        "&:hover": {
            color: '#c21414'
        }
    }
    return (
        <motion.div className={"header"}>
            <div className="logoandiconsDIV">
                <Link to='/'><img src={heavenandhell} alt="heaven_and_hell" className="heavenlogo" /></Link>
                <ul className="navbarIcons">
                    <a href="https://www.facebook.com/luis.lesniewicz" target='_blank' rel="noreferrer noopener"><li><FacebookIcon color="primary" sx={iconproperties} /></li></a>
                    <a href='https://twitter.com/LesniewiczLuis' target='_blank' rel="noreferrer noopener"><li><TwitterIcon color="primary" sx={iconproperties} /></li></a>
                    <a href='https://www.instagram.com/heaven_hell_producciones/' target='_blank' rel="noreferrer noopener"><li><InstagramIcon color="primary" sx={iconproperties} /></li></a>
                </ul>
            </div>
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
                        <Link to='/dashboard/home' className="dashboardbutton"><h4>Dashboard</h4></Link>
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