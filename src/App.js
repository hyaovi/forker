import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandinPage from './components/LandingPage';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Route path="/" component={LandinPage} />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}
export default App;
