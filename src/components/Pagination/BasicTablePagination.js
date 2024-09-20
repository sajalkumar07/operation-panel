import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowRight from "@material-ui/icons/ArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/ArrowLeft";
import PropTypes from "prop-types";

const PER_PAGE_DEFAULT_OPTION = [5, 10, 25, 50, { label: "All", value: -1 }],
  DEFAULT_COL_SPAN = 3,
  DEFAULT_COUNT = 0,
  ROWS_PER_PAGE = 5,
  DEFAULT_PAGE = 0;

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

const PaginationComponent = props => {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

PaginationComponent.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const BasicTablePagination = ({
  rowsPerPageOptions = PER_PAGE_DEFAULT_OPTION,
  colSpan = DEFAULT_COL_SPAN,
  count = DEFAULT_COUNT,
  rowsPerPage = ROWS_PER_PAGE,
  page = DEFAULT_PAGE,
  handleChangePage,
  handleChangeRowsPerPage
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      colSpan={colSpan}
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: { "aria-label": "rows per page" },
        native: true
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={PaginationComponent}
    />
  );
};

export default BasicTablePagination;
