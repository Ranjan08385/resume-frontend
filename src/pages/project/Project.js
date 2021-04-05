import React, { useState, useEffect } from "react";
import TextInput from "../../components/textInput/TextInput";
import "./Project.css";
import { Button, Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  storeDetails,
  storeProjectDetails,
} from "../../actions/StoreData";
import { useToasts } from "react-toast-notifications";

const initialState = [
  {
    title: "",
    link: "",
    description: "",
  },
];

const initialErrState = [
  {
    titleErr: false,
    titleErrMsg: "",
    linkErr: false,
    linkErrMsg: "",
    descriptionErr: false,
    descriptionErrMsg: "",
  },
];
function Project() {
  const [projectDetails, setProjectDetails] = useState(initialState);
  const [error, setErrorFlag] = useState(initialErrState);

  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("PROJECT_DETAILS"));

    if (data) {
      setProjectDetails(data);

      if (data.length > 1) {
        const newErrSec = {
          titleErr: false,
          linkErr: false,
          descriptionErr: false,
        };
        for (let i = 1; i < data.length; i++) {
          onClickAddErr();
        }
      }
    }
  }, []);

  const onClickAddErr = () => {
    const errorState = {
      titleErr: false,
      titleErrMsg: "",
      linkErr: false,
      linkErrMsg: "",
      descriptionErr: false,
      descriptionErrMsg: "",
    };
    setErrorFlag([...error, errorState]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    if (name === "title") {
      const err = [...error];
      err[i].titleErr = false;
      setErrorFlag(err);
    }
    if (name === "link") {
      const err = [...error];
      err[i].linkErr = false;
      setErrorFlag(err);
    }
    if (name === "description") {
      const err = [...error];
      err[i].descriptionErr = false;
      setErrorFlag(err);
    }
    const list = [...projectDetails];
    list[i][name] = value;
    setProjectDetails(list);
  };

  const onClickAdd = () => {
    const newState = {
      title: "",
      link: "",
      description: "",
    };
    const errorState = {
      titleErr: false,
      titleErrMsg: "",
      linkErr: false,
      linkErrMsg: "",
      descriptionErr: false,
      descriptionErrMsg: "",
    };
    setProjectDetails([...projectDetails, newState]);
    setErrorFlag([...error, errorState]);
  };

  const onClickRemove = () => {
    const list = [...projectDetails];
    list.splice(list.lastIndexOf(), 1);
    setProjectDetails(list);
  };

  const validate = () => {
    const length = projectDetails.length;
    for (let i = 0; i < length; i++) {
      if (
        projectDetails[i].title === "" &&
        projectDetails[i].link === "" &&
        projectDetails[i].description === ""
      ) {
        let err = [...error];
        err[i].titleErr = true;
        err[i].titleErrMsg = "Please enter title";
        err[i].linkErr = true;
        err[i].linkErrMsg = "Please enter link";
        err[i].descriptionErr = true;
        err[i].descriptionErrMsg = "Please enter description";
        setErrorFlag(err);
        return false;
      }

      if (projectDetails[i].title === "") {
        let err = [...error];
        err[i].titleErr = true;
        err[i].titleErrMsg = "Please enter title";
        setErrorFlag(err);
        return false;
      }

      if (projectDetails[i].link === "") {
        let err = [...error];
        err[i].linkErr = true;
        err[i].linkErrMsg = "Please enter link";
        setErrorFlag(err);
        return false;
      }

      if (projectDetails[i].description === "") {
        let err = [...error];
        err[i].descriptionErr = true;
        err[i].descriptionErrMsg = "Please enter description";
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
      dispatch(storeProjectDetails(projectDetails));
      addToast("Project Details Saved", {
        appearance: `success`,
        autoDismiss: true,
      });
      history.push("/experiance");
    }
  };

  const onClickBack = () => {
    history.push("/education");
  };

  return (
    <div className="project">
      <div className="project_main">
        <div className="project_title">
          <h3>Projects</h3>
        </div>
        <div className="project_sec">
          {projectDetails?.map((data, index) => (
            <div key={index} className="project_container">
              <Grid container spacing={4}>
                <TextInput
                  name="title"
                  label="Title"
                  required={true}
                  handleChange={(e) => handleChange(e, index)}
                  autoFocus
                  error={error[index].titleErr}
                  errorMsg={error[index].titleErrMsg}
                  value={projectDetails[index].title}
                />
                <TextInput
                  name="link"
                  label="Link"
                  required={true}
                  handleChange={(e) => handleChange(e, index)}
                  error={error[index].linkErr}
                  errorMsg={error[index].linkErrMsg}
                  value={projectDetails[index].link}
                />
                <TextInput
                  name="description"
                  label="Description"
                  required={true}
                  handleChange={(e) => handleChange(e, index)}
                  error={error[index].descriptionErr}
                  errorMsg={error[index].descriptionErrMsg}
                  value={projectDetails[index].description}
                />
              </Grid>
            </div>
          ))}

          <div className="project_add">
            {projectDetails.length !== 1 && (
              <Button type="submit" color="primary" onClick={onClickRemove}>
                - remove
              </Button>
            )}

            <Button type="submit" color="primary" onClick={onClickAdd}>
              + add
            </Button>
          </div>
          <div className="project_backAndNext">
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

export default Project;
