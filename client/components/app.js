import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CurrencyConverter from "./currencyConverter";
import Disclaimer from "./disclaimer";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={CurrencyConverter} />
          <Route path="/disclaimer" exact component={Disclaimer} />
        </div>
      </BrowserRouter>
    );
  }
}
