import {
  PPM_ERR,
  ADD_PPM,
  DELETE_PPM,
  GET_PPM,
  GET_PPMS,
} from '../actionTypes';

const ppmReducer = (
  state = { msg: null, error: null, ppm: {}, ppms: [] },
  action,
) => {
  switch (action.type) {
    case ADD_PPM:
      return { ...state, msg: action.payload };
    case GET_PPMS:
      return { ...state, ppms: action.payload };
    case GET_PPM:
      return { ...state, ppm: action.payload };
    case DELETE_PPM:
      return { ...state, ppms: action.payload };
    case PPM_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default ppmReducer;
