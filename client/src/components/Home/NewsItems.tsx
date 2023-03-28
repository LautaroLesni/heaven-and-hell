import React from "react"
import { Paper, Button } from '@mui/material'
import s from './NewsItems.module.css'

function NewsItems(props: any)
{
    return (
        <div className={s.ItemDIV}>
            <div className={s.TextDIV}>
                <h2>{props.item.name}</h2>
                <p>{props.item.description}</p>
            </div>
            <div className={s.ImgDIV}>
             <img className={s.carouselimg} src={props.item.img}/> 
            </div>
        </div>
    )
}

export default NewsItems