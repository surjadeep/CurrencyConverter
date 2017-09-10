import { combineReducers } from "redux";
import CurrencyConverterReducer from "./reducer_currency_converter";

const rootReducer = combineReducers({
  cc: CurrencyConverterReducer
});

export default rootReducer;
