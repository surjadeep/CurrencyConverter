import axios from "axios";
import { MAKE_CONVERSION_RATE_ARRAY } from "./types";
const ROOT_URL = `http://api.fixer.io/latest?symbols=USD,CAD`;

export const fetchLatestCurrencyRate = () => dispatch => {
	axios.get(`${ROOT_URL}`)
	  .then(response => {
		dispatch({
		  type: MAKE_CONVERSION_RATE_ARRAY,
		  payload: [ 1, response.data.rates.USD, response.data.rates.CAD ]
		});
	  })
	  .catch(e => {
		return;
	  });
}
