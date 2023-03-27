import React from "react";
import s from './Proposito.module.css'
import { motion } from "framer-motion";

const Proposito = () => {
    return (
        <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, stiffness: 0, duration: 1.8 }}
            viewport={{ once: true }}
            className={s.outterDIV}>
                <div className={s.innerDIV}>
            <div className={s.propositoDIV}>
                <div className={s.alignBars}>
                    <hr className={s.barra} />
                    <h3>Productos</h3>
                </div>
                <p>Disponemos de productos de alta calidad hechos completamente desde cero con materiales inigualables en el mercado. No te pierdas la oportunidad de revisar nuestro catalogo. Si bien, nuestro catalogo inició y esta enfocado al terror, también contamos con diferentes esculturas de peliculas, musica, entre otros</p>
            </div>
            <div className={s.propositoDIV}>
                <div className={s.alignBars}>
                    <hr className={s.barra} />
                    <h3>Laberinto del terror</h3>
                </div>
                <p>Durante años tuvimos el placer de formar parte del laberinto del terror de "Voces Anonimas" en Uruguay, donde no solo ambientamos, si no que tambien tuvimos la posibilidad de innovar con nuevas técnicas para generar la mejor atmósfera, inmersión y experiencia posible. Actualmente estamos trabajando en un nuevo laberinto, pero esta vez para Argentina, si te interesa saber más visita:</p>
            </div>
            <div className={s.propositoDIV}>
                <div className={s.alignBars}>
                    <hr className={s.barra} />
                    <h3>Nosotros</h3>
                </div>
                <p>Contamos con artesanos que trabajan en cada uno de nuestros productos, desde la preparación de las piezas, hasta pintura, estilistas, entre otros.</p>
            </div>
            </div>
        </motion.div>
    )
}

export default Proposito