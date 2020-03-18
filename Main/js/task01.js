import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../style.scss";

const api = "https://recruitment.hal.skygate.io/companies";
// console.log(api);
const api2 = (id) => `https://recruitment.hal.skygate.io/incomes/${id}`;
// console.log(api2);

class Companies extends Component {
  constructor(props) {
    super(props);
  }
  state = { isLoading: false, error: null, data: [], incomes: [] };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(api)
      .then((response) => {
        if (response.ok) {
          return response.json();
          console.log(response.json());
        } else {
          throw Error("Błąd!");
        }
      })
      .then((data) =>
        this.setState({ data, isLoading: false }, () => {
          const urls = this.state.data.map((item) => api2(item.id));
          this.getAllUrls(urls);
        })
      )
      .catch((error) => this.setState({ error }));
  }

  getAllUrls = (urls) => {
    Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    ).then((incomes) => this.setState({ incomes }));
  };

  render() {
    const { error, isLoading, data, incomes } = this.state;

    const temData = [];
    for (let i = 0; i < data.length; i++) {
      temData.push({
        ...data[i],
        ...incomes[i]
      });
    }
    console.log(temData);

    if (error) {
      return <h1>{this.state.error.mesage}</h1>;
    }
    if (isLoading) return <h1>Ustalam adres IP...</h1>;
    return (
      <table className="mainTable">
        <tr>
          <td>ID</td>
          <td>NAME</td>
          <td>CITY</td>
          <td>TOTAL INCOME</td>
        </tr>
        {temData.map((dates) => (
          <tr key={dates.id}>
            <th>{dates.id}</th>
            <th>{dates.name}</th>
            <th>{dates.city}</th>
            <th></th>
          </tr>
        ))}
      </table>
    );
  }
}

ReactDOM.render(<Companies />, document.getElementById("app"));
