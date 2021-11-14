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
                <div>{'Title: ' + res.title}</div>
                <div>{'Owner: ' + res.owner}</div>
                <div>
                  <h2>
                    Address:
                  </h2>
                  <p>
                    Street: {res.address.street} <br />
                    City: {res.address.city} <br />
                    State: {res.address.state} <br />
                    Postcode: {res.address.postcode}
                  </p>
                </div>
                <div>{'Price: ' + res.price}</div>
                <div>{'Thumbnail: ' + res.thumbnail}</div>
                <div>
                  <h2>
                    Metadata:
                  </h2>
                  <p>
                    Bathrooms: {res.metadata.bathrooms}
                    Proptypes: {res.metadata.propTypes}
                    Amenities: {res.metadata.amenities}
                  </p>
                </div>
                <div>{'Reviews: ' + res.reviews}</div>
                <div>{'Availability: ' + res.availability}</div>
                <div>{'Published: ' + res.published}</div>
                <div>{'PostedOn: ' + res.postedOn}</div>
                <button>Delete</button>
              </>,
              code: hostedIdList[idIndex],
            })
            idIndex++;
          }
          setRows(newRow)
        })
        for (const id of hostedIdList) {
          myFetch('GET', 'listings/' + id, null)
            .then(data => {
            })
        }
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
