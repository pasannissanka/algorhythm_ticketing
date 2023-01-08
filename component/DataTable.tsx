import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import SearchBar from "material-ui-search-bar";
import styled from "styled-components";

interface Details {
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  status: string;
}

function createData(
  name: string,
  email: string,
  phone: string,
  ticketType: string,
  status: string
) {
  return { name, email, phone, ticketType, status };
}

const data = [
  createData(
    "user 1",
    "abc@gmail.com",
    "01123233434",
    "undergraduate",
    "full-paid"
  ),
  createData("user 2", "abd@gmail.com", "01123233434", "alumni", "full-paid"),
  createData(
    "user 3",
    "absc@gmail.com",
    "01123233434",
    "undergraduate",
    "full-paid"
  ),
  createData("user 4", "abasc@gmail.com", "01123233434", "alumni", "full-paid"),
  createData(
    "user 5",
    "absadc@gmail.com",
    "01123233434",
    "alumni",
    "Half-paid"
  ),
  createData(
    "user 6",
    "absdc@gmail.com",
    "01123233434",
    "undergraduate",
    "full-paid"
  ),
];

const SearchBarWrapper = styled.div`
  width: 50%;
  margin: 20px 10px;
`;

const TableWrapper = styled.div`
  margin: 10px;
`;

export default function BasicTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<Details[]>(data);
  const [searched, setSearched] = useState<string>("");

  const requestSearch = (searchedVal: string) => {
    const text = searchedVal.toLowerCase();
    if (text) {
      // eslint-disable-next-line
      const filteredRows = data.filter((item) => {
        const str = JSON.stringify(item).toLowerCase();

        if (str.search(text) >= 0) return item;
      });
      setPage(0);
      setRows(filteredRows);
    } else {
      setRows(data);
    }
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <SearchBarWrapper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
      </SearchBarWrapper>
      <TableWrapper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Ticket Type</TableCell>
                <TableCell align="right">Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.ticketType}</TableCell>

                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableWrapper>
    </>
  );
}
