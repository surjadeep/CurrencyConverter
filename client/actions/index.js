import axios from "axios";
import { MAKE_CONVERSION_RATE_ARRAY, UPDATE_CURRENCY_CONVERTER } from "./types";
const ROOT_URL = `http://api.fixer.io/latest?symbols=USD,CAD`;

export const fetchLatestCurrencyRate = (no) => dispatch => {
	axios.get(`${ROOT_URL}`)
	  .then(response => {
			dispatch({
				type: MAKE_CONVERSION_RATE_ARRAY,
				payload: {
					rate: [ 1, response.data.rates.USD, response.data.rates.CAD ],
					no,
					data: []
				}
			});
	  })
	  .catch(e => {
			console.error('data api fetch failed, please try again to run the app');
	  });
}
export const updateCurrencyConverter = (id, data) => {
	// console.log(obj, id);
	return {
		type: UPDATE_CURRENCY_CONVERTER,
		// payload: {id, data: {iv: obj,ic: 0,ov: "0.00", oc: 1}}
		payload: {id, data}
	};
}
