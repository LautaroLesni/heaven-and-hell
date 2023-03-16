import React, { useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useCustomDispatch, useCustomSelector } from "../../hooks/hooks";
import { traerProducto, setProduct } from "../../redux/slices/products";
import s from './SpecificProduct.module.css'
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const SpecificProduct = () => {
    const { id } = useParams()
    const dispatch = useCustomDispatch()
    const { product } = useCustomSelector((state) => state.products)

    useEffect(() => {
        if (id) {
            dispatch(traerProducto(id))
        }
        return () => {
            dispatch(setProduct(null))
            console.log('unmounting component')
        }
    }, [])

    console.log(product)
    return (
        <div>
            <NavBar />
            <div className={s.OutterDiv}>
                <div className={s.SpecificOutterDIV}>
                <div className={s.SpecificDIV}>
                <Link to={'/products'}>Atras</Link>
                    {product ? 
                    <div className={s.SpecificInnerDIV}>
                        <div className={s.imgDIV}>
                        <img src={product.img!} alt={product.name!} />
                        </div>
                        <div className={s.Text}>
                        <h1>{product.name}</h1>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                        <TextField name='cantidad'  id="filled-basic" label="Cantidad" variant="filled" size="small" style={{ width:'25%',backgroundColor: 'white', borderRadius: '10px' }}/>
                        <Button variant="contained" style={{ width:'25%', height: '45px', backgroundColor:'#500505' }}>Consultar</Button>
                        </Box>
                        <p>{product.description}</p>
                        </div>
                        
                    </div> 
                    : 'Loading'}
                </div>
                </div>
            </div>
        </div>)
}

export default SpecificProduct