import React from "react";
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
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
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import s from './NewsTable.module.css'
import { useCustomSelector, useCustomDispatch } from "../../hooks/hooks";
import { useEffect } from "react";
import TableFooter from '@mui/material/TableFooter';
import { traerNoticias } from "../../redux/slices/news";
import ProductsModalDelete from "./NewsModalDelete";
import ProductsModalEdit from "./NewsModalEdit";
import { setLoadedNews } from "../../redux/slices/news";

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

const NewsTable = () => {

  const { noticias } = useCustomSelector((state) => state.news)
  const { loadedNews } = useCustomSelector((state) => state.news)
  const dispatch = useCustomDispatch()

  useEffect(() => {
    if (noticias.length === 0 && loadedNews === false) {
      dispatch(traerNoticias())
      dispatch(setLoadedNews(true))
    }
  }, [dispatch])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - noticias.length) : 0;

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


  //MUI Styles

  const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
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
    noticias.length === 0 && loadedNews === false ? <h1>Cargando...</h1> : noticias.length === 0 && loadedNews === true ?
      <h1 style={{textAlign:'center'}}>No se encontraron noticias en la base de datos</h1> : <TableContainer component={Paper}
        sx={tableStyle}>
        <h1 className={s.title}>Noticias</h1>
        <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={displayTables}>ID</StyledTableCell>
              <StyledTableCell className={s.tableCell}>Titulo</StyledTableCell>
              <StyledTableCell sx={displayTables} className={s.tableCell}>Fecha de creación</StyledTableCell>
              <StyledTableCell className={s.tableCell}>Imagen</StyledTableCell>
              <StyledTableCell className={s.tableCell}>Link</StyledTableCell>
              <StyledTableCell className={s.tableCell}>Edicion</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? noticias.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : noticias
            ).map((noticias: any) => (
              <StyledTableRow key={noticias.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell sx={displayTables} component="th" scope="row">
                  {noticias.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {noticias.title.length > 20 ? `${noticias.title.slice(0, 20)}...` : `${noticias.title}`}
                </StyledTableCell>
                <StyledTableCell sx={displayTables} align="left">
                  {noticias.createdAt}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <a href={noticias.img} target='_blank' rel="noreferrer noopener">{noticias.img.slice(0, 30)}</a>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <a href={noticias.link} target='_blank' rel="noreferrer noopener">{noticias.link.slice(0, 30)}</a>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <div style={{ display: 'flex' }}>
                    <ProductsModalEdit
                      id={noticias.id}
                      title={noticias.title}
                      description={noticias.description}
                      img={noticias.img}
                      link={noticias.link}
                    />
                    <ProductsModalDelete
                      id={noticias.id.toString()} />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={5} />
              </StyledTableRow>
            )}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                style={{ backgroundColor: '#ffffff' }}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={noticias.length}
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
  )
}

export default NewsTable