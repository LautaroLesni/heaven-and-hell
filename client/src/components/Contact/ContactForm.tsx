import React from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import s from './ContactForm.module.css'
import { motion } from 'framer-motion';

const outterBox = {
    width: {
        xs: '95%', // 0
        sm: '80%', // 600
        md: '50%', // 900
        lg: '50%', // 1200
        xl: '40%' // 1536
    },
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor:''
}

const nameAndMail = {
    width:{
        xs: '60%', // 0
        sm: '50%', // 600
        md: '40%', // 900
        lg: '40%', // 1200
        xl: '40%' // 1536
    },
    marginTop: '20px',
    color: 'white',
    backgroundColor: 'white',
    borderRadius: '10px'
}
const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#8c0d0d',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#044a21',
      },
    },
  });

const ContactForm = () => {
    return (
        <motion.div className={s.OutterDIV}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, stiffness: 0, duration: 0.8 }}
        viewport={{ once: true }}>
            <ThemeProvider theme={theme}>
            <Box sx={outterBox}>
                <TextField sx={nameAndMail} id="outlined-basic" label="Nombre"  variant="filled" name='user_name' />
                <TextField sx={nameAndMail} id="outlined-basic" label="Email"  variant="filled" name='user_email' />
                <TextField style={{ marginTop: 20, width: '100%', color: 'white', backgroundColor: 'white', borderRadius: '10px' }} id="filled-multiline-static" label="Mensaje" multiline rows={7} variant="filled" name='message' />
                <Button variant='outlined' style={{marginTop:'20px', width:'20%'}}>Enviar</Button>
            </Box>
            </ThemeProvider>
        </motion.div>
    )
}

export default ContactForm