import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
const TableList = props => {
  let currentResults;
  currentResults = props.search.results.filter(
    result => result.page === props.search.currentPage
  )[0].results;
  console.log(currentResults);
  return (
    <div className=" mb-3">
      <Table striped bordered hover responsive className="shadow-sm">
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
          {currentResults.map(item => (
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
  );
};
SearchBar.propTypes = {
  search: PropTypes.object
};
const mapStateToProps = state => ({
  search: state.search
});
export default connect(
  mapStateToProps,
  null
)(TableList);
