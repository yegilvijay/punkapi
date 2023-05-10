import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchApiData } from '../store/actions/beerActions';
import { Table, Spinner, Form } from 'react-bootstrap';
import { formatDate } from '../utils/dateUtils';
import MonthYearPicker from './MonthYearPicker';
import Pagination from 'react-bootstrap/Pagination';

const BeerTable = ({ beerData, isLoading, fetchApiData }) => {
  const [filterMonth, setFilterMonth] = useState('');

  useEffect(() => {
    fetchApiData(1); // Update the function name to fetchApiData
    console.log(beerData, isLoading, fetchApiData)
  }, [fetchApiData]);

  const handleFilterChange = (event) => {
    setFilterMonth(event.target.value);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    fetchApiData(1, filterMonth);
  };

  const handlePageChange = (page) => {
    fetchApiData(page, filterMonth);
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const renderTable = () => {
    if (beerData && beerData.length > 0) {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tagline</th>
              <th>First Brewed</th>
            </tr>
          </thead>
          <tbody>
            {beerData.map((beer) => (
              <tr key={beer.id}>
                <td>{beer.name}</td>
                <td>{beer.tagline}</td>
                <td>{formatDate(beer.first_brewed)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      return <div>No data available.</div>;
    }
  };

  const renderPagination = () => {

    if (beerData && beerData.length > 0) {

      const totalPages = beerData.totalPages;
      const currentPage = beerData.currentPage;

      
let active = 1;
let items = [];
for (let number = 1; number <= 8; number++) {
    items.push(
        <Pagination.Item onClick={() => handlePageChange(number)} key={number} active={number === active}>
            {number}
        </Pagination.Item>,
    );
}


      return (
        // <Pagination>
        //   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        //     <Pagination.Item
        //       key={page}
        //       active={page === currentPage}
        //       onClick={() => handlePageChange(page)}
        //     >
        //       {page}
        //     </Pagination.Item>
        //   ))}
    

        // </Pagination>
        <div className="page-wrapper ">
        <Pagination className="text-right">{items}</Pagination>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="beer-table-container">

      <MonthYearPicker />

      {/* <div>
      <label htmlFor="datePicker">Select Month and Year:</label>
      <input type="month" id="datePicker" onChange={(e) => handleDateChange(new Date(e.target.value))} />

      <label htmlFor="filterOptions">Filter Options:</label>
      <select id="filterOptions" onChange={(e) => handleFilterOptionChange(e.target.value)}>
        <option value="">No Filter</option>
        <option value="brewed_before">Brewed Before</option>
        <option value="brewed_after">Brewed After</option>
      </select>
    </div> */}




      {renderTable()}
      {renderPagination()}

    </div>
  );
};

const mapStateToProps = (state) => ({
  beerData: state.beer.data,
  currentPage: state.beer.currentPage,
  totalPages: state.beer.totalPages,
  isLoading: state.beer.isLoading,
});

export default connect(mapStateToProps, { fetchApiData })(BeerTable);
