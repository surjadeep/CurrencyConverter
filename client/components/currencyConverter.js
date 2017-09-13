import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";
import { convert, allowOnlyIntOrFloat } from "../helper";

class CurrencyConverter extends Component {
  componentDidMount() {
    const { fetchLatestCurrencyRate, totalItems } = this.props;
    fetchLatestCurrencyRate(totalItems);
  }
  onInputValueChange = event => {
    const { ic, oc } = this.props.cc.data[this.props.instance];
    const iv = event.target.value;
    if (iv === " ") return;
    this.initConvertAndUpdateCurrencyConverter(ic, oc, iv);
  }
  onInputCurrencyChange = event => {
    const { iv, oc } = this.props.cc.data[this.props.instance];
    const ic = event.target.value;
    this.initConvertAndUpdateCurrencyConverter(ic, oc, iv);
  }
  onOutputCurrencyChange = event => {
    const { iv, ic } = this.props.cc.data[this.props.instance];
    const oc = event.target.value;
    this.initConvertAndUpdateCurrencyConverter(ic, oc, iv);
  }
  initConvertAndUpdateCurrencyConverter(ic, oc, iv) {
    const ov = convert(ic, oc, allowOnlyIntOrFloat(iv), this.props.cc.rate);
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
    const { ic, iv, oc, ov } = this.props.cc.data[this.props.instance];
    return (
      <div className="center-align" style={{float:'left'}}>
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Currency converter - {this.props.instance+1}</span>
                <p>Type in amount and select currency:</p>
                <div className="input-field">
                  <input
                    type="text"
					          value={iv}
                    onChange={this.onInputValueChange}
                    placeholder="Type in amount, eg. 0.00"
                  />
                </div>
                <div>
                  <select
                    className="browser-default"
                    value={ic}
                    onChange={this.onInputCurrencyChange}
                  >
                    <option value="0">EUR</option>
                    <option value="1">USD</option>
                    <option value="2">CAD</option>
                  </select>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    value={ov}
                    readOnly
                    className="grey lighten-5"
                  />
                </div>
                <div>
                  <select
                    className="browser-default"
                    value={oc}
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
const mapStateToProps = state => ({cc: state.cc})

export default connect(mapStateToProps, actions)(CurrencyConverter);
