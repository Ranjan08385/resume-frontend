import React, { useState, useEffect } from "react";
import "./PersonalDetails.css";
import TextInput from "../../components/textInput/TextInput";
import {
  Avatar,
  Container,
  Button,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  storeDetails,
  storePersonalDetails,
} from "../../actions/StoreData";
import { useToasts } from "react-toast-notifications";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  website: "",
  github: "",
  objective: "",
  twitter: "",
};

const initialStateError = {
  firstNameError: false,
  firstNameErrorMsg: "",
  lastNameError: false,
  lastNameErrorMsg: "",
  emailError: false,
  emailErrorMsg: "",
  mobileNumberError: false,
  mobileNumberError: "",
};

let error = true;

function PersonalDetails() {
  const [perDetails, setPerDetails] = useState(initialState);
  const [error, setError] = useState(initialStateError);

  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  // const data = useSelector((data) => data);

  // console.log("Data from redux", data);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("PERSONAL_DETAILS"));
    // console.log("Personal Details", data);
    if (data) {
      setPerDetails(data);
    }
  }, []);

  const validate = () => {
    if (
      perDetails.firstName === "" ||
      perDetails.lastName === "" ||
      perDetails.email === "" ||
      perDetails.mobileNumber === ""
    ) {
      setError({
        ...error,
        firstNameError: perDetails.firstName === "" ? true : false,
        firstNameErrorMsg:
          perDetails.firstName === "" ? "Please enter first name" : "",
        lastNameError: perDetails.lastName === "" ? true : false,
        lastNameErrorMsg:
          perDetails.lastName === "" ? "Please enter last name" : "",
        emailError: perDetails.email === "" ? true : false,
        emailErrorMsg: perDetails.email === "" ? "Please enter email id" : "",
        mobileNumberError: perDetails.mobileNumber === "" ? true : false,
        mobileNumberErrorMsg:
          perDetails.mobileNumber === "" ? "Please enter mobile number" : "",
      });
      return false;
    }

    if (perDetails.firstName === "") {
      setError({
        ...error,
        firstNameError: true,
        firstNameErrorMsg: "Please enter first name",
      });
      return false;
    }
    if (perDetails.lastName === "") {
      setError({
        ...error,
        lastNameError: true,
        lastNameErrorMsg: "Please enter last name",
      });
      return false;
    }
    if (perDetails.email === "") {
      setError({
        ...error,
        emailError: true,
        emailErrorMsg: "Please enter email id",
      });
      return false;
    } else if (!emailRegex.test(perDetails.email)) {
      setError({
        ...error,
        emailError: true,
        emailErrorMsg: "Please enter valid email id",
      });
      return false;
    }

    if (perDetails.mobileNumber === "") {
      setError({
        ...error,
        mobileNumberError: true,
        mobileNumberErrorMsg: "Please enter mobile number",
      });
      return false;
    } else if (!mobileRegex.test(perDetails.mobileNumber)) {
      setError({
        ...error,
        mobileNumberError: true,
        mobileNumberErrorMsg: "Please enter valid mobile number",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validate();
    if (valid) {
      dispatch(storePersonalDetails(perDetails));
      addToast("Personal Details Saved", {
        appearance: `success`,
        autoDismiss: true,
      });
      history.push("/education");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "firstName") {
      setError({ ...error, firstNameError: false, firstNameErrorMsg: "" });
    } else if (e.target.name === "lastName") {
      setError({ ...error, lastNameError: false, lastNameErrorMsg: "" });
    } else if (e.target.name === "email") {
      setError({ ...error, emailError: false, emailErrorMsg: "" });
    } else if (e.target.name === "mobileNumber") {
      setError({
        ...error,
        mobileNumberError: false,
        mobileNumberErrorMsg: "",
      });
    }

    setPerDetails({ ...perDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="personalDetails">
      <div className="personalDetails_sec">
        <div className="personalDetails_title">
          <h3>Personal Details</h3>
        </div>
        <div className="personalDetails_form">
          <div className="personalDetails_textInput">
            <div className="personalDetails_row">
              <Grid container spacing={4}>
                <TextInput
                  name="firstName"
                  label="First Name"
                  required={true}
                  handleChange={handleChange}
                  autoFocus
                  half
                  error={error.firstNameError}
                  errorMsg={error.firstNameErrorMsg}
                  value={perDetails.firstName}
                />
                <TextInput
                  name="lastName"
                  label="Last Name"
                  required={true}
                  handleChange={handleChange}
                  half
                  error={error.lastNameError}
                  errorMsg={error.lastNameErrorMsg}
                  value={perDetails.lastName}
                />
                <TextInput
                  name="email"
                  label="Email ID"
                  required={true}
                  handleChange={handleChange}
                  half
                  error={error.emailError}
                  errorMsg={error.emailErrorMsg}
                  value={perDetails.email}
                />
                <TextInput
                  name="mobileNumber"
                  label="Mobile Number"
                  required={true}
                  handleChange={handleChange}
                  half
                  error={error.mobileNumberError}
                  errorMsg={error.mobileNumberErrorMsg}
                  value={perDetails.mobileNumber}
                />
                <TextInput
                  name="website"
                  label="Your Website"
                  required={false}
                  handleChange={handleChange}
                  half
                  value={perDetails.website}
                />
                <TextInput
                  name="github"
                  label="GitHub"
                  required={false}
                  handleChange={handleChange}
                  half
                  value={perDetails.github}
                />
                <TextInput
                  name="objective"
                  label="Objective"
                  required={false}
                  handleChange={handleChange}
                  value={perDetails.objective}
                />
              </Grid>
            </div>
            <div className="personalDetails_next">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
