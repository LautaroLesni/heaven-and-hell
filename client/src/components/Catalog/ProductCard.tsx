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
        <Link className={s.imgDIV} to={`/products/${id}`}><img src={img} alt={name}/></Link>
        <div className={s.textDIV}>
        <h4 className={s.productName}><Link to={`/products/${id}`}>{name}</Link>  </h4>
        <Link  className={s.seemore}to={`/products/${id}`}>Ver más</Link>     
        </div>
        
      </div>
    );
  }
  
  export default ProductCard;
  