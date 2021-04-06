import {
  EQUIPMENT_ERR,
  ADD_EQUIPMENT,
  DELETE_EQUIPMENT,
  EDIT_EQUIPMENT,
  GET_EQUIPMENT,
  GET_EQUIPMENTS,
} from '../actionTypes';

const equipmentReducer = (
  state = { msg: null, error: null, equipment: {}, equipments: [] },
  action,
) => {
  switch (action.type) {
    case ADD_EQUIPMENT:
      return { ...state, msg: action.payload };
    case GET_EQUIPMENTS:
      return { ...state, equipments: action.payload };
    case GET_EQUIPMENT:
      return { ...state, equipment: action.payload };
    case DELETE_EQUIPMENT:
      return { ...state, equipments: action.payload };
    case EDIT_EQUIPMENT:
      return { ...state, equipment: action.payload };
    case EQUIPMENT_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default equipmentReducer;
