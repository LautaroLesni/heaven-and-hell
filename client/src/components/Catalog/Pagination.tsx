import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useCustomSelector } from '../../hooks/hooks'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#8c0d0d',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#044a21',
    },
  },
});

function BasicPagination({setCurrentPage, currentPage, productsPerPage }:any,) {

    const { products } = useCustomSelector((state) => state.products)
  
    const handlePagination = (e:any,page:any)=>{
        setCurrentPage(page)
        console.log(e.target.getAttribute("aria-label"))
    }
/*     function defaultGetAriaLabel(type:any, page:any, selected:any) {

       return `Go to ${currentPage} page`; } */
    return (
    <div>

        <Stack spacing={2}>
            <ThemeProvider theme={theme}>
            <Pagination 
/*             getItemAriaLabel={defaultGetAriaLabel} */
            count={Math.ceil(products.length/productsPerPage)} 
            onChange={handlePagination}
            color="primary" style={{marginTop:'40px'}}size='large'/>
            </ThemeProvider>
        </Stack>
        </div>
    );
}

export default BasicPagination