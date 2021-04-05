import React, { useState } from "react";
import "./Home.css";
import { Button, Grid } from "@material-ui/core";
import TextInput from "../../components/textInput/TextInput";
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signin, signup } from "../../actions/auth";
import { useToasts } from "react-toast-notifications";
import * as api from "../../api/index";
import { AUTH } from "../../constants/actionType";
import Loader from "react-loader-spinner";

const logo_image =
  "https://prod.wp.cdn.aws.wfu.edu/sites/41/2018/08/ResumeGraphic.png";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const initialSignInState = {
  email: "",
  password: "",
};

const initialSignUpState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialErrorFlag = {
  firstNameErr: false,
  firstNameErrMsg: "",
  lastNameErr: false,
  lastNameErrMsg: "",
  emailErr: false,
  emailErrMsg: "",
  passwordErr: false,
  passwordErrMsg: "",
  confirmPassErr: false,
  confirmPassErrMsg: "",
};

function Home() {
  const [isSignUp, setIsSignup] = useState(false);
  const [signInData, setSignInData] = useState(initialSignInState);
  const [signUpData, setSignUpData] = useState(initialSignUpState);
  const [error, setError] = useState(initialErrorFlag);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();

  const handleShowPassword = () => {
    setShowPassword((preShowPassword) => !preShowPassword);
  };
  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm((preShowPassword) => !preShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isSignUp) {
      if (name === "firstName") {
        setError({ ...error, firstNameErr: false, firstNameErrMsg: "" });
      }
      if (name === "lastName") {
        setError({ ...error, lastNameErr: false, lastNameErrMsg: "" });
      }

      if (name === "email") {
        setError({ ...error, emailErr: false, emailErrMsg: "" });
      }

      if (name === "password") {
        setError({ ...error, passwordErr: false, passwordErrMsg: "" });
      }

      if (name === "confirmPassword") {
        setError({ ...error, confirmPassErr: false, confirmPassErrMsg: "" });
      }
      setSignUpData({ ...signUpData, [name]: value });
    } else {
      if (name === "email") {
        setError({ ...error, emailErr: false, emailErrMsg: "" });
      }

      if (name === "password") {
        setError({ ...error, passwordErr: false, passwordErrMsg: "" });
      }

      setSignInData({ ...signInData, [name]: value });
    }
  };

  const toggleSignUp = () => {
    setIsSignup((prevState) => !prevState);
    // handleShowPassword(false);
  };

  const validate = () => {
    if (isSignUp) {
      if (
        signUpData.firstName === "" ||
        signUpData.lastName === "" ||
        signUpData.email === "" ||
        signUpData.password === "" ||
        signUpData.confirmPassword === ""
      ) {
        setError({
          ...error,
          firstNameErr: signUpData.firstName === "" ? true : false,
          firstNameErrMsg:
            signUpData.firstName === "" ? "Please enter first name" : "",
          lastNameErr: signUpData.lastName === "" ? true : false,
          lastNameErrMsg:
            signUpData.lastName === "" ? "Please enter last name" : "",
          emailErr: signUpData.email === "" ? true : false,
          emailErrMsg: signUpData.email === "" ? "Please enter email id" : "",
          passwordErr: signUpData.password === "" ? true : false,
          passwordErrMsg:
            signUpData.password === "" ? "Please enter password" : "",
          confirmPassErr: signUpData.confirmPassword === "" ? true : false,
          confirmPassErrMsg:
            signUpData.confirmPassword === "" ? "Please confirm password" : "",
        });
        return false;
      }

      if (signUpData.firstName === "") {
        setError({
          ...error,
          firstNameErr: true,
          firstNameErrMsg: "Please enter first name",
        });
        return false;
      }

      if (signUpData.lastName === "") {
        setError({
          ...error,
          lastNameErr: true,
          lastNameErrMsg: "Please enter last name",
        });
        return false;
      }

      if (signUpData.email === "") {
        setError({
          ...error,
          emailErr: true,
          emailErrMsg: "Please enter email id",
        });
        return false;
      } else if (!emailRegex.test(signUpData.email)) {
        setError({
          ...error,
          emailErr: true,
          emailErrMsg: "Please enter valid email id",
        });
        return false;
      }

      if (signUpData.password === "") {
        setError({
          ...error,
          passwordErr: true,
          passwordErrMsg: "Please enter password",
        });
        return false;
      }

      if (signUpData.confirmPassword === "") {
        setError({
          ...error,
          confirmPassErr: true,
          confirmPassErrMsg: "Please confirm password",
        });
        return false;
      }
    } else {
      if (signInData.email === "" && signInData.password === "") {
        setError({
          ...error,
          emailErr: true,
          emailErrMsg: "Please enter email id",
          passwordErr: true,
          passwordErrMsg: "Please enter password",
        });
        return false;
      }

      if (signInData.email === "") {
        setError({
          ...error,
          emailErr: true,
          emailErrMsg: "Please enter email id",
        });
        return false;
      } else if (!emailRegex.test(signInData.email)) {
        setError({
          ...error,
          emailErr: true,
          emailErrMsg: "Please enter valid email id",
        });
        return false;
      }

      if (signInData.password === "") {
        setError({
          ...error,
          passwordErr: true,
          passwordErrMsg: "Please enter password",
        });
        return false;
      }
    }

    return true;
  };

  const signinORsignup = async () => {
    const valid = validate();
    if (valid) {
      if (isSignUp) {
        let data = {};
        await api
          .signUp(signUpData)
          .then((res) => (data = res.data))
          .catch((err) => console.log(err));

        if (data.status === "success") {
          addToast("Successfully Registered", {
            appearance: `${data.status}`,
            autoDismiss: true,
          });
          dispatch({ type: AUTH, data });
          history.push("/personal");
        } else {
          addToast(data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      } else {
        let data = {};
        setLoader(true);
        await api
          .signIn(signInData)
          .then((res) => {
            data = res.data;
            setLoader(false);
          })
          .catch((err) => console.log(err));

        console.log("Data", data);
        if (data.status === "success") {
          addToast("Login Successful", {
            appearance: `${data.status}`,
            autoDismiss: true,
          });
          dispatch({ type: AUTH, data });
          history.push("/personal");
        } else {
          addToast(data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    }
  };

  return (
    <div className="home">
      <div className="home_main">
        <div className="home_left">
          <img className="home_image" src={logo_image} alt="logo" />
        </div>
        <div className="home_right">
          <div className="home_form">
            <div className="home_logo">
              <LockIcon />
            </div>

            <h3>{isSignUp ? "SIGN UP" : "SIGN IN"}</h3>

            <Grid container spacing={4}>
              {isSignUp && (
                <>
                  <TextInput
                    half
                    autoFocus
                    name="firstName"
                    label="First Name"
                    required={true}
                    handleChange={(e) => handleChange(e)}
                    value={signUpData.firstName}
                    error={error.firstNameErr}
                    errorMsg={error.firstNameErrMsg}
                  />
                  <TextInput
                    half
                    name="lastName"
                    label="Last Name"
                    required={true}
                    handleChange={(e) => handleChange(e)}
                    value={signUpData.lastName}
                    error={error.lastNameErr}
                    errorMsg={error.lastNameErrMsg}
                  />
                </>
              )}

              <TextInput
                autoFocus
                name="email"
                label="Email Id"
                required={true}
                handleChange={(e) => handleChange(e)}
                value={isSignUp ? signUpData.email : signInData.email}
                error={error.emailErr}
                errorMsg={error.emailErrMsg}
              />
              <TextInput
                name="password"
                label="Password"
                required={true}
                handleChange={(e) => handleChange(e)}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                value={isSignUp ? signUpData.password : signInData.password}
                error={error.passwordErr}
                errorMsg={error.passwordErrMsg}
              />
              {isSignUp && (
                <>
                  <TextInput
                    name="confirmPassword"
                    label="Confirm Password"
                    required={true}
                    handleChange={(e) => handleChange(e)}
                    type={showPasswordConfirm ? "text" : "password"}
                    handleShowPassword={handleShowPasswordConfirm}
                    value={signUpData.confirmPassword}
                    error={error.confirmPassErr}
                    errorMsg={error.confirmPassErrMsg}
                  />
                </>
              )}
            </Grid>

            <div className="home_signUpBtn">
              <button onClick={signinORsignup}>
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </div>

            <div className="home_loginORsignup">
              <button onClick={toggleSignUp}>
                {isSignUp
                  ? "Already registered? login"
                  : "Not registered ? sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {loader && (
        <div className="home_loader">
          <Loader
            type="ThreeDots"
            color="#6f7275"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      )}
    </div>
  );
}

export default Home;
