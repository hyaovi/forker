import React from 'react';
import { connect } from 'react-redux';
import { fecthResults, setCurrentPage } from '../actions/searchActions';
import { Pagination, PaginationItem, PaginationLink, Col } from 'reactstrap';
import PropTypes from 'prop-types';
function Paginate(props) {
  const {
    search: { searchedItem, perPage, totalPages, results, currentPage }
  } = props;

  const loadedPages = results.map(item => item.page);
  const previousPage = () => {
    const nextCurrentPage = currentPage - 1;
    if (currentPage <= 1) {
      return null;
    } else {
      if (nextCurrentPage in loadedPages) {
        props.setCurrentPage(nextCurrentPage);
      } else {
        props.fecthResults(searchedItem, perPage, totalPages, nextCurrentPage);
      }
    }
  };
  const nextPage = () => {
    const nextCurrentPage = currentPage + 1;
    if (currentPage === totalPages) {
      return null;
    }
    if (nextCurrentPage in loadedPages) {
      props.setCurrentPage(nextCurrentPage);
    } else {
      props.fecthResults(searchedItem, perPage, totalPages, nextCurrentPage);
    }
  };
  return (
    <div className="row  justify-content-center align-items-center mb-3">
      <Col md={2}>
        <p color="light">
          <strong>{currentPage}</strong> of {totalPages} pages
        </p>
      </Col>
      <Col>
        <Pagination aria-label="Page navigation example" className="m-auto">
          <PaginationItem onClick={previousPage} disabled={currentPage === 1}>
            <PaginationLink previous href="#" />
          </PaginationItem>
          <PaginationItem
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            <PaginationLink next href="#" />
          </PaginationItem>
        </Pagination>
      </Col>
    </div>
  );
}
Paginate.propTypes = {
  search: PropTypes.object.isRequired,
  fecthResults: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};
const mapStateToPtops = state => ({
  search: state.search
});

export default connect(
  mapStateToPtops,
  { fecthResults, setCurrentPage }
)(Paginate);
