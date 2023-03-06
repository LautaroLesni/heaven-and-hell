import React from 'react'
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCategory } from '../../redux/slices/categories';

interface ModalDeleteProps {
    id: string
}

const CategoriesModalDelete = ({id}:ModalDeleteProps) => {
    const dispatch = useCustomDispatch()
    const [modal, setModal] = useState(false);
    const { token } = useCustomSelector((state) => state.user)
    const handleModalOpen = () => setModal(true);
    const handleModalClose = () => setModal(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #ffffff',
        boxShadow: 24,
        p: 3,
    };

    const handleDelete = () =>{
        dispatch(deleteCategory(token,id))
    }

    return (
        <div>
            <DeleteIcon style={{margin:'5px', cursor:'pointer'}} onClick={handleModalOpen}/>
            <Modal
                style={{ overflow: 'scroll' }}
                open={modal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Borrar categoría
                    </Typography>
                    <Typography id="modal-modal-description" style={{width:'500px'}}sx={{ mt: 2 }}>
                        ¿Estás seguro que quieres eliminar permanentemente esta categoría?
                    </Typography>
                    <Grid style={{position:'relative', left:'50%', display:'flex', justifyContent:'space-around', width:'50%'}}>
                    <Button style={{ marginTop:'20px'}} variant="contained" onClick={handleDelete}>Eliminar</Button>
                    <Button style={{ marginTop:'20px'}} variant="contained" onClick={handleModalClose}>Cancelar</Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}

export default CategoriesModalDelete