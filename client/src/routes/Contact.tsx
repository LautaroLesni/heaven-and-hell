import React from 'react'
import NavBar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ContactIntro from '../components/Contact/ContactIntro'
import ContactForm from '../components/Contact/ContactForm'

const Contact = () =>{
    return (
        <div>
            <NavBar />
            <ContactIntro />
            <ContactForm />
        </div>
    )
}

export default Contact