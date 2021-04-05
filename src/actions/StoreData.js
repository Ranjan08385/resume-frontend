// import * as api from "../api";
import {
  STORE_PERSONAL_DETAILS,
  GET_ALL_DATA,
  STORE_EDUCATION_DETAILS,
  STORE_PROJECT_DETAILS,
  STORE_EXPERIANCE_DETAILS,
  STORE_SKILLS_DETAILS,
} from "../constants/actionType";

export const storePersonalDetails = (payload, key) => async (dispatch) => {
  try {
    const data = JSON.stringify(payload);
    localStorage.setItem("PERSONAL_DETAILS", data);
    dispatch({ type: STORE_PERSONAL_DETAILS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const storeEducationDetails = (payload, key) => async (dispatch) => {
  try {
    const data = JSON.stringify(payload);
    localStorage.setItem("EDUCATION_DETAILS", JSON.stringify(payload));
    dispatch({ type: STORE_EDUCATION_DETAILS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const storeProjectDetails = (payload, key) => async (dispatch) => {
  try {
    const data = JSON.stringify(payload);
    localStorage.setItem("PROJECT_DETAILS", JSON.stringify(payload));
    dispatch({ type: STORE_PROJECT_DETAILS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const storeExperianceDetails = (payload, key) => async (dispatch) => {
  try {
    const data = JSON.stringify(payload);
    localStorage.setItem("EXPERIANCE_DETAILS", JSON.stringify(payload));
    dispatch({ type: STORE_EXPERIANCE_DETAILS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const storeSkillsDetails = (payload, key) => async (dispatch) => {
  try {
    const data = JSON.stringify(payload);
    localStorage.setItem("SKILLS_DETAILS", JSON.stringify(payload));
    dispatch({ type: STORE_SKILLS_DETAILS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
