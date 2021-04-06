import {
  ASSET_ERR,
  ADD_ASSET,
  DELETE_ASSET,
  EDIT_ASSET,
  GET_ASSET,
  GET_ASSETS,
} from '../actionTypes';

const assetReducer = (
  state = { msg: null, error: null, asset: {}, assets: [] },
  action,
) => {
  switch (action.type) {
    case ADD_ASSET:
      return { ...state, msg: action.payload };
    case GET_ASSETS:
      return { ...state, assets: action.payload };
    case GET_ASSET:
      return { ...state, asset: action.payload };
    case DELETE_ASSET:
      return { ...state, assets: action.payload };
    case EDIT_ASSET:
      return { ...state, asset: action.payload };
    case ASSET_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default assetReducer;
