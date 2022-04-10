import React from "react";
import { Box } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PaginationRunCall from "../PaginationRunCall";

const RunCallLayout = ({
  handleChangeToPage,
  runCall,
  countPage,
  handleChange,
  pageSize,
  handleChangeSorts,
  sorts,
  handleChangeSearch,
  search,
  isInbound,
  handleChangeFilters,
}) => {
  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
        <InputLabel>Количество элементов на странице</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          value={pageSize}
          onChange={handleChange}
          label="pageSize"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
        <InputLabel>Сортировка</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          value={sorts}
          onChange={handleChangeSorts}
          label="Sorts"
        >
          <MenuItem value={"-comment"}>Комментарии по убванию</MenuItem>
          <MenuItem value={"comment"}>Комментарии по возрастанию</MenuItem>
          <MenuItem value={"-dateCreated"}>Дата создания по убыванию</MenuItem>
          <MenuItem value={"dateCreated"}>
            Дата создания по возрастанию
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="outlined-basic"
        label="Поиск"
        variant="outlined"
        onChange={handleChangeSearch}
        value={search}
      />
      <Box>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel>Фильтр по входящим вызовам</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isInbound}
                  onChange={handleChangeFilters}
                  name="isInbound"
                />
              }
              label="Входящий вызов"
            />
          </FormGroup>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table
          align="left"
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Названия компании</TableCell>
              <TableCell sx={{ minWidth: 200 }}>Телефон</TableCell>
              <TableCell sx={{ minWidth: 150 }}>Входящий вызов</TableCell>
              <TableCell sx={{ minWidth: 250 }}>
                Дата создания компании
              </TableCell>
              <TableCell>Комментарии</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {runCall.map(
              ({
                id,
                phone,
                isInbound,
                dateCreated,
                comment,
                callCampaign,
              }) => {
                const inbound = isInbound ? "ДА" : "НЕТ";
                return (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {callCampaign.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {phone}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {inbound}
                    </TableCell>
                    <TableCell>{dateCreated}</TableCell>
                    <TableCell>{comment}</TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <PaginationRunCall
          countPage={countPage}
          handleChangeToPage={(event) => handleChangeToPage(event)}
        />
      </Box>
    </>
  );
};

export default RunCallLayout;
