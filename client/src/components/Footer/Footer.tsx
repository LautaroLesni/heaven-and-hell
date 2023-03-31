import React from "react";
import s from './Footer.module.css'
import { motion } from "framer-motion";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

const iconproperties = {
    fontSize:{ 
        xs: '40px', // 0
        sm: '40px', // 600
        md: '50px', // 900
        lg: '50px', // 1200
        xl: '50px' // 1536
    },
    color: '#5e0505',
    transition:'0.3s',
    "&:hover": {
        transition:'0.3s',
        color: '#c21414'
    }
}

const Footer = () => {
    return (<motion.footer className={s.footerDIV}
        initial={{opacity: 0}}
        transition={{delay:0, stiffness:0, duration:0.5}}
        whileInView={{ opacity: 1}}
        viewport={{once: true}}>
        <div className={s.contactame}>
            <h2>¿Te gustaría contactarnos?</h2>
            </div>
    <ul className={s.iconsDIV}>
        <a href='https://api.whatsapp.com/send?phone=541140412135&text=Hola!%20Te%20contacto%20a%20trav%C3%A9s%20de%20la%20pagina%20web%20de%20Heaven%20and%20Hell' target='_blank' rel="noreferrer noopener"><li><WhatsAppIcon sx={iconproperties}/></li></a>
        <a href='https://www.facebook.com/luis.lesniewicz' target='_blank' rel="noreferrer noopener"><li><FacebookIcon sx={iconproperties}/></li></a>
        <a href='https://www.instagram.com/heaven_hell_producciones/' target='_blank' rel="noreferrer noopener"><li><InstagramIcon sx={iconproperties}/></li></a>
        <a href="mailto:Heavenandhellproducciones@hotmail.com"><li><EmailIcon sx={iconproperties}/></li></a>
    </ul>
        <div className={s.developedby}>
        <h3>Heaven & Hell Productions © 2023</h3>
        </div>
    </motion.footer>)
}

export default Footer