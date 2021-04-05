import React, { useState, useEffect } from "react";
import "./Experiance.css";
import { Button, Grid } from "@material-ui/core";
import TextInput from "../../components/textInput/TextInput";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeExperianceDetails } from "../../actions/StoreData";
import { useToasts } from "react-toast-notifications";

const initialState = [
  {
    company: "",
    designation: "",
    duration: "",
    description: "",
  },
];

const initialErrState = [
  {
    companyErr: false,
    companyErrMsg: "",
    designationErr: false,
    designationErrMsg: "",
    durationErr: false,
    durationErrMsg: "",
  },
];

function Experiance() {
  const [experianceDetails, setExperianceDetails] = useState(initialState);
  const [error, setErrorFlag] = useState(initialErrState);

  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("EXPERIANCE_DETAILS"));
    if (data) {
      setExperianceDetails(data);

      if (data.length > 1) {
        for (let i = 1; i < data.length; i++) {
          onClickAddErr();
        }
      }
    }
  }, []);

  const onClickAddErr = () => {
    const errorState = {
      companyErr: false,
      companyErrMsg: "",
      designationErr: false,
      designationErrMsg: "",
      durationErr: false,
      durationErrMsg: "",
    };
    setErrorFlag([...error, errorState]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;

    if (name === "company") {
      const err = [...error];
      err[i].companyErr = false;
      setErrorFlag(err);
    }
    if (name === "designation") {
      const err = [...error];
      err[i].designationErr = false;
      setErrorFlag(err);
    }
    if (name === "duration") {
      const err = [...error];
      err[i].durationErr = false;
      setErrorFlag(err);
    }

    const list = [...experianceDetails];
    list[i][name] = value;
    setExperianceDetails(list);
  };

  const onClickAdd = () => {
    const newState = {
      company: "",
      designation: "",
      duration: "",
      description: "",
    };
    const errorState = {
      companyErr: false,
      companyErrMsg: "",
      designationErr: false,
      designationErrMsg: "",
      durationErr: false,
      durationErrMsg: "",
    };
    setExperianceDetails([...experianceDetails, newState]);
    setErrorFlag([...error, errorState]);
  };

  const onClickRemove = () => {
    const list = [...experianceDetails];
    list.splice(list.lastIndexOf(), 1);
    setExperianceDetails(list);
  };

  const validate = () => {
    const length = experianceDetails.length;
    for (let i = 0; i < length; i++) {
      if (
        experianceDetails[i].company === "" &&
        experianceDetails[i].designation === "" &&
        experianceDetails[i].duration === ""
      ) {
        let err = [...error];
        err[i].companyErr = true;
        err[i].companyErrMsg = "Please enter company";
        err[i].designationErr = true;
        err[i].designationErrMsg = "Please enter designation";
        err[i].durationErr = true;
        err[i].durationErrMsg = "Please enter duration";
        setErrorFlag(err);
        return false;
      }

      if (experianceDetails[i].company === "") {
        let err = [...error];
        err[i].companyErr = true;
        err[i].companyErrMsg = "Please enter company";
        setErrorFlag(err);
        return false;
      }

      if (experianceDetails[i].designation === "") {
        let err = [...error];
        err[i].designationErr = true;
        err[i].designationErrMsg = "Please enter designation";
        setErrorFlag(err);
        return false;
      }

      if (experianceDetails[i].duration === "") {
        let err = [...error];
        err[i].durationErr = true;
        err[i].durationErrMsg = "Please enter duration";
        setErrorFlag(err);
        return false;
      }
    }
    return true;
  };

  const onClickNext = () => {
    const valid = validate();
    // console.log("error scenario", valid, error);
    if (valid) {
      dispatch(storeExperianceDetails(experianceDetails));
      addToast("Experiance Details Saved", {
        appearance: `success`,
        autoDismiss: true,
      });
      history.push("/skills");
    }
  };

  const onClickBack = () => {
    history.push("/project");
  };

  return (
    <div className="experiance">
      <div className="experiance_main">
        <div className="experiance_title">
          <h3>Experiance</h3>
        </div>
        <div className="experiance_sec">
          {experianceDetails.map((data, i) => (
            <div key={i} className="experiance_container">
              <Grid container spacing={4}>
                <TextInput
                  half
                  name="company"
                  label="Company"
                  required={true}
                  handleChange={(e) => handleChange(e, i)}
                  autoFocus
                  error={error[i].companyErr}
                  errorMsg={error[i].companyErrMsg}
                  value={experianceDetails[i].company}
                />
                <TextInput
                  half
                  name="designation"
                  label="Designation"
                  required={true}
                  handleChange={(e) => handleChange(e, i)}
                  error={error[i].designationErr}
                  errorMsg={error[i].designationErrMsg}
                  value={experianceDetails[i].designation}
                />
                <TextInput
                  half
                  name="duration"
                  label="Duration"
                  required={true}
                  handleChange={(e) => handleChange(e, i)}
                  error={error[i].durationErr}
                  errorMsg={error[i].durationErrMsg}
                  value={experianceDetails[i].duration}
                />
                <TextInput
                  half
                  name="description"
                  label="Description"
                  required={false}
                  handleChange={(e) => handleChange(e, i)}
                  //   error={error[i].titleErr}
                  value={experianceDetails[i].description}
                />
              </Grid>
            </div>
          ))}
          <div className="experiance_add">
            {experianceDetails.length !== 1 && (
              <Button type="submit" color="primary" onClick={onClickRemove}>
                - remove
              </Button>
            )}

            <Button type="submit" color="primary" onClick={onClickAdd}>
              + add
            </Button>
          </div>
          <div className="experiance_backAndNext">
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              onClick={onClickBack}
            >
              back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={onClickNext}
            >
              next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experiance;
