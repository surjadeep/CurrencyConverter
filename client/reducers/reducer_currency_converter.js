import { MAKE_CONVERSION_RATE_ARRAY } from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case "MAKE_CONVERSION_RATE_ARRAY":
    for (var i = 0; i < action.payload.total; i++) {
        action.payload.data.push({
          iv: "",
          ic: 0,
          ov: "0.00",
          oc: 1
        });
    }
		return action.payload;
	case "UPDATE_CURRENCY_CONVERTER":
  return {
      ...state,
      data: [
      ...state.data.slice(0, action.payload.instance),
      Object.assign({}, state.data[action.payload.instance], action.payload.data),
      ...state.data.slice(action.payload.instance+1)
      ]
    };
  }
  return state;
}
