import React from 'react';
import { connect } from 'react-redux';
import { fecthResults, setCurrentPage } from '../actions/searchActions';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function Paginate(props) {
  // let indent = [];
  // for (let i = 1; i <= props.search.totalPages; i++) {
  //   indent.push(i);
  // }
  const loadedPages = props.search.results.map(item => item.page);
  // console.log(loadedPages);
  // console.log(indent);
  const previousPage = () => {
    if (props.search.currentPage - 1 in loadedPages) {
      props.setCurrentPage(props.search.currentPage - 1);
    } else {
      props.fecthResults(
        props.search.searchedItem,
        props.search.perPage,
        props.search.totalPages,
        props.search.currentPage - 1
      );
    }
  };
  const nextPage = () => {
    if (props.search.currentPage + 1 in loadedPages) {
      props.setCurrentPage(props.search.currentPage + 1);
    } else {
      props.fecthResults(
        props.search.searchedItem,
        props.search.perPage,
        props.search.totalPages,
        props.search.currentPage + 1
      );
    }
  };
  return (
    <Pagination aria-label="Page navigation example" className="m-auto">
      <PaginationItem
        onClick={previousPage}
        disabled={props.search.currentPage === 1}
      >
        <PaginationLink previous href="#" />
      </PaginationItem>
      <PaginationItem
        disabled={props.search.currentPage === props.search.totalPages}
      >
        <PaginationLink next onClick={nextPage} href="#" />
      </PaginationItem>
    </Pagination>
  );
}
const mapStateToPtops = state => ({
  search: state.search
});

export default connect(
  mapStateToPtops,
  { fecthResults, setCurrentPage }
)(Paginate);
