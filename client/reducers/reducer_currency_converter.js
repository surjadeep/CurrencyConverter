import { MAKE_CONVERSION_RATE_ARRAY } from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case "MAKE_CONVERSION_RATE_ARRAY":
      return action.payload;
  }
  return state;
}
