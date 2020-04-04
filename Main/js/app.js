import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  HashRouter,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';

import "../scss/style.scss";
import Table from "./Components/Table";
import CompanyDetails from "./Components/CompanyDetails";

const api = "https://recruitment.hal.skygate.io/companies";

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.abortController = new AbortController;
  }


  componentDidMount() {
    console.log("ComponentDidMount...");
    console.log(`ComponentDidMount > Zaczynam ładować api: ${api}`);

    fetch(api, { signal: this.abortController.signal })
      .then((response) => {
        if (response.ok) {
          console.log(`ComponentDidMount > Zakończyłem ładowanie bez błędu`);
          return response.json();
        } else {
          console.log(`ComponentDidMount > Ładowanie zakończone błędem`);
          throw Error("Błąd!");
        }
      })
      .then((dataItems) => {
        this.setState({
          data: dataItems
        })
      }
      )
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { data } = this.state;
    if (data.length == 0) {
      return <h1>Loading...</h1>
    } else {
      return (
        <>
          <h1>Companies:</h1>
          <Table data={this.state.data} />
        </>
      )
    }
  }
  componentWillUnmount() {
    this.abortController.abort();
  }
}





class App extends Component {
  render() {
    return <HashRouter>
      <>
        <Route exact path='/' component={Companies} />
        <Route path='/details/:id' component={CompanyDetails} />
      </>
    </HashRouter>;
  }
}


ReactDOM.render(<App />, document.getElementById("app"));
