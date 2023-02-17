import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import axios from '../../utils/axiosconfig';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import s from './LoginForm.module.css'
import hah from '../../utils/loginHAH.png'
import { useCustomDispatch, useCustomSelector } from '../../hooks/hooks';
import { setToken } from '../../redux/slices/user';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const paperStyle = { padding: 20, height: '30%', width: '60%', margin: "20px auto" }
const avatarStyle = { backgroundColor: '#640101' }
const btnstyle = { margin: '30px 0px' }
const background = { width: '100%', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:'red' }
const inputs = { margin: '5px 0px' }

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

function LoginForm() {
    const dispatch = useCustomDispatch()
    const state = useCustomSelector((state)=> state.user)
    const product: object = {
        name: "Test de creacion de objeto Frontend",
        description: "Test de creacion de objecto Frontend",
        img: "https://i.imgur.com/7mWjekR.jpeg",
        categories: ["10abed23-0db1-49ec-9e93-0a1ddd4bd36f"]
    }

    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () =>{
        const response = await axios.post('/users/login',input)
        if (response.data.status === 404 || response.data.status === 403){
            console.log('No encontrado')
        }
        else{
            dispatch(setToken(response.data.token))
        }
    }


    return (
            <div className={s.OutterDIV}>
            <motion.div className={s.row}
            initial={{ opacity: 0, y: 200 }}
            transition={{ delay: 0, duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className={s.whoamiIMGDIV}>
                <img src={hah} alt='Heaven and Hell' />
            </div>
            <div className={s.contenedorwhoami}>
                <Paper elevation={0} style={paperStyle}>
                    <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar style={avatarStyle}></Avatar>
                        <h2>Iniciar Sesion</h2>
                    </Grid>
                    <TextField style={inputs} label='Email' placeholder='Enter email' fullWidth value={input.email} name='email' onChange={handleChange} />
                    <TextField style={inputs} label='Password' placeholder='Enter password' type='password' fullWidth value={input.password} name='password' onChange={handleChange} />
                    <ThemeProvider theme={theme}>
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={handleSubmit}>Sign in</Button>
                    </ThemeProvider>
                </Paper>
            </div>
        </motion.div>
            </div>

    );
}

export default LoginForm;