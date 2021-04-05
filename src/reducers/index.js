import { combineReducers } from "redux";
import storeData from "./StoreData";
import auth from "./auth";

export default combineReducers({
  storeData,
  auth,
});
