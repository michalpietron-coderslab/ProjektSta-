import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table className="mainTable">
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>CITY</td>
              <td>TOTAL INCOME</td>
            </tr>
          </thead>
          <tbody>
            {this.props.temData.map((dates) => (
              <tr key={dates.id}>
                <th>{dates.id}</th>
                <th>{dates.name}</th>
                <th>{dates.city}</th>
                {/* <th>{dates.date}</th> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
