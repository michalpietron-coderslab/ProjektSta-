import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../scss/style.scss";
import Table from "../js/table";

const api = "https://recruitment.hal.skygate.io/companies";
const api2 = (id) => `https://recruitment.hal.skygate.io/incomes/${id}`;

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state =
      { isLoading: false, error: null, data: [], incomes: [] };

  }

  componentDidMount() {
    console.log("ComponentDidMount...");
    console.log(`ComponentDidMount > Zaczynam ładować api: ${api}`);
    this.setState({ isLoading: true });
    fetch(api)
      .then((response) => {
        if (response.ok) {
          console.log(`ComponentDidMount > Zakończyłem ładowanie bez błędu`);
          return response.json();
        } else {
          console.log(`ComponentDidMount > Ładowanie zakończone błędem`);
          throw Error("Błąd!");
        }
      })
      .then((data) => {
        console.log(`ComponentDidMount > Uzupełniam state`);
        this.setState({ data, isLoading: false }, () => {
          console.log(`ComponentDidMount > Rozpoczynam wczytywanie url'i...`);
          const urls = this.state.data.map((item) => api2(item.id));
          this.getAllUrls(urls);
        })
      }
      )
      .catch((error) => this.setState({ error }));
  }

  getAllUrls = (urls) => {
    console.log(`getAllUrls > Zaczynam wczytywanie ${urls.length} url'i`);
    Promise.all(
      urls.map((url) => fetch(url).then((response) => {
        console.log(`getAllUrls > Wczytywanie ${url}`);
        return response.json()
      }))
    ).then((incomes) => {
      console.log(`getAllUrls > Ustawiam state...`);
      this.setState({ incomes })
      console.log(`getAllUrls > Aktualny stan:`, this.state);
    });
  };

  render() {
    const { error, isLoading, data, incomes } = this.state;

    //    const temData = [];
    // for (let i = 0; i < data.length; i++) {
    //   temData.push({
    //     ...data[i],
    //     ...incomes[i]
    //   });
    // }

    if (error) {
      return <h1>{this.state.error.mesage}</h1>;
    }
    if (isLoading) {
      return <h1>ładowanie danych...</h1>;
    } else {
      return (
        <>
          <Table tableData={{ data, incomes }} />
        </>
      );
    }
  }
}

ReactDOM.render(<Companies />, document.getElementById("app"));
