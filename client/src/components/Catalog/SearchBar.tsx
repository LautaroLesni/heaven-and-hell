import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react'
import {  filteredByCategory, filteredByName } from '../../redux/slices/products'
import { useCustomDispatch, useCustomSelector } from '../../hooks/hooks';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { motion } from 'framer-motion';

const SearchBar = () => {
    const dispatch = useCustomDispatch();
    const { categories } = useCustomSelector((state) => state.categories)

    const [input, setInput] = useState({
        name: '',
        category:''
    })

    const handleChange = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSelector = (e:SelectChangeEvent) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        dispatch(filteredByCategory(e.target.value))
    }
    const handleSubmit = (e: any) => {
        if (e.key === 'Enter'){
        e.preventDefault();
        dispatch(filteredByName(input))
        console.log(e.type)
    }
    if (e.type === 'click'){
        dispatch(filteredByName(input))
    }
    }
    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0, stiffness: 0, duration: 1.3 }}
            viewport={{ once: true }}>
            <Box
                component="form"
                style={{ padding: '10px', display: 'flex', alignItems: 'center'}}
                noValidate
                autoComplete="off">
                <FormControl sx={{ m: 1, minWidth: 120 }} style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                    <Select
                        name='category'
                        value={input.category}
                        onChange={handleSelector}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value=''>
                            <em>Todos</em>
                        </MenuItem>
                        {categories?.map(category=>(
                            <MenuItem key={category.id} value={category.id?.toString()}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField name='name' value={input.name} onChange={handleChange} onKeyDown={handleSubmit} id="filled-basic" label="Busqueda" variant="filled" size="medium" style={{ backgroundColor: 'white', borderRadius: '10px' }} />
                <Button variant="contained" style={{ width: '25px', height: '45px', marginLeft: '5px', backgroundColor:'#500505' }} onClick={handleSubmit}>
                    Search
                </Button>
            </Box>
        </motion.div>
    )
}

export default SearchBar