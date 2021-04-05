import React, { useEffect, useState } from "react";
import "./Resume.css";
import { Button, Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import Pdf from "react-to-pdf";
import PdfDoc from "./Pdf";
import ResumeComp from "./ResumeComp";
import * as api from "../../api/index";

function Resume() {
  const history = useHistory();
  const [perData, setPerdata] = useState("");
  const [eduData, setEdudata] = useState("");
  const [projData, setProjdata] = useState("");
  const [expData, setExpdata] = useState("");
  const [skillData, setSkilldata] = useState("");
  const [showPDF, setShowPDF] = useState(false);

  useEffect(async () => {
    let perDetails = JSON.parse(localStorage.getItem("PERSONAL_DETAILS"));
    setPerdata(perDetails);
    let eduDetails = JSON.parse(localStorage.getItem("EDUCATION_DETAILS"));
    setEdudata(eduDetails);
    let projDetails = JSON.parse(localStorage.getItem("PROJECT_DETAILS"));
    setProjdata(projDetails);
    let expDetails = JSON.parse(localStorage.getItem("EXPERIANCE_DETAILS"));
    setExpdata(expDetails);
    let skillDetails = JSON.parse(localStorage.getItem("SKILLS_DETAILS"));
    setSkilldata(skillDetails);
    const saveDetails = {
      personal: perDetails,
      education: eduDetails,
      project: projDetails,
      experiance: expDetails,
      skills: skillDetails,
    };
    // await api
    //   .saveDetails(saveDetails)
    //   .then((res) => console.log("Saved", res))
    //   .catch((err) => console.log(err));
    setShowPDF(true);
  }, []);

  const onClickBack = () => {
    history.push("/skills");
  };

  return (
    <div className="resume">
      <div className="resume_main">
        <div className="resume_title">
          <h3>Your Resume</h3>
        </div>
        {showPDF ? (
          <ResumeComp
            perData={perData}
            eduData={eduData}
            projData={projData}
            expData={expData}
            skillData={skillData}
          />
        ) : null}

        <div className="resume_backAndNext">
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            onClick={onClickBack}
          >
            back
          </Button>

          <PDFDownloadLink
            document={
              showPDF ? (
                <PdfDoc
                  perData={perData}
                  eduData={eduData}
                  projData={projData}
                  expData={expData}
                  skillData={skillData}
                />
              ) : null
            }
            fileName={perData.firstName}
            className="Print_btn"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "DOWNLOAD RESUME"
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}

export default Resume;
