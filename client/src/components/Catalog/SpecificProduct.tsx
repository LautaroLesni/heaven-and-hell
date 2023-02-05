import React, { useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useCustomDispatch, useCustomSelector } from "../../hooks/hooks";

const SpecificProduct = () =>{
    const {id} = useParams()
    const dispatch = useCustomDispatch()

    
    return (
    <div>
        <NavBar />
    </div>)
}

export default SpecificProduct