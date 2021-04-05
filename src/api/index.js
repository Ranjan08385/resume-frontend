import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: "https://backend-resume-builder.herokuapp.com/",
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);

export const saveDetails = (formData) =>
  API.post("/users/saveDetails", formData);
