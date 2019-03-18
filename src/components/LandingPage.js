import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import TableList from './TableList';
import { Container } from 'reactstrap';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

class LandingPage extends Component {
  render() {
    const { results, loading } = this.props.search;
    // console.log(this.props.match.params);

    return (
      <Container className="mt-3 text-center">
        <div>
          <SearchBar params={this.props.match.params} />
          {!loading && results[0] && !this.props.error.message && (
            <div>
              <TableList results={results} />

              <Pagination />
            </div>
          )}

          {loading && <Loading />}
        </div>
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
  null
)(LandingPage);
