import React from 'react'
import { useState, useEffect } from "react";
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { traerCategorias } from '../../redux/slices/categories';
import { updateProduct } from '../../redux/slices/products';
import EditIcon from '@mui/icons-material/Edit';
import s from './ProductsModalCreate.module.css'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from '../../utils/axiosconfig'

/* img,description,height,width,weight,materials,categories */
interface CreateForm {
    name: string
    description: string
    img: string
    height: string
    width: string
    weigth: string
    materials: string
    categories: Categories[]
}

const ProductsModalEdit = ({id,name,description,img,height,width,weigth,materials,categorias}:any) =>{
    const initialState: CreateForm = {
        name,
        description,
        img,
        height,
        width,
        weigth,
        materials,
        categories: categorias
    }
    const { categories } = useCustomSelector((state) => state.categories)
    const { token } = useCustomSelector((state) => state.user)
    const dispatch = useCustomDispatch()
    const [edit, setModal] = useState(false);
    const [input, setInput] = useState(initialState)
    const [imageInput, setImageInput] = useState<HTMLInputElement["files"] | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const handleEditOpen = () => setModal(true);
    const handleEditlClose = () => {
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
        if (input.categories.length > 0){
            const categoriesid:any = []           
            input.categories.map(cat => categoriesid.push(cat.id.toString()))
            finalInput.categories = categoriesid
            dispatch(updateProduct(finalInput, token, id))
        }
        else if (input.categories.length === 0){
            dispatch(updateProduct(finalInput, token, id))
        }
        setInput(initialState)
        setModal(false)
    }
    const handleSelector = (event: SelectChangeEvent) => {
        let isRepeated = input.categories.find(cat => cat.id!.toString() === event.target.value)
        if (!isRepeated) {
            const categoryfound = categories?.find(cat => cat.id!.toString() === event.target.value)
            setInput({
                ...input,
                [event.target.name]: [...input.categories, categoryfound]
            })
            console.log('adding it to the array')
        };
        if (isRepeated) {
            console.log('lets not do that again')
        }

    }
    const DeleteCategory = (e:any) => {
        e.preventDefault()
        setInput((prevState) => ({
            ...prevState, categories: input.categories.filter(cat => cat.name !== e.target.name)
        }))
    }
    const selectImage = (e:any)=>{
        if (e.target.files.length > 0){
        setImageInput(e.target.files!)
        const previewURL = URL.createObjectURL(e.target.files[0])
        setImagePreview(previewURL)
        }
    }

    const uploadImage = async() =>{
        if (imageInput){
       const { data }  = await axios.get('images/s3')  // data es la url segura generada por el backend que nos permite subir la imagen a S3
       console.log(data.url)
       await axios.put(data.url,imageInput[0],{headers:{"Content-Type":"multipart/form-data"}})
       const imageURL = data.url.split("?")[0]
       setInput((prevState) => ({
        ...prevState, img: imageURL
    }))
        }
    }



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
        alignItems:'center',
        marginBottom: '5px'
    }

    useEffect(() => {
        if (categories!.length === 0) {
            dispatch(traerCategorias())
        }
    }, [])
    return (
    <div>
     <EditIcon onClick={handleEditOpen} style={{margin:'5px', cursor:'pointer'}}/>
     <Modal
                    style={{ overflow: 'scroll' }}
                    open={edit}
                    onClose={handleEditlClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={outterBox}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edita tu producto!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Para poder editar tu producto debes cambiar los valores y presionar el botón "Guardar"
                        </Typography>
                        <TextField style={{ marginTop: 20 }} id="outlined-basic" label="Nombre" required variant="outlined" name='name' value={input.name} onChange={handleChange} />
                        <TextField style={{ marginTop: 10, width: '100%' }} id="filled-multiline-static" label="Descripción" multiline rows={7} variant="filled" name='description' value={input.description} onChange={handleChange} />
                        <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-around', marginTop:'10px', border:'1px solid gray', borderRadius:'10px', height:'100px'}}>
                            <Box sx={{display:'flex', flexDirection:'column'}}>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={selectImage}/>
                            <PhotoCamera />
                        </IconButton>
                        <Button component="label">
                                Cambiar Imagen
                                <input hidden accept="image/*" multiple type="file" onChange={selectImage} />
                            </Button>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'center',alignItems:'center',height:'100px', width:'100px'}}>
                              {imagePreview ? 
                              <img style={{objectFit:'cover',overflow:'hidden', border:'1px solid black', borderRadius:'5px', padding:'2px', justifyContent:'center', alignContent:'center',height:'100px', width:'100%'}} src={imagePreview}/>
                               : input.img ? 
                               <img style={{objectFit:'cover',overflow:'hidden', border:'1px solid black', borderRadius:'5px', padding:'2px', justifyContent:'center', alignContent:'center',height:'100px', width:'100%'}} src={input.img} /> : null}</Box>               
                        </Box>
                        <Box style={innerBox}>
                            <TextField style={{ marginTop: 20 }} id="outlined-basic" label="Altura (cm)" required variant="outlined" name='height' value={input.height} onChange={handleChange} />
                            <TextField style={{ marginTop: 20 }} id="outlined-basic" label="Ancho (cm)" required variant="outlined" name='width' value={input.width} onChange={handleChange} />
                        </Box>
                        <Box style={innerBox}>
                            <TextField style={{ marginTop: 20 }} id="outlined-basic" label="Peso (kg)" required variant="outlined" name='weigth' value={input.weigth} onChange={handleChange} />
                            <TextField style={{ marginTop: 20 }} id="outlined-basic" label="Materiales" required variant="outlined" name='materials' value={input.materials} onChange={handleChange} />
                        </Box>
                        <Box style={categoriesBox}>
                            <Box style={{ display: 'flex', width: '100%', height: 'fit-content', backgroundColor: '#d9d9d9', flexWrap: 'wrap' }}>
                                {input.categories.map(cat => (
                                    <div key={cat.id} className={s.categoryname}>
                                    <h5>{cat.name}</h5>
                                    <button name={cat.name} className={s.deletebutton} onClick={DeleteCategory}>X</button>
                                    </div>
                                ))}
                            </Box>
                        </Box>
                        <FormControl fullWidth style={{ marginTop: '20px' }}>
                            <InputLabel id="demo-simple-select-label">Categorias</InputLabel>
                            <Select
                                style={{ width: '40%' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value=''
                                label="Categorias"
                                onChange={handleSelector}
                                name='categories'
                            >
                                {categories?.map(cat => (
                                    <MenuItem key={cat.id!} value={cat.id!}>{cat.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button style={{ marginTop: 20, color: 'white', width:'100px' }} type='submit' variant='contained' color='primary' onClick={handleSubmit}>Guardar</Button>
                    </Box>
                </Modal>
    </div>)
}

export default ProductsModalEdit