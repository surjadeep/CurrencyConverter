import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import axios from "axios";
import { convert, allowOnlyIntOrFloat } from "../helper";

class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iv: "",
      ic: 0,
      ov: "0.00",
      oc: 1
    };
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.onInputCurrencyChange = this.onInputCurrencyChange.bind(this);
    this.onOutputCurrencyChange = this.onOutputCurrencyChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchLatestCurrencyRate(this.props.totalItems);
  }
  onInputValueChange(event) {
    let iv, ic, oc, ov;
    iv = event.target.value;
    if (iv === " ") return;
    ic = this.props.cc.data[this.props.instance].ic;
    oc = this.props.cc.data[this.props.instance].oc;
    ov = convert(ic, oc, allowOnlyIntOrFloat(iv), this.props.cc.rate);
    const data = {
      iv: allowOnlyIntOrFloat(iv),
      ic,
      ov,
      oc
    };
	   this.props.updateCurrencyConverter(this.props.instance, data);
  }
  onInputCurrencyChange(event) {
    let iv, ic, oc, ov;
    iv = this.props.cc.data[this.props.instance].iv;
    ic = event.target.value;
    oc = this.props.cc.data[this.props.instance].oc;
    ov = convert(ic, oc, allowOnlyIntOrFloat(iv), this.props.cc.rate);
    const data = {
      iv: allowOnlyIntOrFloat(iv),
      ic,
      ov,
      oc
    };
	   this.props.updateCurrencyConverter(this.props.instance, data);
  }
  onOutputCurrencyChange(event) {
    let iv, ic, oc, ov;
    iv = this.props.cc.data[this.props.instance].iv;
    ic = this.props.cc.data[this.props.instance].ic;
    oc = event.target.value;
    ov = convert(ic, oc, allowOnlyIntOrFloat(iv), this.props.cc.rate);
    const data = {
      iv: allowOnlyIntOrFloat(iv),
      ic,
      ov,
      oc
    };
	   this.props.updateCurrencyConverter(this.props.instance, data);
  }
  render() {

    if (!this.props.cc) {
      return (
        <div className="center-align" style={{float:'left'}}>
          <div className="row">
            <div className="col s12">
              <div className="progress">
                <div className="indeterminate" />
              </div>
            </div>
          </div>
        </div>
      );
    }
	console.log(this.props.instance)
    return (
      <div className="center-align" style={{float:'left'}}>
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Currency converter</span>
                <p>Type in amount and select currency:</p>
                <div className="input-field">
                  <input
                    id="inputValue"
                    type="text"
					          value={this.props.cc.data[this.props.instance].iv}
                    onChange={this.onInputValueChange}
                    placeholder="Type in amount, eg. 0.00"
                  />
                </div>
                <div>
                  <select
                    className="browser-default"
                    id="inputCurrency"
                    value={this.props.cc.data[this.props.instance].ic}
                    onChange={this.onInputCurrencyChange}
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
                    value={this.props.cc.data[this.props.instance].ov}
                    readOnly
                    className="grey lighten-5"
                  />
                </div>
                <div>
                  <select
                    className="browser-default"
                    id="outputCurrency"
                    value={this.props.cc.data[this.props.instance].oc}
                    onChange={this.onOutputCurrencyChange}
                  >
                    <option value="0">EUR</option>
                    <option value="1">USD</option>
                    <option value="2">CAD</option>
                  </select>
                </div>
              </div>
              <div className="card-action">
                <a href="#">Disclaimer</a>
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
