import React from "react";
import s from './ProductCard.module.css'
import { Link } from 'react-router-dom'
interface Props{
    id:number | null
    name:string | null
    description:string | null
    img:string | null
    createdAt:string | null
    categories:object[] | null
}

function ProductCard(props:any) {
    const {id, name, description, img, createdAt, categories} = props
    return (
      <div className={s.outterDIV}>
        <div className={s.imgDIV}>
        <img src={img} alt={name}/>
        </div>
        <div className={s.textDIV}>
        <h4>{name}</h4>
        <Link to={`/products/${id}`}>Ver más</Link>     
        </div>
        
      </div>
    );
  }
  
  export default ProductCard;
  