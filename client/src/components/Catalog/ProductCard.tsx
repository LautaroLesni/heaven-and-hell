import React from "react";
import s from './ProductCard.module.css'
interface Props{
    id:number
    name:string
    description:string
    img:string
    createdAt:string
    categories:object[]
}

function ProductCard(props:Props) {
    const {id, name, description, img, createdAt, categories} = props
    return (
      <div className={s.outterDIV}>
        <img src={img} alt={name}/>
        <h4>{name}</h4>
        
      </div>
    );
  }
  
  export default ProductCard;
  