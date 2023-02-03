import React from "react";
import ProductCard from "./ProductCard";
import s from './CatalogRendered.module.css'
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks'
import { useEffect } from 'react'
import { traerProductos } from "../../redux/slices/products";
import { traerCategorias } from "../../redux/slices/categories";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

function CatalogRendered() {
    const { products } = useCustomSelector((state) => state.products)
    const { categories } = useCustomSelector((state) => state.categories)
    const dispatch = useCustomDispatch()

    useEffect(() => {
        if (products?.length === 0) {
            dispatch(traerProductos())
            dispatch(traerCategorias())
        }
    }, [])

    console.log(categories)
    return (
        <div className={s.OutterDIV}>
            <SearchBar />
            <motion.div className={s.catalogDIV}
                initial={{ opacity:0, y: 200 }}
                animate={{ opacity:1, y: 0 }}
                transition={{ delay: 0, stiffness: 0, duration: 0.8 }}
                viewport={{ once: true }}>
                {products?.map(product => (
                    <div key={product.id}>
                        <ProductCard
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            img={product.img}
                            createdAt={product.createdAt}
                            categories={product.categories} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default CatalogRendered;
