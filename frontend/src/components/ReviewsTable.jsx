import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import ReviewsTableDetail from './ReviewsTableDetail';

const columns = [
  { id: 'content', label: 'Content', minWidth: 500 },
  { id: 'Buttons', maxWidth: 5 },
];

ReviewsTable.propTypes = {
  reviews: PropTypes.array,
}

export default function ReviewsTable (reviews) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const setReviews = () => {
    const newRow = [];
    let reviewId = 1000;
    const reviewList = reviews.reviews;
    for (const index in reviewList) {
      const review = reviewList[index];
      newRow.push({
        content: <>
        <ReviewsTableDetail review={review.text} rating ={review.rating}/>
        </>,
        code: reviewId,
      })
      reviewId += 1;
    }
    setRows(newRow);
  }

  React.useEffect(() => {
    setReviews();
  }, [reviews])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '50%', position: 'relative', bottom: '0px', height: '40%' }}>
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
  );
}
