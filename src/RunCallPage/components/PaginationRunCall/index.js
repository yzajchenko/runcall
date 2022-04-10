import React from "react";
import Pagination from '@mui/material/Pagination';

const PaginationRunCall = ({ handleChangeToPage, countPage }) => {
  return (
    <div>
      <Pagination
        count={countPage}
        onChange={event => handleChangeToPage(event)}
        hidePrevButton
        hideNextButton
      />
    </div>
  );
};

export default PaginationRunCall;
