import React, { Component } from "react";
import ReactDOM from "react-dom";

//import "style.scss";
const api = "https://recruitment.hal.skygate.io/companies";
console.log(api);
const api2 = "https://recruitment.hal.skygate.io/incomes/:id";
console.log(api2);

class Companies extends Component {
  constructor(props) {
    super(props);
  }
  state = { isLoading: false, error: null, data: [] };

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
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { error, isLoading, data } = this.state;

    if (error) {
      return <h1>{this.state.error.mesage}</h1>;
    }
    if (isLoading) return <h1>Ustalam adres IP...</h1>;
    return (
      <div>
        {data.map((dates) => (
          <div key={dates.id}>
            <>
              <tbody>
                {/* <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CIty</th>
                <th>Total Income</th>
              </tr> */}
                <tr>
                  <th>{dates.id}</th>
                  <th>{dates.name}</th>
                  <th>{dates.city}</th>
                  <th>{dates.id}</th>
                </tr>
              </tbody>
            </>
          </div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<Companies />, document.getElementById("app"));

// import React, { Component } from "react";
// import ReactDOM from "react-dom";

// //import "style.scss";
// const api = "https://recruitment.hal.skygate.io/companies";
// console.log(api);
// const api2 = "https://recruitment.hal.skygate.io/incomes/:id";
// console.log(api2);

// class Companies extends Component {
//   constructor(props) {
//     super(props);
//   }
//   state = { isLoading: false, error: null, data: [] };

//   componentDidMount() {
//     this.setState({ isLoading: true });

//     fetch(api)
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw Error("Błąd!");
//         }
//       })
//       .then((data) => this.setState({ data, isLoading: false }))
//       .catch((error) => this.setState({ error }));
//   }

//   render() {
//     const { error, isLoading, data } = this.state;

//     if (error) {
//       return <h1>{this.state.error.mesage}</h1>;
//     }
//     if (isLoading) return <h1>Ustalam adres IP...</h1>;
//     return (
//       <div>
//         {data.map((dates) => (
//           <p>dates.name</p>
//         ))}
//       </div>
//     );
//   }
// }

// ReactDOM.render(<Companies />, document.getElementById("app"));
