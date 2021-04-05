import React, { useState, useEffect } from "react";
import "./Education.css";
import { Button, Grid } from "@material-ui/core";
import TextInput from "../../components/textInput/TextInput";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  storeDetails,
  storeEducationDetails,
} from "../../actions/StoreData";
import { useToasts } from "react-toast-notifications";

const initialState = [
  {
    college: "",
    qualification: "",
    from: "",
    to: "",
    description: "",
  },
];

const initialErrMsg = [
  {
    collegeErrFlag: false,
    collegeErrFlagMsg: "",
    qualificationErrFlag: false,
    qualificationErrFlagMsg: "",
  },
];

function Education() {
  const [eduData, setEduData] = useState(initialState);
  const [errMsg, setErrMsg] = useState(initialErrMsg);

  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("EDUCATION_DETAILS"));
    if (data) {
      setEduData(data);
      if (data.length > 1) {
        const newErrSec = {
          collegeErrFlag: false,
          qualificationErrFlag: false,
        };
        for (let i = 1; i < data.length; i++) {
          onClickAddErr();
        }
      }
    }
  }, []);

  const onClickAddErr = () => {
    const newErrSec = {
      collegeErrFlag: false,
      qualificationErrFlag: false,
    };
    setErrMsg([...errMsg, newErrSec]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    if (name === "college") {
      const err = [...errMsg];
      err[i].collegeErrFlag = false;
      setErrMsg(err);
    }
    if (name === "qualification") {
      const err = [...errMsg];
      err[i].qualificationErrFlag = false;
      setErrMsg(err);
    }

    const list = [...eduData];
    list[i][name] = value;
    setEduData(list);
  };

  const onClickRemove = () => {
    const list = [...eduData];
    list.splice(list.lastIndexOf(), 1);
    setEduData(list);
  };

  const addAnotherSection = (e) => {
    const newData = {
      college: "",
      qualification: "",
      from: "",
      to: "",
      description: "",
    };

    const newErrSec = {
      collegeErrFlag: false,
      collegeErrFlagMsg: "",
      qualificationErrFlag: false,
      qualificationErrFlagMsg: "",
    };
    setEduData([...eduData, newData]);
    setErrMsg([...errMsg, newErrSec]);
  };

  const onClickBack = (e) => {
    history.push("/personal");
  };

  const validate = () => {
    const length = eduData.length;
    for (let i = 0; i < length; i++) {
      if (eduData[i].college === "" && eduData[i].qualification === "") {
        let err = [...errMsg];
        err[i].collegeErrFlag = true;
        err[i].collegeErrFlagMsg = "Please enter college name";
        err[i].qualificationErrFlag = true;
        err[i].qualificationErrFlagMsg = "Please enter qualification";
        setErrMsg(err);
        return false;
      }

      if (eduData[i].college === "") {
        let err = [...errMsg];
        err[i].collegeErrFlag = true;
        err[i].collegeErrFlagMsg = "Please enter college name";
        setErrMsg(err);
        return false;
      }

      if (eduData[i].qualification === "") {
        let err = [...errMsg];
        err[i].qualificationErrFlag = true;
        err[i].qualificationErrFlagMsg = "Please enter qualification";
        setErrMsg(err);
        return false;
      }
    }
    return true;
  };

  const onClickNext = () => {
    const valid = validate();

    if (valid) {
      dispatch(storeEducationDetails(eduData));
      addToast("Education Details Saved", {
        appearance: `success`,
        autoDismiss: true,
      });
      history.push("/project");
    }
  };

  return (
    <div className="education">
      <div className="education_title">
        <h3>Education Details</h3>
      </div>
      <div className="education_sec">
        {eduData?.map((data, index) => (
          <div key={index} className="education_render">
            <Grid container spacing={4}>
              <TextInput
                name="college"
                label="College/University"
                required={true}
                handleChange={(e) => handleChange(e, index)}
                autoFocus
                half
                error={errMsg[index].collegeErrFlag}
                errorMsg={errMsg[index].collegeErrFlagMsg}
                value={eduData[index].college}
              />
              <TextInput
                name="qualification"
                label="Qualification"
                required={true}
                handleChange={(e) => handleChange(e, index)}
                half
                error={errMsg[index].qualificationErrFlag}
                errorMsg={errMsg[index].qualificationErrFlagMsg}
                value={eduData[index].qualification}
              />
              <TextInput
                half
                id="date"
                label="From"
                type="date"
                name="from"
                handleChange={(e) => handleChange(e, index)}
                value={eduData[index].from}
                //   defaultValue="2017-05-24"
                //   className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextInput
                half
                id="date"
                label="To"
                type="date"
                name="to"
                handleChange={(e) => handleChange(e, index)}
                value={eduData[index].to}
                //   defaultValue="2017-05-24"
                //   className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextInput
                name="description"
                label="Description"
                required={false}
                handleChange={(e) => handleChange(e, index)}
                value={eduData[index].description}
              />
            </Grid>
          </div>
        ))}
        <div className="education_add">
          {eduData?.length !== 1 && (
            <Button type="submit" color="primary" onClick={onClickRemove}>
              - remove
            </Button>
          )}
          <Button type="submit" color="primary" onClick={addAnotherSection}>
            + add
          </Button>
        </div>
        <div className="education_next">
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
  );
}

export default Education;
