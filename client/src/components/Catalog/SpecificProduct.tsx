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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Footer from "../Footer/Footer";

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

const buttonStyle = {
    width: '100%', height: '45px', backgroundColor: '#500505'
}
    return (
        <div>
            <NavBar />
            <div className={s.OutterDiv}>
                <div className={s.SpecificOutterDIV}>
                    <div className={s.SpecificDIV}>
                        <Link className={s.Atras} to={'/products'}><ArrowCircleLeftIcon sx={{ fontSize: 40 }} /></Link>
                        {product ?
                            <div className={s.SpecificInnerDIV}>
                                <div className={s.imgDIV}>
                                    <img src={product.img!} alt={product.name!} />
                                </div>
                                <div className={s.Text}>
                                    <h1>{product.name}</h1>
                                    {product.description !== '' ? <hr /> : null}
                                    <p>{product.description}</p>
                                    {product.description !== '' ? <hr /> : null}
                                    <h3>Especificaciones sobre el producto:</h3>
                                    <ul>
                                        <li>* Altura:{product.height !== '' ? product.height : 'N/A'} cm</li>
                                        <li>* Ancho:{product.width !== '' ? product.width : 'N/A'} cm</li>
                                        <li>* Peso: {product.weigth !== '' ? product.weigth : 'N/A'} kg</li>
                                        <li>* Materiales: {product.materials !== '' ? product.materials : 'N/A'}</li>
                                    </ul>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <a href={`https://api.whatsapp.com/send?phone=1157548304&text=Hola!%20%C2%BFComo%20est%C3%A1s?%20Me%20contacto%20porque%20me%20interes%C3%B3%20${product.name},%20que%20acabo%20de%20ver%20en%20el%20siguiente%20link:%20${window.location.href},%20de%20su%20pagina%20web`}className={s.WhatsappLink} style={{display:'flex',justifyContent:'center',alignItems:'center',}}>Consultar <WhatsAppIcon sx={{marginLeft:'4px', position:'relative', top:'-2px'}}/></a>
                                    </Box>
                                </div>

                            </div>
                            : 'Loading'}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>)
}

export default SpecificProduct