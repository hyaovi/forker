import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableList from './TableList';
import { Container } from 'reactstrap';
import Pagination from './Pagination';
import { fecthNewResults, setSearchedItem } from '../actions/searchActions';
class ResultsPage extends Component {
  render() {
    const { results, loading } = this.props.search;

    return (
      <Container className=" text-center">
        {!loading && results[0] && !this.props.error.message && (
          <div>
            <TableList results={results} />

            <Pagination />
          </div>
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  search: state.search,
  error: state.error
});
export default connect(
  mapStateToProps,
  { setSearchedItem, fecthNewResults }
)(ResultsPage);
