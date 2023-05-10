import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchApiData } from '../store/actions/beerActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const MonthYearPicker = ({ fetchApiData }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  

  useEffect(() => {
    if(selectedMonth && filterOption){
      console.log("filetroption",filterOption)
      fetchApiData(1, selectedMonth, filterOption);
    }

  }, [selectedMonth,filterOption]);

  const handleDateChange = (date) => {
   
    const formattedDate = format(date, 'MM-yyyy');
    setSelectedMonth(formattedDate);
    setSelectedDate(date);

  };

  const handleFilterOptionChange = (option) => {
    console.log("options",option)
    setFilterOption(option);
    
  };


  return (
    <div>
         <label htmlFor="datePicker">Select Month and Year:</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      /> 
         
      <label htmlFor="filterOptions">Filter Options:</label>
      <select id="filterOptions" onChange={(e) => handleFilterOptionChange(e.target.value)}>
        <option value="">No Filter</option>
        <option value="brewed_before">Brewed Before</option>
        <option value="brewed_after">Brewed After</option>
      </select>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApiData: (page, selectedMonth, filterOption) =>
      dispatch(fetchApiData(page, selectedMonth, filterOption)),
  };
};

export default connect(null, mapDispatchToProps)(MonthYearPicker);
