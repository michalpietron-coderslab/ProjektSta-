import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../scss/style.scss";
import Table from "../js/table";

const api = "https://recruitment.hal.skygate.io/companies";
const api2 = (id) => `https://recruitment.hal.skygate.io/incomes/${id}`;

class Companies extends Component {
  constructor(props) {
    super(props);
  }
  state = { isLoading: false, error: null, data: [], incomes: [], temData: [] };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(api)
      .then((response) => {
        if (response.ok) {
          return response.json();
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
    if (isLoading) {
      return <h1>Ustalam adres IP...</h1>;
    } else {
      return (
        <>
          <Table temData={data} />
        </>
      );
    }
  }
}

ReactDOM.render(<Companies />, document.getElementById("app"));
