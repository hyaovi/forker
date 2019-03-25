import React from 'react';
import { connect } from 'react-redux';
import { fecthResults, setCurrentPage } from '../actions/searchActions';
import { Pagination, PaginationItem, PaginationLink, Col } from 'reactstrap';

function Paginate(props) {
  const {
    search: { searchedItem, perPage, totalPages, results, currentPage }
  } = props;

  const loadedPages = results.map(item => item.page);

  const previousPage = () => {
    if (currentPage <= 1) {
      return null;
    } else {
      if (currentPage - 1 in loadedPages) {
        props.setCurrentPage(currentPage - 1);
      } else {
        props.fecthResults(searchedItem, perPage, totalPages, currentPage - 1);
      }
    }
  };
  const nextPage = () => {
    if (currentPage === totalPages) {
      return null;
    }
    if (currentPage + 1 in loadedPages) {
      props.setCurrentPage(currentPage + 1);
    } else {
      props.fecthResults(searchedItem, perPage, totalPages, currentPage + 1);
    }
  };
  return (
    <div className="row  justify-content-center align-items-center mb-3">
      <Col md={2}>
        <p color="light">
          {currentPage} of {totalPages} pages
        </p>
      </Col>
      <Col>
        <Pagination aria-label="Page navigation example" className="m-auto">
          <PaginationItem onClick={previousPage} disabled={currentPage === 1}>
            <PaginationLink previous href="." />
          </PaginationItem>
          <PaginationItem
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            <PaginationLink next href="." />
          </PaginationItem>
        </Pagination>
      </Col>
    </div>
  );
}
const mapStateToPtops = state => ({
  search: state.search
});

export default connect(
  mapStateToPtops,
  { fecthResults, setCurrentPage }
)(Paginate);
