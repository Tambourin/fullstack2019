import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value);
  }

  return (
    <>
      <label htmlFor="filter">Filter: </label>
      <input 
        type="text"
        name="filter" 
        onChange={handleChange} />
        
    </>
  )
}

export default connect(null, { setFilter })(Filter);