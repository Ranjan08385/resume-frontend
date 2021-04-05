import React from "react";
import "./Resume.css";

function ResumeComp({ perData, eduData, projData, expData, skillData }) {
  return (
    <div>
      <div className="resume_container">
        <div className="resume_about">
          <div className="resume_leftSide">
            <p className="resume_bold_logo">RM</p>
          </div>
          <div className="resume_rightSide">
            <div className="resume_name">
              <p className="resume_bold_head">
                {perData.firstName + " " + perData.lastName}
              </p>
              <p className="resume_subhead">{expData[0].designation}</p>
              <p className="resume_contact">Ph: {perData.mobileNumber}</p>
              <p className="resume_contact">Email: {perData.email}</p>
              <p className="resume_contact">Website: {perData.website}</p>

              <p className="resume_objective">{perData.objective}</p>
            </div>
          </div>
        </div>

        <div className="resume_experiance">
          <div className="resume_exp_leftSide">
            <p className="resume_bold">Work Experiance</p>
          </div>
          <div className="resume_exp_rightSide">
            {expData.map((data, index) => (
              <div key={index} className="resume_name">
                <p className="resume_bold">{data.company}</p>
                <p className="resume_subhead">{data.designation}</p>
                <p className="resume_contact">{data.duration}</p>

                <p className="resume_objective">{data.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="resume_experiance">
          <div className="resume_exp_leftSide">
            <p className="resume_bold">Education</p>
          </div>

          <div className="resume_exp_rightSide">
            {eduData.map((data, i) => (
              <div key={i} className="resume_name">
                <p className="resume_bold">{data.college}</p>
                <p className="resume_subhead">{data.qualification}</p>
                <p className="resume_contact">
                  {data.from} - {data.to}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="resume_experiance">
          <div className="resume_exp_leftSide">
            <p className="resume_bold">Skills</p>
          </div>
          <div className="resume_exp_rightSide">
            {skillData.map((data, i) => (
              <div key={i} className="resume_skills">
                <p className="resume_skill_name">{data.skills}</p>
                <p className="resume_skill_perc">{data.proficiency} %</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeComp;
