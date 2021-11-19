import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import myFetch from './fetcher';
import BookingRequestDetail from './BookingRequestDetail';
import BookingAccept from './BookingAccept';
import BookingDecline from './BookingDecline';
import { useParams } from 'react-router';

// import myFetch from './fetcher';
// import DeleteHostedButton from './DeleteHostedButton';
// import LiveHostedButton from './LiveHostedButton';
// import HostedListingDetails from './HostedListingDetail';
// import AvailabilityCalendar from '../components/AvailabilityCalendar';

const columns = [
  { id: 'content', label: 'Content', minWidth: 500 },
  { id: 'Buttons', maxWidth: 5 },
];

export default function BookingRequestScreenDisplay () {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const [page2, setPage2] = React.useState(0);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(10);
  const [rows2, setRows2] = React.useState([]);

  const [daysAgoPosted, setDaysAgoPosted] = React.useState(0);
  const [daysBooked, setDaysBooked] = React.useState(0);
  const [profit, setProfit] = React.useState(0);

  const params = useParams();
  const id = params.id;
  const token = localStorage.getItem('token');

  async function updateDatesAgoPost () {
    const response = await myFetch('GET', `listings/${id}`, token)
    const postedOn = new Date(response.listing.postedOn);
    const currentDate = new Date();
    console.log(currentDate);
    console.log(postedOn);
    setDaysAgoPosted(Math.floor((Math.abs(currentDate - postedOn)) / (1000 * 60 * 60 * 24)));
  }

  const getBookingDays = (inValue, outValue) => {
    const isoOut = new Date(outValue);
    const isoIn = new Date(inValue);
    return Math.floor((Math.abs(isoOut - isoIn)) / (1000 * 60 * 60 * 24));
  }

  async function setAllPreviousBookingRows () {
    const newRow = [];
    const response = await myFetch('GET', 'bookings', token);
    const dict = response.bookings;
    let totalProfit = 0;
    let totalBookedDays = 0;
    for (const booking in dict) {
      if (id === dict[booking].listingId && dict[booking].status !== 'pending') {
        totalProfit += dict[booking].totalPrice;
        totalBookedDays += getBookingDays(dict[booking].dateRange.start, dict[booking].dateRange.end)
        newRow.push({
          content: <>
          <BookingRequestDetail owner={dict[booking].owner} dateRange={dict[booking].dateRange} status={dict[booking].status}/>
          </>,
          code: dict[booking].id + 5,
        })
      }
    }
    setRows2(newRow);
    setProfit(totalProfit);
    setDaysBooked(totalBookedDays);
  }

  async function setAllCurrentBookingRows () {
    const newRow = [];
    const response = await myFetch('GET', 'bookings', token);
    const dict = response.bookings;
    for (const booking in dict) {
      if (id === dict[booking].listingId && dict[booking].status === 'pending') {
        newRow.push({
          content: <>
          <BookingRequestDetail owner={dict[booking].owner} dateRange={dict[booking].dateRange} status={dict[booking].status}/>
          </>,
          code: dict[booking].id,
          Buttons: <>
          <BookingAccept bookingId={dict[booking].id}></BookingAccept>
          <br></br>
          <BookingDecline bookingId={dict[booking].id}></BookingDecline>
          </>
        })
      }
    }
    setRows(newRow);
  }

  React.useEffect(() => {
    setAllCurrentBookingRows();
    setAllPreviousBookingRows();
    updateDatesAgoPost();
  }, [profit, daysBooked])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage2 = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(+event.target.value);
    setPage2(0);
  };

  return (
    <div>
      <p>{'Total profit: $' + profit + ', Days booked: ' + daysBooked + ', Posted: ' + daysAgoPosted + ' days ago'}</p>
      <Paper sx={{ width: '50%', position: 'absolute', bottom: '0px', height: '75%' }}>
      <div>Current bookings</div>
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
                          ? <TableCell sx={{ width: '80vw' }} key={column.id} align={column.align}>
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
    <Paper sx={{ width: '50%', position: 'absolute', right: '0px', bottom: '0px', height: '75%' }}>
      <div>Previous Bookings</div>
      <TableContainer sx={{ height: '90%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {rows2
              .slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        column.id === 'content'
                          ? <TableCell sx={{ width: '80vw' }} key={column.id} align={column.align}>
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
        count={rows2.length}
        rowsPerPage={rowsPerPage2}
        page={page2}
        onPageChange={handleChangePage2}
        onRowsPerPageChange={handleChangeRowsPerPage2}
      />
    </Paper>
    </div>
  );
}
