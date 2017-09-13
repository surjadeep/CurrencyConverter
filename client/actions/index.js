import axios from "axios";
import { MAKE_CONVERSION_RATE_ARRAY, UPDATE_CURRENCY_CONVERTER } from "./types";
const ROOT_URL = `http://api.fixer.io/latest?symbols=USD,CAD`;

export const fetchLatestCurrencyRate = (total) => dispatch => {
	axios.get(`${ROOT_URL}`)
	  .then(response => {
			dispatch({
				type: MAKE_CONVERSION_RATE_ARRAY,
				payload: {
					rate: [ 1, response.data.rates.USD, response.data.rates.CAD ],
					total,
					data: []
				}
			});
	  })
	  .catch(e => {
			console.error('data api fetch failed, please try again later.');
	  });
}
export const updateCurrencyConverter = (id, data) => {
	return {
		type: UPDATE_CURRENCY_CONVERTER,
		payload: {id, data}
	};
}
