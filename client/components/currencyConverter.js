import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import axios from "axios";
import { convert, allowOnlyIntOrFloat } from "../helper";
import { Link } from "react-router-dom";

class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iv: "",
      ic: 0,
      ov: "0.00",
      oc: 1
    };
    this.onFieldsChange = this.onFieldsChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchLatestCurrencyRate();
  }
  onFieldsChange(event) {
    const iv = document.getElementById("inputValue").value;
    if (iv === " ") return;
    const ic = document.getElementById("inputCurrency").value;
    const oc = document.getElementById("outputCurrency").value;
    var ov = convert(ic, oc, allowOnlyIntOrFloat(iv), this.props.cc);
    this.setState({
      iv: allowOnlyIntOrFloat(iv),
      ic,
      ov,
      oc
    });
  }
  render() {
    if (!this.props.cc) {
      return (
        <div className="center-align">
          <div className="row">
            <div className="col s12 m6">
              <div className="progress">
                <div className="indeterminate" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="center-align">
        <div className="row">
          <div className="col s12 m6">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Currency converter</span>
                <p>Type in amount and select currency:</p>
                <div className="input-field">
                  <input
                    id="inputValue"
                    type="text"
                    value={this.state.iv}
                    onChange={this.onFieldsChange}
                    placeholder="Type in amount, eg. 0.00"
                  />
                </div>
                <div>
                  <select
                    className="browser-default"
                    id="inputCurrency"
                    value={this.state.ic}
                    onChange={this.onFieldsChange}
                  >
                    <option value="0">EUR</option>
                    <option value="1">USD</option>
                    <option value="2">CAD</option>
                  </select>
                </div>
                <div className="input-field">
                  <input
                    id="outputValue"
                    type="text"
                    value={this.state.ov}
                    readOnly
                    className="grey lighten-5"
                  />
                </div>
                <div>
                  <select
                    className="browser-default"
                    id="outputCurrency"
                    value={this.state.oc}
                    onChange={this.onFieldsChange}
                  >
                    <option value="0">EUR</option>
                    <option value="1">USD</option>
                    <option value="2">CAD</option>
                  </select>
                </div>
              </div>
              <div className="card-action">
                <Link to="/disclaimer">Disclaimer</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    cc: state.cc
  };
}
export default connect(mapStateToProps, actions)(CurrencyConverter);
