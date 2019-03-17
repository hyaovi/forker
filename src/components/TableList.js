import React from 'react';
import { Table, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { fecthResults } from '../actions/searchActions';

const TableList = props => {
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
                  <a
                    href={item.clone_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
