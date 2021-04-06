import {
  SITE_INFO_ERR,
  ADD_SITE_INFO,
  DELETE_SITE_INFO,
  EDIT_SITE_INFO,
  GET_SITE_INFO,
  GET_SITE_INFOS,
} from "../actionTypes";

const siteInfoReducer = (
  state = { msg: null, error: null, siteinfo: {}, siteinfos: [] },
  action
) => {
  switch (action.type) {
    case ADD_SITE_INFO:
      return { ...state, msg: action.payload };
    case GET_SITE_INFOS:
      return { ...state, siteinfos: action.payload };
    case GET_SITE_INFO:
      return { ...state, siteinfo: action.payload };
    case DELETE_SITE_INFO:
      return { ...state, siteinfos: action.payload };
    case EDIT_SITE_INFO:
      return { ...state, siteinfo: action.payload };
    case SITE_INFO_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default siteInfoReducer;
