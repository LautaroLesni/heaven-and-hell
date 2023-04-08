import React from 'react'
import { useState, useEffect } from "react";
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createNoticia } from '../../redux/slices/news';
import s from './NewsModalCreate.module.css'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from '../../utils/axiosconfig'


/* img,description,height,width,weight,materials,categories */
interface NewsForm {
    title: string
    description: string
    img: string
    link: string
}

const initialState: NewsForm = {
    title: '',
    description: '',
    img: '',
    link: ''
}


const NewsModalCreate = () => {
    const { token } = useCustomSelector((state:any) => state.user)
    const dispatch = useCustomDispatch()
    const [edit, setModal] = useState(false);
    const [input, setInput] = useState(initialState)
    const [imageInput, setImageInput] = useState<HTMLInputElement["files"] | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const handleModalOpen = () => setModal(true);
    const handleModalClose = () => {
        setModal(false);
        setImagePreview(null)
        setImageInput(null)
    }
    const handleChange = (e: any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault()
        let finalInput = input
        if (imageInput){
            const { data }  = await axios.get('images/s3')  // data es la url segura generada por el backend que nos permite subir la imagen a S3
            console.log(data.url)
            await axios.put(data.url,imageInput[0],{headers:{"Content-Type":"multipart/form-data"}})
            const imageURL = data.url.split("?")[0]
            finalInput.img = imageURL
            console.log('Imagen subida')
             }

            dispatch(createNoticia(finalInput, token))
        setInput(initialState)
        setModal(false)
    }

    const selectImage = (e:any)=>{
        if (e.target.files.length > 0){
        setImageInput(e.target.files!)
        const previewURL = URL.createObjectURL(e.target.files[0])
        setImagePreview(previewURL)
        }
    }

/*     const uploadImage = async() =>{
        if (imageInput){
       const { data }  = await axios.get('images/s3')  // data es la url segura generada por el backend que nos permite subir la imagen a S3
       console.log(data.url)
       await axios.put(data.url,imageInput[0],{headers:{"Content-Type":"multipart/form-data"}})
       const imageURL = data.url.split("?")[0]
       setInput((prevState) => ({
        ...prevState, img: imageURL
    }))
        }
    } */



    const outterBox = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        top: {
            xs: '66%', // 0
            sm: '50%', // 600
            md: '50%', // 900
            lg: '50%', // 1200
            xl: '50%' // 1536
        },
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: 375, // 0
            sm: 475, // 600
            md: 600, // 900
            lg: 600, // 1200
            xl: 700 // 1536
        },
        bgcolor: 'background.paper',
        border: '2px solid #ffffff',
        boxShadow: 24,
        p: 3
    };
    const innerBox = {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '0px',
        width: '100%',
        backgroundColor: 'white'
    }
    const categoriesBox = {
        display: 'flex',
        backgroundColor: '#d9d9d9',
        marginTop: '20px',
        height: '60px',
        width: '100%',
        alignItems: 'center',
        marginBottom: '5px'
    }

    const theme = createTheme({
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: '#b6a481',
            },
            secondary: {
                // This is green.A700 as hex.
                main: '#044a21',
            },
        },
    });

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button onClick={handleModalOpen} style={{ marginTop: 40, color: 'white' }} type='submit' variant='contained' color='primary'>Crear noticia</Button>
                <Modal
                    style={{ overflow: 'scroll' }}
                    open={edit}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={outterBox}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Crea tu noticia!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Para poder crear tu noticia debes rellenar los valores necesarios y presionar el botón "Crear"
                        </Typography>
                        <TextField style={{ marginTop: 20 }} id="outlined-basic" label="Titulo" required variant="outlined" name='title' value={input.title} onChange={handleChange} />
                        <TextField style={{ marginTop: 10, width: '100%' }} id="filled-multiline-static" label="Descripción" multiline rows={7} variant="filled" name='description' value={input.description} onChange={handleChange} />
                        <TextField style={{ marginTop: 20 }} id="outlined-basic" label="Link" required variant="outlined" name='link' value={input.link} onChange={handleChange} />
                        <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-around', marginTop:'10px', border:'1px solid gray', borderRadius:'10px', height:'100px'}}>
                            <Box sx={{display:'flex', flexDirection:'column'}}>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={selectImage}/>
                            <PhotoCamera />
                        </IconButton>
                        <Button component="label">
                                Subir Imagen
                                <input hidden accept="image/*" multiple type="file" onChange={selectImage} />
                            </Button>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'center',alignItems:'center',height:'100px', width:'100px'}}>
                              {imagePreview ? 
                              <img style={{objectFit:'cover',overflow:'hidden', border:'1px solid black', borderRadius:'5px', padding:'2px', justifyContent:'center', alignContent:'center',height:'100px', width:'100%'}} src={imagePreview}/>
                               : input.img ? 
                               <img style={{objectFit:'cover',overflow:'hidden', border:'1px solid black', borderRadius:'5px', padding:'2px', justifyContent:'center', alignContent:'center',height:'100px', width:'100%'}} src={input.img} /> : null}</Box>                 
                        </Box>
                        <Button style={{ marginTop: 20, color: 'white' }} type='submit' variant='contained' color='primary' onClick={handleSubmit}>Crear</Button>
                    </Box>
                </Modal>
            </ThemeProvider>
        </div>)
}

export default NewsModalCreate