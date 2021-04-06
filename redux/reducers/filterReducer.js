import {
  FILTER_ERR,
  ADD_FILTER,
  DELETE_FILTER,
  EDIT_FILTER,
  GET_FILTER,
  GET_FILTERS,
} from "../actionTypes";

const authReducer = (
  state = { msg: null, error: null, filter: {}, filters: [] },
  action
) => {
  switch (action.type) {
    case ADD_FILTER:
      return { ...state, msg: action.payload };
    case GET_FILTERS:
      return { ...state, filters: action.payload };
    case GET_FILTER:
      return { ...state, filter: action.payload };
    case DELETE_FILTER:
      return { ...state, filters: action.payload };
    case EDIT_FILTER:
      return { ...state, filter: action.payload };
    case FILTER_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
