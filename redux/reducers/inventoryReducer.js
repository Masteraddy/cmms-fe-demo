import {
  INVENTORY_ERR,
  ADD_INVENTORY,
  DELETE_INVENTORY,
  EDIT_INVENTORY,
  GET_INVENTORY,
  GET_INVENTORYS,
} from '../actionTypes';

const inventoryReducer = (
  state = { msg: null, error: null, inventory: {}, inventorys: [] },
  action,
) => {
  switch (action.type) {
    case ADD_INVENTORY:
      return { ...state, msg: action.payload };
    case GET_INVENTORYS:
      return { ...state, inventorys: action.payload };
    case GET_INVENTORY:
      return { ...state, inventory: action.payload };
    case DELETE_INVENTORY:
      return { ...state, inventorys: action.payload };
    case EDIT_INVENTORY:
      return { ...state, inventory: action.payload };
    case INVENTORY_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default inventoryReducer;
