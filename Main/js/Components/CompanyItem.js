import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
    Link
} from 'react-router-dom';

let mounted = false;

export default class CompanyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incomes: false,
        }
        this.abortController = new AbortController;
    }

    componentDidMount() {
        mounted = true;
        fetch(`https://recruitment.hal.skygate.io/incomes/${this.props.data.id}`, { signal: this.abortController.signal })
            .then((response) => {
                return response.json();
            }).then((data) => {
                this.setState({
                    incomes: data
                });
            }).catch((error) => {
                if (mounted) {
                    this.setState({ error })
                }
            });

    }

    componentWillUnmount() {
        mounted = false;
        this.abortController.abort();
    }


    render() {
        let { data } = this.props;
        let { incomes } = this.state.incomes;
        return (
            <tr key={data.id}>
                <td>{data.id}</td>
                <td><Link to={"/details/" + data.id}> {data.name}</Link></td>
                <td>{data.city}</td>
                <td>{incomes ? incomes.reduce((acum, item) => acum + parseFloat(item.value), 0).toFixed(2) : 'wait...'}</td>
            </tr>
        );
    }
}