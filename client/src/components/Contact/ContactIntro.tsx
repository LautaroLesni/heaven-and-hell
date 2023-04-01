import React from 'react'
import s from './ContactIntro.module.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const iconproperties = {
    position: 'relative',
    top: '6px',
    fontSize: 45,
    color: '#5e0505',
    transition:'0.3s',
    "&:hover": {
        transition:'0.3s',
        color: '#c21414'
    }
}

const ContactIntro = () =>{
    return (
        <div className={s.OutterDIV}>
            <h1>Contacto</h1>
            <h5>Nos alegra muchisimo que quieras contactarte con nosotros, te invitamos a rellenar el formulario con tu mensaje.</h5>
{/*             <div className={s.iconsDIV}>
            <a href="https://www.facebook.com/luis.lesniewicz" target='_blank' rel="noreferrer noopener"><li><FacebookIcon color="primary" sx={iconproperties} /></li></a>
            <a href='https://api.whatsapp.com/send?phone=541140412135&text=Hola!%20Te%20contacto%20a%20trav%C3%A9s%20de%20la%20pagina%20web%20de%20Heaven%20and%20Hell' target='_blank' rel="noreferrer noopener"><li><WhatsAppIcon sx={iconproperties}/></li></a>
            <a href='https://www.instagram.com/heaven_hell_producciones/' target='_blank' rel="noreferrer noopener"><li><InstagramIcon color="primary" sx={iconproperties} /></li></a>
            </div> */}
            <div className={s.alignIconsAndText}>
            <h5>Aunque si lo prefieres, también tienes la opción de contactarte directamente al Whatsapp</h5>  
            <a href='https://api.whatsapp.com/send?phone=541140412135&text=Hola!%20Te%20contacto%20a%20trav%C3%A9s%20de%20la%20pagina%20web%20de%20Heaven%20and%20Hell' target='_blank' rel="noreferrer noopener"><li><WhatsAppIcon sx={iconproperties}/></li></a>
        
            </div>
        </div>
    )
}

export default ContactIntro