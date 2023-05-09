import React from "react";
import MonthPicker from "simple-react-month-picker";
import moment from "moment";
import { useState } from "react";

export default function MonthYear() {
  const [selected, setSelected] = useState(null);

  const presets = [
   
    // {
    //   start: moment().subtract(5, "month").startOf("month").toDate(),
    // //   end: moment().endOf("month").toDate()
    // },
    // {
    //   start: moment().startOf("year").toDate(),
    // //   end: moment().endOf("year").toDate()
    // }
  ];

  return (
    <div className="App">
      <MonthPicker
        // presets={presets}
        highlightCol="#24b364"
        closeDelay={500}
        onChange={(d) => setSelected(d)}
      />
      {selected !== null ? (
        <p>
          {moment(selected[0]).format("MMM YYYY")} <br />
          {/* {moment(selected[1]).format("MMM YYYY")} */}
        </p>
      ) : null}
    </div>
  );
}