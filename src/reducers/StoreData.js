import {
  GET_ALL_DATA,
  STORE_EDUCATION_DETAILS,
  STORE_PERSONAL_DETAILS,
  STORE_PROJECT_DETAILS,
  STORE_EXPERIANCE_DETAILS,
  STORE_SKILLS_DETAILS,
} from "../constants/actionType";

export default (store = [], action) => {
  switch (action.type) {
    case STORE_PERSONAL_DETAILS:
      return action.payload;

    case STORE_EDUCATION_DETAILS:
      return action.payload;

    case STORE_PROJECT_DETAILS:
      return action.payload;

    case STORE_EXPERIANCE_DETAILS:
      return action.payload;

    case STORE_SKILLS_DETAILS:
      return action.payload;

    case GET_ALL_DATA:
      return action.payload;
    default:
      return store;
  }
};
