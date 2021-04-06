import {
  IHS_DATA_ERR,
  ADD_IHS_DATA,
  DELETE_IHS_DATA,
  EDIT_IHS_DATA,
  GET_IHS_DATA,
  GET_IHS_DATAS,
} from "../actionTypes";

const ihsDataReducer = (
  state = { msg: null, error: null, ihsdata: {}, ihsdatas: [] },
  action
) => {
  switch (action.type) {
    case ADD_IHS_DATA:
      return { ...state, msg: action.payload };
    case GET_IHS_DATAS:
      return { ...state, ihsdatas: action.payload };
    case GET_IHS_DATA:
      return { ...state, ihsdata: action.payload };
    case DELETE_IHS_DATA:
      return { ...state, ihsdatas: action.payload };
    case EDIT_IHS_DATA:
      return { ...state, ihsdata: action.payload };
    case IHS_DATA_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default ihsDataReducer;
