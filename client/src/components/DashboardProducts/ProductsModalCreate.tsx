import React from 'react'
import { useState, useEffect } from "react";
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { traerCategorias } from '../../redux/slices/categories';
import { createProduct } from '../../redux/slices/products';
import s from './ProductsModalCreate.module.css'

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
const initialState: CreateForm = {
    name: '',
    description: '',
    img: '',
    height: '',
    width: '',
    weigth: '',
    materials: '',
    categories: []
}

const ProductsModalCreate = () => {
    const { categories } = useCustomSelector((state) => state.categories)
    const { token } = useCustomSelector((state) => state.user)
    const dispatch = useCustomDispatch()
    const [edit, setModal] = useState(false);
    const [input, setInput] = useState(initialState)
    const handleModalOpen = () => setModal(true);
    const handleModalClose = () => setModal(false);
    const handleChange = (e: any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (input.categories.length > 0){
            const categoriesid:any = []
            const finalForm = input
            input.categories.map(cat => categoriesid.push(cat.id.toString()))
            finalForm.categories = categoriesid
            dispatch(createProduct(finalForm, token))
        }
        else if (input.categories.length === 0){
            dispatch(createProduct(input, token))
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

    useEffect(() => {
        if (categories!.length === 0) {
            dispatch(traerCategorias())
        }
    }, [])
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button onClick={handleModalOpen} style={{ marginTop: 10, color: 'white' }} type='submit' variant='contained' color='primary'>Crear producto</Button>
                <Modal
                    style={{ overflow: 'scroll' }}
                    open={edit}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={outterBox}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Crea tu producto!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Para poder crear tu producto debes rellenar los valores necesarios y presionar el botón "Crear"
                        </Typography>
                        <TextField style={{ marginTop: 20 }} id="outlined-basic" label="Nombre" required variant="outlined" name='name' value={input.name} onChange={handleChange} />
                        <TextField style={{ marginTop: 10, width: '100%' }} id="filled-multiline-static" label="Descripción" multiline rows={7} variant="filled" name='description' value={input.description} onChange={handleChange} />
                        <TextField style={{ marginTop: 10, width: '100%' }} id="filled-multiline-static" label="Imagen" variant="outlined" name='img' value={input.img} onChange={handleChange} />
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
                        <Button style={{ marginTop: 20, color: 'white' }} type='submit' variant='contained' color='primary' onClick={handleSubmit}>Crear</Button>
                    </Box>
                </Modal>
            </ThemeProvider>
        </div>)
}

export default ProductsModalCreate