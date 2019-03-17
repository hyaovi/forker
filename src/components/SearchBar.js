import React, { Component } from "react";
import {
  fecthResults,
  setSearchedItem,
  resetResults
} from "../actions/searchActions";

import { connect } from "react-redux";
import {
  Alert,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button
} from "reactstrap";
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: ""
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
      this.props.resetResults();
    }
    this.props.fecthResults(
      this.state.searchItem,
      this.props.search.perPage,
      this.props.page
    );
  }
  render() {
    const { error } = this.props;
    const { searchItem } = this.state;
    return (
      <div>
        <Row>
          <Col md="6" className="m-auto">
            <h1>Forkers </h1>
            <Form onSubmit={this.onSubmitHandler}>
              <Label>enter github username/repo eg: netlify/cli</Label>

              <Row form>
                <Col md={8}>
                  <FormGroup className="mb-3">
                    <Input
                      bsSize="lg"
                      type="text"
                      name="searchItem"
                      value={searchItem}
                      onChange={this.onChangeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <Button block size="lg">
                    Submit
                  </Button>
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
      </div>
    );
  }
}
const mapStateToPtops = state => ({
  search: state.search,
  error: state.error
});

export default connect(
  mapStateToPtops,
  { fecthResults, setSearchedItem, resetResults }
)(SearchBar);
