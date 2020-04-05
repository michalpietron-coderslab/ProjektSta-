import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


import CompanyItem from './CompanyItem';

var products = [{
  id: 1,
  name: "Product1",
  price: 120
}, {
  id: 2,
  name: "Product2",
  price: 80
}];


export default class Table extends Component {
  constructor(props) {
    super(props);
    console.log("CompanyItem:", props);
  }


  handleBtnClick = () => {
    if (order === 'desc') {
      this.refs.table.handleSort('asc', 'name');
      order = 'asc';
    } else {
      this.refs.table.handleSort('desc', 'name');
      order = 'desc';
    }
  }


  render() {
    console.log('Render TableComponent');
    return (

      <BootstrapTable ref='table' data={this.props.data}>
        <TableHeaderColumn dataField='id' isKey={true} dataSort={true}>Company ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataSort={true}>Company Name</TableHeaderColumn>
        <TableHeaderColumn dataField='city' dataSort={true}>Company City</TableHeaderColumn>
        <TableHeaderColumn dataField='income' dataSort={true}>Total Income</TableHeaderColumn>
      </BootstrapTable>

      // <div>
      //   <table className="mainTable">
      //     <thead>
      //       <tr>
      //         <td>ID</td>
      //         <td>NAME</td>
      //         <td>CITY</td>
      //         <td>TOTAL INCOME</td>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {this.props.data.map((item, index) => (
      //         <CompanyItem key={item.id} data={item} />
      //       ))}
      //     </tbody>
      //   </table>
      // </div>
    );
  }
}


