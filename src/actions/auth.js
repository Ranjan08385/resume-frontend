import * as api from "../api/index";
import { AUTH } from "../constants/actionType";

export const signup = (formdata, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formdata);

    dispatch({ type: AUTH, data });
    history.push("/personal");
  } catch (err) {
    console.log(err);
  }
};

export const signin = (formdata, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formdata);
    if (data.status === "success") {
      dispatch({ type: AUTH, data });
      history.push("/personal");
    }
  } catch (err) {
    console.log(err.message);
  }
};
