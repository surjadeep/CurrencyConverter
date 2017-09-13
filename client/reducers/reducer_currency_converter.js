import { MAKE_CONVERSION_RATE_ARRAY } from "../actions/types";
export default function(state = null, action) {
	// console.log(state, action.payload);
  switch (action.type) {
    case "MAKE_CONVERSION_RATE_ARRAY":
		// action.payload.data[action.payload.no-1] = null;
		//console.log(action.payload);
    for (var i = 0; i < action.payload.no; i++) {
        action.payload.data.push({
          iv: "",
          ic: 0,
          ov: "0.00",
          oc: 1
        });
    }
    console.log(action.payload);
		return action.payload;
	case "UPDATE_CURRENCY_CONVERTER":
  return {
      ...state,
      data: [
      ...state.data.slice(0, action.payload.id),
      Object.assign({}, state.data[action.payload.id], action.payload.data),
      ...state.data.slice(action.payload.id+1)
      ]
    };
  }
  return state;
}
