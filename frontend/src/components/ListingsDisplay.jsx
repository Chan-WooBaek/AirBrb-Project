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
import ListingDetails from './ListingDetail';

const columns = [
  { id: 'content', label: 'Content', minWidth: 500 },
];

export default function ColumnGroupingTable () {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    myFetch('GET', 'listings', null)
      .then((data) => {
        const hostedIdList = [];
        for (const row of data.listings) hostedIdList.push(row.id)
        Promise.all(hostedIdList.map(id => myFetch('GET', 'listings/' + id, null))).then(responses =>
          Promise.all(responses.map(res => res.listing))
        ).then(data => {
          const newRow = [];
          let idIndex = 0;
          for (const res of data) {
            if (res.published) {
              newRow.push({
                content: <>
                  <img src={res.thumbnail} style={{ width: '50%', height: '50vh' }} />
                  <ListingDetails title={res.title} reviews={res.reviews} price={res.price} ></ListingDetails>
                </>,
                code: hostedIdList[idIndex],
                title: res.title,
              })
            }
            idIndex++;
          }
          const sortedRows = newRow;
          sortedRows.sort(function (a, b) {
            return a.title.localeCompare(b.title);
          })
          setRows(sortedRows)
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

  const [cursor, setCursor] = React.useState('crosshair');

  const handleRowHover = () => {
    setCursor(() => {
      return 'pointer';
    })
  }

  const editRoute = (id) => {
    handleRowClick('../listings/' + id, { replace: true })
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
                          ? <TableCell key={column.id} align={column.align} onClick={() => editRoute(row.code)}
                              onMouseEnter={() => handleRowHover()} style={{ cursor: cursor }}
                            >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                            </TableCell>
                          : <TableCell key={column.id} align={column.align}>
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
