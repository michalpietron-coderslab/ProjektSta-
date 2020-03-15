import React, { Component } from "react";
import ReactDOM from "react-dom";

//import "style.scss";
const api = "https://recruitment.hal.skygate.io/companies";
console.log(api);

class Companies extends Component {
  state = {
    data: false,
    id: false
  };

  componentDidMount() {
    const zzz = fetch(api)
      .then((r) => r.text())
      .then((ip) => {
        this.setState({
          data: ip,
          id: ip
        });
        method: "GET";
      })
      .catch((err) => {
        console.log("Błąd!", err);
      });
    console.log(zzz);
  }

  render() {
    if (!this.state.data) return <h1>Ustalam adres IP...</h1>;
    return (
      <>
        <h1>Twoje IP: {this.state.data}</h1>
        <ul>
          {
            <li>
              hggjfggj
              {this.state.id}
            </li>
          }
        </ul>
      </>
    );
  }
}

ReactDOM.render(<Companies />, document.getElementById("app"));
