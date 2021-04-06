import { CS_ERR, ADD_CS, DELETE_CS, GET_CS, GET_CSS } from '../actionTypes';

const csReducer = (
  state = { msg: null, error: null, cs: {}, css: [] },
  action,
) => {
  switch (action.type) {
    case ADD_CS:
      return { ...state, msg: action.payload };
    case GET_CSS:
      return { ...state, css: action.payload };
    case GET_CS:
      return { ...state, cs: action.payload };
    case DELETE_CS:
      return { ...state, css: action.payload };
    case CS_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default csReducer;
