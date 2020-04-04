import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Table extends Component {
  constructor(props) {
    super(props);
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

class CompanyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: false,
    }
  }

  componentDidMount = () => {
    fetch(`https://recruitment.hal.skygate.io/incomes/${this.props.data.id}`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({
          incomes: data
        });
      }).catch((error) => {
        this.setState({ error })
      });
  }

  render() {
    let { data } = this.props;
    let { incomes } = this.state.incomes;
    return (
      <tr key={data.id}>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.city}</td>
        <td>{incomes ? incomes.reduce((acum, item) => acum + parseFloat(item.value), 0).toFixed(2) : 'wait...'}</td>
      </tr>
    );
  }
}
