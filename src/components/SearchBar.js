import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import { fecthNewResults } from '../actions/searchActions';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import {
  Alert,
  Row,
  InputGroup,
  InputGroupAddon,
  Form,
  Label,
  Input,
  Col,
  Button
} from 'reactstrap';
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  onChangeHandler = event => {
    this.setState({ searchItem: event.target.value });
  };
  onSubmitHandler(event) {
    event.preventDefault();
    if (this.props.search.searchedItem !== this.state.searchItem) {
      this.props.fecthNewResults(
        this.state.searchItem,
        this.props.search.perPage
      );
    }
  }
  componentDidMount() {
    if (this.props.location.search) {
      const data = queryString.parse(this.props.location.search);

      this.setState({ searchItem: data.repository }, () =>
        this.props.fecthNewResults(
          this.state.searchItem,
          this.props.search.perPage
        )
      );
    }
  }
  render() {
    const { loading } = this.props.search;
    const { error } = this.props;
    const { searchItem } = this.state;
    return (
      <div className={this.props.className}>
        <Row>
          <Col md="6" className="mx-auto text-center">
            <Form onSubmit={this.onSubmitHandler}>
              <Label>
                Enter github username/repo eg: <code>facebook/react</code>
              </Label>
              <Row form>
                <Col md={10} className="mx-auto text-center">
                  <InputGroup className="mb-3 shadow-sm ">
                    <Input
                      type="text"
                      name="searchItem"
                      value={searchItem}
                      onChange={this.onChangeHandler}
                      placeholder="eg: facebook/react"
                    />
                    <InputGroupAddon addonType="append">
                      <Button block color="info">
                        Search
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
            </Form>
            {!!error.message && (
              <Alert className="mb-3" color="danger">
                {error.message}
              </Alert>
            )}
          </Col>
        </Row>
        {loading && <Loading />}
      </div>
    );
  }
}
SearchBar.propTypes = {
  error: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  fecthNewResults: PropTypes.func.isRequired
};
const mapStateToPtops = state => ({
  search: state.search,
  error: state.error
});

export default withRouter(
  connect(
    mapStateToPtops,
    { fecthNewResults }
  )(SearchBar)
);
