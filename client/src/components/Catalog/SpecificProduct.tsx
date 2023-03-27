import React, { useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useCustomDispatch, useCustomSelector } from "../../hooks/hooks";
import { traerProducto, setProduct } from "../../redux/slices/products";
import s from './SpecificProduct.module.css'
import { Link } from "react-router-dom";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
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
                <Link to={'/products'}><ArrowCircleLeftIcon/></Link>
                    {product ? 
                    <div className={s.SpecificInnerDIV}>
                        <div className={s.imgDIV}>
                        <img src={product.img!} alt={product.name!} />
                        </div>
                        <div className={s.Text}>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <ul>
                            <li>{}</li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                        <Button variant="contained" style={{ width:'100%', height: '45px', backgroundColor:'#500505' }}>Consultar</Button>
                        </Box>
                        </div>
                        
                    </div> 
                    : 'Loading'}
                </div>
                </div>
            </div>
        </div>)
}

export default SpecificProduct