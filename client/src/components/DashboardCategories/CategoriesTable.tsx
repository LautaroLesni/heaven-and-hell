import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from './CategoriesTable.module.css'
import { useCustomSelector, useCustomDispatch } from "../../hooks/hooks";
import { useEffect } from "react";
import { traerCategorias } from "../../redux/slices/categories";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const CategoriesTable = () =>{

    const { categories } = useCustomSelector((state)=> state.categories)
    const dispatch = useCustomDispatch()
   
    useEffect(()=>{
        if (categories!.length === 0){
            dispatch(traerCategorias())
        }
    },[dispatch])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    return (
        <TableContainer component={Paper}>
        <h1 className={s.title}>Categories</h1>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell className={s.tableCell}>Name</StyledTableCell>
              <StyledTableCell className={s.tableCell}>Edicion</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {categories?.map((cat) => (
              <StyledTableRow
                key={cat.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}            >
                <StyledTableCell component="th" scope="row">
                  {cat.id}
                </StyledTableCell>
                <StyledTableCell className={s.tableCell}>{cat.name}</StyledTableCell>
                <StyledTableCell className={s.tableCell}><EditIcon className={s.button}/><DeleteIcon className={s.button}/></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default CategoriesTable