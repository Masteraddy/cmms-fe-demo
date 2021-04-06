import {
  INSPECTION_ERR,
  ADD_INSPECTION,
  DELETE_INSPECTION,
  GET_INSPECTION,
  GET_INSPECTIONS,
  CHANGE_INSPECTION_STATUS,
} from '../actionTypes';

const inspectionReducer = (
  state = { msg: null, error: null, inspection: {}, inspections: [] },
  action,
) => {
  switch (action.type) {
    case ADD_INSPECTION:
      return { ...state, msg: action.payload };
    case GET_INSPECTIONS:
      return { ...state, inspections: action.payload };
    case GET_INSPECTION:
      return { ...state, inspection: action.payload };
    case CHANGE_INSPECTION_STATUS:
      return { ...state, inspection: action.payload };
    case DELETE_INSPECTION:
      return { ...state, inspections: action.payload };
    case INSPECTION_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default inspectionReducer;
