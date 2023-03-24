import React from "react";
import s from './Proposito.module.css'
import { motion } from "framer-motion";

const Proposito = () => {
    return (
        <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0, stiffness: 0, duration: 1.8 }}
            viewport={{ once: true }}
            className={s.outterDIV}>
            <div className={s.propositoDIV}>
                <div className={s.alignBars}>
                    <hr className={s.barra} />
                    <h3>Proposito</h3>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates optio perferendis minima laborum autem sunt quibusdam quae animi aspernatur? Voluptatem explicabo amet itaque eius quia aliquid reprehenderit quidem. Libero, ratione quas. Deleniti aliquam ex porro sint. Libero placeat ut ipsam omnis commodi? Voluptatum explicabo libero architecto quam dolorem id quo accusamus facilis eligendi, facere, enim deleniti, perspiciatis cum? Eligendi natus molestias, ullam commodi corrupti laboriosam deleniti omnis error eaque unde veniam quis amet tempore, hic voluptatum saepe impedit, sunt libero aliquid porro eos ut ex dolorum iure? Nostrum eos explicabo et veritatis quo recusandae, deserunt officiis incidunt nulla perspiciatis laudantium?</p>
            </div>
        </motion.div>
    )
}

export default Proposito