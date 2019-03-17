import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import TableList from "./TableList";
import { fecthResults } from "../actions/searchActions";
import { Container, Button } from "reactstrap";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

class LandingPage extends Component {
  render() {
    const { results, loading, searchedItem } = this.props.search;
    return (
      <Container className="mt-3 text-center">
        <div>
          <SearchBar />
          {!loading && results.length > 0 && (
            <div>
              <TableList results={results} />
              <Button
                onClick={() =>
                  this.props.fecthResults(
                    searchedItem,
                    this.props.search.perPage,
                    this.props.search.page
                  )
                }
                className="px-4"
              >
                More
              </Button>
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
  { fecthResults }
)(LandingPage);
