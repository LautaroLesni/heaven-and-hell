import React, { useState } from "react";
import ProductCard from "./ProductCard";
import s from './CatalogRendered.module.css'
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks'
import { setLoaded } from "../../redux/slices/products";
import { setLoadedCategories } from "../../redux/slices/categories";
import { useEffect } from 'react'
import { traerProductos } from "../../redux/slices/products";
import { traerCategorias } from "../../redux/slices/categories";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import BasicPagination from "./Pagination";

function CatalogRendered() {
    const { products } = useCustomSelector((state) => state.products)
    const { loadedProducts } = useCustomSelector((state) => state.products)
    //paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(8)
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentproducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    const dispatch = useCustomDispatch()

    useEffect(() => {
        if (products?.length === 0 && loadedProducts === false) {
            dispatch(traerProductos())
            dispatch(traerCategorias())
            console.log('traigo data')
            dispatch(setLoaded(true))
            dispatch(setLoadedCategories(true))
        }
    }, [currentPage])

    useEffect(() => {
        if (currentPage > Math.ceil(products.length / productsPerPage) && products.length > 0) {
            setCurrentPage(1)
            console.log('cambio pagina')
        }
    }, [currentPage, productsPerPage, products.length])

    return (
        <div className={s.OutterDIV}>
            <SearchBar />
            <motion.div className={s.catalogDIV}
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, stiffness: 0, duration: 0.8 }}
                viewport={{ once: true }}>
                {currentproducts.length === 0 && loadedProducts === false ? <h1>Cargando...</h1> : currentproducts.length === 0 && loadedProducts === true ?
                    <h1>No se encontraron productos en la base de datos</h1> :
                    currentproducts?.map(product => (
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
            <BasicPagination setCurrentPage={(productos: any) => setCurrentPage(productos)} currentPage={currentPage} productsPerPage={productsPerPage} />
        </div>
    );
}

export default CatalogRendered;
