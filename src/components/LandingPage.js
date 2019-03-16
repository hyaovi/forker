import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import TableList from './TableList';
import { fecthResults, setPerPage } from '../actions/searchActions';
import {
  Alert,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button
} from 'reactstrap';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: 'netlify/cli'
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    window.localStorage.setItem('searchedItem', event.target.value);
  };
  onSubmitHandler(event) {
    event.preventDefault();
    this.props.fecthResults(
      this.state.searchItem,
      this.props.search.perPage,
      this.props.page
    );
  }

  render() {
    const { error, results, loading } = this.props.search;
    const { searchItem } = this.state;
    return (
      <Container className="mt-3 text-center">
        <div>
          <Row>
            <Col md="6" className="m-auto">
              <h1>Forkers</h1>
              <Form onSubmit={this.onSubmitHandler}>
                <FormGroup className="mb-3">
                  <Label>enter github username/repo</Label>
                  <Input
                    bsSize="lg"
                    type="text"
                    name="searchItem"
                    value={searchItem}
                    invalid={!!error}
                    onChange={this.onChangeHandler}
                  />
                  {error && (
                    <Alert className="mb-3" color="danger">
                      {error.message}
                    </Alert>
                  )}
                </FormGroup>
              </Form>
            </Col>
          </Row>
          {!loading && results.length > 0 && <TableList results={results} />}
          {!loading && results.length > 0 && (
            <Button
              onClick={() =>
                this.props.fecthResults(
                  this.state.searchItem,
                  this.props.search.perPage,
                  this.props.search.page
                )
              }
              className="px-4"
            >
              More
            </Button>
          )}
          {loading && <Loading />}
          <a href="api/" target="_blank" rel="noopener noreferrer">
            clickme
          </a>
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
  { fecthResults, setPerPage }
)(LandingPage);
