import React from "react";
import Table from '@mui/material/Table';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from './CategoriesTable.module.css'
import { useCustomSelector, useCustomDispatch } from "../../hooks/hooks";
import { useEffect } from "react";
import { traerCategorias, setLoadedCategories } from "../../redux/slices/categories";
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import EditIcon from '@mui/icons-material/Edit';
import CategoriesModalDelete from "./CategoriesModalDelete";
import CategoriesModalEdit from "./CategoriesModalEdit";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

const displayTables = {
  display: {
    xs: 'none', // 0
    sm: 'none', // 600
    md: 'none', // 900
    lg: 'ruby', // 1200
    xl: 'table-cell' // 1536}
  }
}
const tableStyle = {
  width: {
    xs: '98%', // 0
    sm: '98%', // 600
    md: '100%', // 900
    lg: '90%', // 1200
    xl: '90%' // 1536}
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

//React Component


const CategoriesTable = () => {

  const { categories } = useCustomSelector((state) => state.categories)
  const { loadedCategories } = useCustomSelector((state) => state.categories)
  const dispatch = useCustomDispatch()

  useEffect(() => {
    if (categories!.length === 0 && loadedCategories === false) {
      dispatch(traerCategorias())
      dispatch(setLoadedCategories(true))
    }
  }, [dispatch])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories!.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // MUI Styles

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
    categories!.length === 0 && loadedCategories === false ? <h1>Cargando...</h1> : categories!.length === 0 && loadedCategories === true ?
      <h1 style={{textAlign:'center'}}>No se encontraron categorías en la base de datos</h1> : <TableContainer component={Paper}
        sx={tableStyle}>
        <h1 className={s.title}>Categorias</h1>
        <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={displayTables}>ID</StyledTableCell>
              <StyledTableCell className={s.tableCell}>Name</StyledTableCell>
              <StyledTableCell className={s.tableCell} align='left'>Productos</StyledTableCell>
              <StyledTableCell className={s.tableCell}>Edicion</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? categories!.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : categories!
            ).map((categories: any) => (
              <StyledTableRow key={categories.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell component="th" scope="row" sx={displayTables}>
                  {categories.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {categories.name.length > 20 ? `${categories.name.slice(0, 20)}...` : `${categories.name}`}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <h4>{categories.products?.length}</h4>
                </StyledTableCell>
                <StyledTableCell align="left" style={{ display: 'flex', flexDirection: 'row' }}>
                  <CategoriesModalEdit
                    id={categories.id}
                    name={categories.name} />
                  <CategoriesModalDelete
                    id={categories.id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={3} />
              </StyledTableRow>
            )}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                style={{ backgroundColor: '#ffffff' }}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={categories!.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>


    /*         <TableContainer component={Paper}>
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
          </TableContainer> */
  )
}

export default CategoriesTable