import React from "react";
import { dbprueba } from './prueba'
import ProductCard from "./ProductCard";
import s from './CatalogRendered.module.css'
import { useCustomSelector } from '../../hooks/hooks'

function CatalogRendered() {
    const useSelector = useCustomSelector((state) => state.user)
    console.log(useSelector)
    return (
        <div>
            <h1>Here goes the cards</h1>
            <div className={s.catalogDIV}>
                {dbprueba?.map(product => (
                    <div>
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            img={product.img}
                            createdAt={product.createdAt}
                            categories={product.categories} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CatalogRendered;
