import React from 'react'
import Aux from "../../hoc/auxiliary";

import DatePicker from "react-datepicker";
import { pl } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";

const Picker = (props) => {

  const setMaxDate =()=>{
   return new Date(new Date().getFullYear(), new Date().getMonth()+1);
  }

  return (
    <Aux>
      <h3>od dnia:</h3>
      <DatePicker
        className="text-x-large-input"
        dateFormat="MM.yyyy"
        selected={props.startDate}
        onChange={date => props.setStartDate(date)}
        selectsStart
        startDate={props.startDate}
        endDate={props.endDate}
        closeOnScroll={true}
        showMonthYearPicker
        maxDate={props.endDate}
        locale={pl}
      />
      <h3>do dnia:</h3>
      <DatePicker
        className="text-x-large-input"
        selected={props.endDate}
        dateFormat="MM.yyyy"
        onChange={date => props.setEndDate(date)}
        selectsEnd
        startDate={props.startDate}
        endDate={props.endDate}
        minDate={props.startDate}
        maxDate={setMaxDate()}
        closeOnScroll={true}
        showMonthYearPicker
        locale={pl}
      />
    </Aux>
  )
}

export default Picker;