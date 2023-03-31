import React from "react"
import { Paper, Button } from '@mui/material'
import { motion } from "framer-motion"
import s from './NewsItems.module.css'

function NewsItems(props: any) {
    return (
        <motion.div className={s.ItemDIV}>
            <div className={s.TextDIV}>
                <h2>{props.item.name}</h2>
                <p>{props.item.description}</p>
            </div>
            <div className={s.ImgDIV}>
                <img className={s.carouselimg} src={props.item.img} />
            </div>
        </motion.div>
    )
}

export default NewsItems