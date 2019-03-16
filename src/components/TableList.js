import React from 'react';
import { Table, Container, Button } from 'reactstrap';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fecthResults } from '../actions/searchActions';
// import Loading from './Loading';

const TableList = props => {
  console.log(props.search.searchItem);
  return (
    <Container className="my-3">
      <div className=" mb-3">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>name</th>
              <th>owner</th>
              <th>stars</th>
              <th>forks</th>
              <th>clone</th>
            </tr>
          </thead>
          <tbody>
            {props.search.results.map(item => (
              <tr key={item.id}>
                <th scope="row">{item.name}</th>
                <td>{item.owner.login}</td>
                <td>{item.stargazers_count}</td>
                <td>{item.forks_count}</td>
                <td>
                  <a href={item.clone_url} blank>
                    clone
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div />
    </Container>
  );
};
const mapStateToProps = state => ({
  search: state.search
});
export default connect(
  mapStateToProps,
  { fecthResults }
)(TableList);
