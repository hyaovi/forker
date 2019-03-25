import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Container } from 'reactstrap';
import SearchBar from './SearchBar';
import ResultsPage from './ResultsPage';

class LandingPage extends Component {
  render() {
    return (
      <Container className="text-center">
        <h1 className="my-3 text-center">
          <Link className=" text-info" to="/">
            Forkers
          </Link>{' '}
        </h1>
        <SearchBar />

        <Router>
          <Fragment>
            <Route path="/" exact component={ResultsPage} />
            <Route path="/search&page=1" component={ResultsPage} />
          </Fragment>
        </Router>
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
