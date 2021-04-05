import React, { useState, useEffect } from "react";
import "./Skills.css";
import { Button, Grid } from "@material-ui/core";
import TextInput from "../../components/textInput/TextInput";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  storeExperianceDetails,
  storeSkillsDetails,
} from "../../actions/StoreData";
import { useToasts } from "react-toast-notifications";

const initialState = [
  {
    skills: "",
    proficiency: "",
  },
];

const initialErrState = [
  {
    skillsErr: false,
    skillsErrMsg: "",
    proficiencyErr: false,
    proficiencyErrMsg: "",
  },
];

function Experiance() {
  const [skillsDetails, setSkillsDetails] = useState(initialState);
  const [error, setErrorFlag] = useState(initialErrState);

  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("SKILLS_DETAILS"));
    if (data) {
      setSkillsDetails(data);
      if (data.length > 1) {
        for (let i = 1; i < data.length; i++) {
          onClickAddErr();
          console.log("check", i);
        }
      }
    }
  }, []);

  const onClickAddErr = () => {
    const errorState = {
      skillsErr: false,
      skillsErrMsg: "",
      proficiencyErr: false,
      proficiencyErrMsg: "",
    };
    setErrorFlag([...error, errorState]);
    console.log("Skills data", error, skillsDetails.length);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;

    if (name === "skills") {
      const err = [...error];
      err[i].skillsErr = false;
      err[i].skillsErrMsg = "Please enter skill";
      setErrorFlag(err);
    }
    if (name === "proficiency") {
      const err = [...error];
      err[i].proficiencyErr = false;
      err[i].proficiencyErrMsg = "Please enter proficiency";
      setErrorFlag(err);
    }

    const list = [...skillsDetails];
    list[i][name] = value;
    setSkillsDetails(list);
  };

  const onClickAdd = () => {
    const newState = {
      skills: "",
      proficiency: "",
    };
    const errorState = {
      skillsErr: false,
      proficiencyErr: false,
    };
    setSkillsDetails([...skillsDetails, newState]);
    setErrorFlag([...error, errorState]);
  };

  const onClickRemove = () => {
    const list = [...skillsDetails];
    list.splice(list.lastIndexOf(), 1);
    setSkillsDetails(list);
  };

  const validate = () => {
    const length = skillsDetails.length;
    for (let i = 0; i < length; i++) {
      if (
        skillsDetails[i].skills === "" &&
        skillsDetails[i].proficiency === ""
      ) {
        let err = [...error];
        err[i].skillsErr = true;
        err[i].proficiencyErr = true;
        setErrorFlag(err);
        return false;
      }

      if (skillsDetails[i].skills === "") {
        let err = [...error];
        err[i].skillsErr = true;
        setErrorFlag(err);
        return false;
      }

      if (skillsDetails[i].proficiency === "") {
        let err = [...error];
        err[i].proficiencyErr = true;
        setErrorFlag(err);
        return false;
      }
    }
    return true;
  };

  const onClickNext = () => {
    const valid = validate();
    if (valid) {
      dispatch(storeSkillsDetails(skillsDetails));
      addToast("Skills Details Saved", {
        appearance: `success`,
        autoDismiss: true,
      });
      history.push("/resume");
    }
  };

  const onClickBack = () => {
    history.push("/experiance");
  };

  return (
    <div className="skills">
      <div className="skills_main">
        <div className="skills_title">
          <h3>Skills / Languages</h3>
        </div>
        <div className="skills_sec">
          {skillsDetails.map((data, i) => (
            <div key={i} className="skills_container">
              <Grid container spacing={4}>
                <TextInput
                  half
                  name="skills"
                  label="Skills"
                  required={true}
                  handleChange={(e) => handleChange(e, i)}
                  autoFocus
                  error={error[i].skillsErr}
                  errorMsg={error[i].skillsErrMsg}
                  value={skillsDetails[i].skills}
                />
                <TextInput
                  half
                  name="proficiency"
                  label="Proficiency (0% - 100%)"
                  required={true}
                  handleChange={(e) => handleChange(e, i)}
                  error={error[i].proficiencyErr}
                  errorMsg={error[i].proficiencyErrMsg}
                  value={skillsDetails[i].proficiency}
                />
              </Grid>
            </div>
          ))}
          <div className="skills_add">
            {skillsDetails.length !== 1 && (
              <Button type="submit" color="primary" onClick={onClickRemove}>
                - remove
              </Button>
            )}

            <Button type="submit" color="primary" onClick={onClickAdd}>
              + add
            </Button>
          </div>
          <div className="skills_backAndNext">
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
