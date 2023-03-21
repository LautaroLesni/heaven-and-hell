import React from "react"
import { Paper, Button } from '@mui/material'
import s from './Item.module.css'

function Item(props: any)
{
    return (
        <div className={s.ItemDIV}>
            <img className={s.carouselimg} src={props.item.img}/>
        </div>
    )
}

export default Item