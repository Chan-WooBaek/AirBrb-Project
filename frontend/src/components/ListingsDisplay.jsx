import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import myFetch from '../components/fetcher';

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
        const newRow = []
        for (const row of data.listings) {
          newRow.push({
            content: <>
              <div>{'Title: ' + row.title}</div>
              <div>{'Owner' + row.owner}</div>
              <div>
                <h2>
                  Address:
                </h2>
                <p>Street: {row.address.street}
                City: {row.address.city} <br />
                State: {row.address.state} <br />
                Postcode: {row.address.postcode}</p>
              </div>
              <div>{'Price: ' + row.price}</div>
              <div>{'Thumbnail: ' + row.thumbnail}</div>
              <div>{'Metadata: ' + row.metadata}</div>
              <div>{'Reviews: ' + row.reviews}</div>
              <div>{'Availability: ' + row.availability}</div>
              <div>{'Published: ' + row.published}</div>
              <div>{'PostedOn: ' + row.postedOn}</div>
            </>,
            code: row.title
          })
        }
        setRows(newRow)
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

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => handleRowClick('../listings', { replace: true })}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
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
