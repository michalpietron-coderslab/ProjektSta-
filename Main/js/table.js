import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Table > ', this.props.tableData);

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
            {this.props.tableData.data.map((item, index) => (
              <Row key={item.id} data={item} incomesItems={this.props.tableData.incomes[index]} />
            ))}

          </tbody>
        </table>
      </div>
    );
  }
}

class Row extends Component {
  constructor(props) {
    super(props);
    console.log(props);

  }
  render() {
    let { data, incomesItems } = this.props;
    let incomesSum = 0;
    if (incomesItems != undefined) {
      incomesItems.incomes.map(element => {
        incomesSum += parseFloat(element.value);
      })
    }


    return (
      <tr key={data.id}>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.city}</td>
        <td>{incomesSum.toFixed(2)}</td>
      </tr>
    );
  }
}
