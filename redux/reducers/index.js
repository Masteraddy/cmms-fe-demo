import { combineReducers } from "redux";
import authReducer from "./authReducer";
import requests from "./requestReducer";
import services from "./serviceReducer";
import locations from "./locationReducer";
import properties from "./propertyReducer";
import foruser from "./userReducer";
import ux from "./uxReducer";
import inventory from "./inventoryReducer";
import equipment from "./equipmentReducer";
import inspection from "./inspectionReducer";
import cs from "./csReducer";
import asset from "./assetReducer";
import ppm from "./ppmReducer";
import filters from "./filterReducer";
import regioninfos from "./regionInfoReducer";
import siteinfos from "./siteInfoReducer";
import ihsdatas from "./ihsDataReducer";

// import { brandFilterReducer } from './brand.filter.reducer';
// import { orderByPriceReducer } from './orderByPrice.filter.reducer';
// import { paginationReducer } from './pagination.reducer';

const rootReducer = combineReducers({
  authentication: authReducer,
  requests,
  services,
  locations,
  properties,
  foruser,
  ux,
  inventory,
  equipment,
  inspection,
  asset,
  cs,
  ppm,
  //////
  filters,
  regioninfos,
  siteinfos,
  ihsdatas,
});

export default rootReducer;
