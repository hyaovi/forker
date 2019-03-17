import { GET_ERROR, RESET_ERROR } from "../actions/types";
const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ERROR:
      return {};
    case GET_ERROR:
      return action.payload;

    default:
      return state;
  }
}
