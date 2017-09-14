import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { bindActionCreators } from "redux";
import { fetchLatestCurrencyRate, updateCurrencyConverter } from "../actions";
import { convert, allowOnlyIntOrFloat } from "../helper";

const CurrencyConverter = props => {
    if (!props.cc) {
		const { fetchLatestCurrencyRate, totalItems } = props;
		fetchLatestCurrencyRate(totalItems);
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
	
	const initConvertAndUpdateCurrencyConverter = (ic, oc, iv) => {
		const ov = convert(ic, oc, allowOnlyIntOrFloat(iv), props.cc.rate);
		const data = {
		  iv: allowOnlyIntOrFloat(iv),
		  ic,
		  ov,
		  oc
		};
		props.updateCurrencyConverter(props.instance, data);
	}
	const onInputValueChange = event => {
		const { ic, oc } = props.cc.data[props.instance];
		const iv = event.target.value;
		if (iv === " ") return;
		initConvertAndUpdateCurrencyConverter(ic, oc, iv);
	}
	const onInputCurrencyChange = event => {
		const { iv, oc } = props.cc.data[props.instance];
		const ic = event.target.value;
		initConvertAndUpdateCurrencyConverter(ic, oc, iv);
	}
	const onOutputCurrencyChange = event => {
		const { iv, ic } = props.cc.data[props.instance];
		const oc = event.target.value;
		initConvertAndUpdateCurrencyConverter(ic, oc, iv);
	}
    const { ic, iv, oc, ov } = props.cc.data[props.instance];
    return (
      <div className="center-align" style={{float:'left'}}>
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Currency converter - {props.instance+1}</span>
                <p>Type in amount and select currency:</p>
                <div className="input-field">
                  <input
                    type="text"
					value={iv}
                    onChange={onInputValueChange}
                    placeholder="Type in amount, eg. 0.00"
                  />
                </div>
                <div>
                  <select
                    className="browser-default"
                    value={ic}
                    onChange={onInputCurrencyChange}
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
                    onChange={onOutputCurrencyChange}
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
const mapStateToProps = state => ({cc: state.cc});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchLatestCurrencyRate, updateCurrencyConverter }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter);
