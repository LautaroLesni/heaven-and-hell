import React from 'react';
import Carousel from 'react-material-ui-carousel'
import NewsItems from './NewsItems';
import s from './HomeNews.module.css'
import { motion } from 'framer-motion';

const CarouselSX = {
    width: {
        xs: '100%', // 0
        sm: '100%', // 600
        md: '1000px', // 900 - 1200
        lg: '1250px', // 1200 - 1400
        xl: '1250px' // 1536 - Above
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    flexDirection: {
        xs: 'column', // 0
        sm: 'column', // 600
        md: 'column', // 900
        lg: 'column', // 1200
        xl: 'column' // 1536}
    }
}

function HomeNews() {
    var items = [
        {
            name: "Nuevo Catalogo",
            description: "Probably the most random thing you have ever seen!",
            img: "https://wallpaperset.com/w/full/5/b/f/57615.jpg"
        },
        {
            name: "Laberinto del terror",
            description: "Hello World!",
            img: "https://i.pinimg.com/originals/2a/f1/ae/2af1aed005e4433f76a396344ef3971c.jpg"
        },
        {
            name: "Conocenos más",
            description: "Si te gustaría ver mas sobre nosotros te invitamos a ver la sección 'Sobre nosotros'.",
            img: "https://wallpaperaccess.com/full/502839.png"
        },
        {
            name: "Contactanos",
            description: "¿Te gustaría contactarte con nosotros para hacernos alguna consulta o propuesta? Podés hacerlo a través de nuestro Whatsapp",
            img: "https://www.themoviedb.org/t/p/original/jb2JDamfehPdKxJ7s1nt2VJWCJZ.jpg"
        },
    ]

    return (
        <motion.div className={s.carouselAlign}
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0, stiffness: 0, duration: 1.8 }}
        viewport={{ once: true }}>
            <Carousel
                sx={CarouselSX}
                indicatorIconButtonProps={{
                    style: {
                        display: 'none',
                        padding: '5px',    // 1
                        color: 'gray'       // 3
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: '#8c0d0d' // 2
                    }
                }}
                stopAutoPlayOnHover={false}>

                {
                    items.map((item, i) => <NewsItems key={i} item={item} />)
                }
            </Carousel>
        </motion.div>
    )
}

export default HomeNews
