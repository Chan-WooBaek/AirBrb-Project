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
import UnlistHostedButton from './UnlistHostedButton';
import HostedListingDetails from './HostedListingDetail';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import ManageBookingsButton from '../components/ManageBookingsButton';

const columns = [
  { id: 'content', label: 'Content', minWidth: 500 },
  { id: 'Buttons', maxWidth: 5 },
];

export default function HostedListingsDisplay () {
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
                <img src={res.thumbnail} style={{ width: '50%', height: '30vh' }} />
                <HostedListingDetails title={res.title} property={res.metadata.propType} bedrooms={res.metadata.beds} bathrooms={res.metadata.bathrooms} reviews={res.reviews} price={res.price}/>
              </>,
              code: hostedIdList[idIndex],
              Buttons: <>
                <AvailabilityCalendar id={hostedIdList[idIndex]}></AvailabilityCalendar>
                <DeleteHostedButton id={hostedIdList[idIndex]}/>
                <UnlistHostedButton id={hostedIdList[idIndex]}></UnlistHostedButton>
                <ManageBookingsButton id={hostedIdList[idIndex]}></ManageBookingsButton>
              </>,
            })
            idIndex++;
          }
          setRows(newRow)
        })
      })
  }, [rows])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = useNavigate();

  const editRoute = (id) => {
    handleRowClick('../hostedListings/' + id, { replace: true })
  }

  const [cursor, setCursor] = React.useState('crosshair');

  const handleRowHover = () => {
    setCursor(() => {
      return 'pointer';
    })
  }

  return (
    <Paper sx={{ width: '100%', position: 'absolute', bottom: '0px', height: '85vh' }}>
      <TableContainer sx={{ height: '91%' }}>
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
                          ? <TableCell name="hostedListingCard" sx={{ width: '80vw' }} key={column.id} align={column.align} onClick={() => editRoute(row.code)} onMouseEnter={() => handleRowHover()} style={{ cursor: cursor }}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                            </TableCell>
                          : <TableCell sx={{ width: '20vw' }} key={column.id} align={column.align}>
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
