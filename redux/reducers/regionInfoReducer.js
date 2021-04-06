import {
  REGION_INFO_ERR,
  ADD_REGION_INFO,
  DELETE_REGION_INFO,
  EDIT_REGION_INFO,
  GET_REGION_INFO,
  GET_REGION_INFOS,
} from "../actionTypes";

const regionInfoReducer = (
  state = { msg: null, error: null, regioninfo: {}, regioninfos: [] },
  action
) => {
  switch (action.type) {
    case ADD_REGION_INFO:
      return { ...state, msg: action.payload };
    case GET_REGION_INFOS:
      return { ...state, regioninfos: action.payload };
    case GET_REGION_INFO:
      return { ...state, regioninfo: action.payload };
    case DELETE_REGION_INFO:
      return { ...state, regioninfos: action.payload };
    case EDIT_REGION_INFO:
      return { ...state, regioninfo: action.payload };
    case REGION_INFO_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default regionInfoReducer;
