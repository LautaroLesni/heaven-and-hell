import React from 'react'
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { updateCategory } from '../../redux/slices/categories';

interface CreateCategory {
    name: string
}
interface CategoryProps {
    id: string
    name:string
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

const CategoriesModalEdit = ({id,name}:CategoryProps) => {
    const initialState: CreateCategory = {
        name
    }
    const dispatch = useCustomDispatch()
    const [modal, setModal] = useState(false);
    const [input, setInput] = useState(initialState)
    const { token } = useCustomSelector((state) => state.user)
    const handleModalOpen = () => setModal(true);
    const handleModalClose = () => setModal(false);

    const handleSubmit = () =>{
        if (input.name !== ''){
            dispatch(updateCategory(input, token, id))
        }
        setModal(false)
    }
    const handleChange = (e: any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <EditIcon style={{margin:'5px', cursor:'pointer'}} onClick={handleModalOpen}/>
            <Modal
                style={{ overflow: 'scroll' }}
                open={modal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={outterBox}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edita tu categoria!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Para poder editar tu categoría debes rellenar los valores necesarios y presionar el botón "Guardar"
                    </Typography>
                    <Box sx={{width:'100%', display:'flex', justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
                    <TextField style={{ marginTop: 20, width:'50%' }} id="outlined-basic" label="Nombre" required variant="outlined" name='name' value={input.name} onChange={handleChange} />
                    <Button style={{ marginTop: 20, color: 'white', width:'75%' }} type='submit' variant='contained' color='primary' onClick={handleSubmit}>Guardar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default CategoriesModalEdit