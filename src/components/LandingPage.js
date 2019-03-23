import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';

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
        <Switch>
          <Route path="/" component={ResultsPage} />
          <Route path="/search&page=1" component={ResultsPage} />
        </Switch>
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
