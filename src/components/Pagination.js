import React from 'react';
import { connect } from 'react-redux';
import { fecthResults } from '../actions/searchActions';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function Paginate(props) {
  let indent = [];
  for (let i = 1; i <= props.search.totalPages; i++) {
    indent.push(i);
  }
  console.log(indent);
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink previous href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>
    </Pagination>
  );
}
const mapStateToPtops = state => ({
  search: state.search
});

export default connect(
  mapStateToPtops,
  { fecthResults }
)(Paginate);
