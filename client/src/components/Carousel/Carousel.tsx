import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Item from './Item';
import EditIcon from '@mui/icons-material/Edit';
import s from './Item.module.css'

function Caroussel() {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            img: "https://wallpaperset.com/w/full/5/b/f/57615.jpg"
        },
        {
            name: "Random Name #4",
            description: "Hello World!",
            img: "https://i.pinimg.com/originals/2a/f1/ae/2af1aed005e4433f76a396344ef3971c.jpg"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            img: "https://wallpaperaccess.com/full/502839.png"
        },
        {
            name: "Random Name #3",
            description: "Hello World!",
            img: "https://www.themoviedb.org/t/p/original/jb2JDamfehPdKxJ7s1nt2VJWCJZ.jpg"
        },
    ]

    return (
        <div className={s.carouseldiv}>
            <Carousel
                indicatorIconButtonProps={{
                    style: {
                        display:'none',
                        padding: '5px',    // 1
                        color: 'gray'       // 3
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: '#8c0d0d' // 2
                    }
                }}>
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
        </div>
    )
}

export default Caroussel
