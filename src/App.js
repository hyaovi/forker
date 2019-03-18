import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandinPage from './components/LandingPage';
// import TableList from './components/TableList';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" exact component={LandinPage} />
            {/* <Route path="/:user" exact component={LandinPage} /> */}
            <Route path="/:user/:rep" exact component={LandinPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
