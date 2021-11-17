import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import myFetch from './fetcher';
import DeleteHostedButton from './DeleteHostedButton';
import LiveHostedButton from './LiveHostedButton';

const columns = [
  { id: 'content', label: 'Content', minWidth: 500 },
  { id: 'Buttons', maxWidth: 5 },
];

export default function ColumnGroupingTable () {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    myFetch('GET', 'listings', null)
      .then((data) => {
        const hostedIdList = [];
        for (const row of data.listings) if (localStorage.getItem('user') === row.owner) hostedIdList.push(row.id)
        Promise.all(hostedIdList.map(id => myFetch('GET', 'listings/' + id, null))).then(responses =>
          Promise.all(responses.map(res => res.listing))
        ).then(data => {
          const newRow = [];
          let idIndex = 0;
          for (const res of data) {
            newRow.push({
              content: <>
                <span style={{ height: '100%' }}><img src={res.thumbnail} /></span>
                <span>{'Title: ' + res.title + 'Property Type: ' + res.metadata.propType + 'Bedrooms: ' + res.metadata.beds + 'Bathrooms: ' + res.metadata.bathrooms + 'Price: ' + res.price + 'Reviews: ' + res.reviews}</span>
              </>,
              code: hostedIdList[idIndex],
              Buttons: <>
                <DeleteHostedButton id={hostedIdList[idIndex]}/>
                <LiveHostedButton id={hostedIdList[idIndex]}></LiveHostedButton>
              </>,
            })
            idIndex++;
          }
          setRows(newRow)
        })
      })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = useNavigate();

  const editRoute = (id) => {
    handleRowClick('../listings/' + id, { replace: true })
  }

  const [cursor, setCursor] = React.useState('crosshair');

  const handleRowHover = () => {
    setCursor(() => {
      return 'pointer';
    })
  }

  return (
    <Paper sx={{ width: '100%', position: 'absolute', bottom: '0px', height: '80%' }}>
      <TableContainer sx={{ height: '90%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        column.id === 'content'
                          ? <TableCell sx={{ width: '90%' }} key={column.id} align={column.align} onClick={() => editRoute(row.code)} onMouseEnter={() => handleRowHover()} style={{ cursor: cursor }}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                            </TableCell>
                          : <TableCell sx={{ width: '10%' }} key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                            </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
