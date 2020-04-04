import React, { Component } from "react";
import ReactDOM from "react-dom";

import CompanyItem from './CompanyItem';


export default class Table extends Component {
  constructor(props) {
    super(props);
    console.log("CompanyItem:", props);
  }


  render() {
    console.log('Render TableComponent');
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
            {this.props.data.map((item, index) => (
              <CompanyItem key={item.id} data={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}


