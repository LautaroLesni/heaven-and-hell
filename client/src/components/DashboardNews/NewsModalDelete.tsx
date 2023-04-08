import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks';
import { deleteNoticia } from '../../redux/slices/news';

interface ModalDeleteProps {
    id: string
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #ffffff',
    boxShadow: 24,
    p: 3,
};


const NewsModalDelete = ({ id }: ModalDeleteProps) => {
    const { token } = useCustomSelector((state)=> state.user)
    const dispatch = useCustomDispatch()
    const [edit, setModal] = useState(false);
    const handleModalOpen = () => setModal(true);
    const handleModalClose = () => setModal(false);

    const handleDelete = () =>{
        dispatch(deleteNoticia(token,id))
        setModal(false);
    }
    return (
        <div>
            <DeleteIcon onClick={handleModalOpen} style={{ margin: '5px', cursor: 'pointer' }} />
            <Modal
                style={{ overflow: 'scroll' }}
                open={edit}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Borrar noticia
                    </Typography>
                    <Typography id="modal-modal-description" style={{width:'500px'}}sx={{ mt: 2 }}>
                        ¿Estás seguro que quieres eliminar permanentemente esta noticia permanentemente?
                    </Typography>
                    <Grid style={{position:'relative', left:'50%', display:'flex', justifyContent:'space-around', width:'50%'}}>
                    <Button style={{ marginTop:'20px'}} variant="contained" onClick={handleDelete}>Eliminar</Button>
                    <Button style={{ marginTop:'20px'}} variant="contained" onClick={handleModalClose}>Cancelar</Button>
                    </Grid>
                </Box>
            </Modal>
        </div>)
}

export default NewsModalDelete