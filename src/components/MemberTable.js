import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FaEdit, FaTrash, FaUpload } from 'react-icons/fa';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'firstN', label: 'First Name', minWidth: 100 },
  { id: 'lastN', label: 'Last Name', minWidth: 100 },
  { id: 'username', label: 'Username', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'phone', label: 'Phone', minWidth: 100 },
  { id: 'address', label: 'Address', minWidth: 200 },
  { id: 'dob', label: 'Date of Birth', minWidth: 120 },
  { id: 'age', label: 'Age', minWidth: 70 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'duration', label: 'Duration (months)', minWidth: 100 },
  { id: 'joinDate', label: 'Join Date', minWidth: 120 },
  { id: 'expirationDate', label: 'Expiration Date', minWidth: 120 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

function MemberTable({ members, openDialog, handleDeleteMember, openImageUploadDialog }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
      fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, members.length - page * rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {members.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((member) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={member.id}>
                {columns.map((column) => {
                  const value = member[column.id];
                  return (
                    <StyledTableCell key={column.id}>
                      {column.id === 'actions' ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                          <Tooltip title="Upload">
                            <IconButton color="success" onClick={() => openImageUploadDialog(member.id)}>
                              <FaUpload />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton color="warning" onClick={() => openDialog(member.id)}>
                              <FaEdit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton color="error" onClick={() => handleDeleteMember(member.id)}>
                              <FaTrash />
                            </IconButton>
                          </Tooltip>
                        </div>
                      ) : (
                        value
                      )}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={columns.length} />
            </StyledTableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default MemberTable;
