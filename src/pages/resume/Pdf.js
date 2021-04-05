import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Open Sans",
  fontWeight: "bold",
  fonts: [
    {
      src:
        "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src:
        "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 50,
    boxShadow: "0px 0px 30px 10px rgba(0,0,0,0.1)",
  },

  about: {
    display: "flex",
    flexDirection: "row",
  },

  leftSide: {
    flex: 0.3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  rightSide: {
    flex: 0.7,
    padding: 20,
  },

  name: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
  },

  subName: {
    fontSize: 14,
    marginBottom: 10,
  },

  contact: {
    fontSize: 14,
  },

  objective: {
    marginTop: 10,
    fontSize: 16,
  },

  nameStyle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  leftLogo: {
    fontSize: 30,
    fontWeight: "bold",
  },

  leftText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  nameStyleExp: {
    fontSize: 18,
    fontWeight: "bold",
  },

  skill: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },

  skillType: {
    flex: 0.5,
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 25,
  },

  skillLevel: {
    flex: 0.5,
    fontSize: 12,
  },
});

// Create Document Component
const PdfDoc = ({ perData, eduData, projData, expData, skillData }) => (
  <Document size="A4">
    <Page>
      <View style={styles.container}>
        <View style={styles.about}>
          <View style={styles.leftSide}>
            <Text style={styles.leftLogo}>
              {perData.firstName.charAt(0)}
              {perData.lastName.charAt(0)}
            </Text>
          </View>
          <View style={styles.rightSide}>
            <View style={styles.name}>
              <Text style={styles.nameStyle}>
                {perData.firstName + " " + perData.lastName}
              </Text>
              <Text style={styles.subName}>{expData[0].designation}</Text>
              <Text style={styles.contact}>Ph: {perData.mobileNumber}</Text>
              <Text style={styles.contact}>Email: {perData.email}</Text>
              <Text style={styles.contact}>Website:{perData.website}</Text>

              <Text style={styles.objective}>{perData.objective}</Text>
            </View>
          </View>
        </View>

        <View style={styles.about}>
          <View style={styles.leftSide}>
            <Text style={styles.leftText}>Work Experiance</Text>
          </View>
          <View style={styles.rightSide}>
            {expData.map((data, index) => (
              <View style={styles.name}>
                <Text style={styles.nameStyleExp}>{data.company}</Text>
                <Text style={styles.subName}>{data.designation}</Text>
                <Text style={styles.contact}>{data.duration}</Text>

                <Text style={styles.objective}>{data.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.about}>
          <View style={styles.leftSide}>
            <Text style={styles.leftText}>Education</Text>
          </View>
          <View style={styles.rightSide}>
            {eduData.map((data, i) => (
              <View style={styles.name}>
                <Text style={styles.nameStyleExp}>{data.college}</Text>
                <Text style={styles.subName}>{data.qualification}</Text>
                <Text style={styles.contact}>
                  {data.from} - {data.to}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.about}>
          <View style={styles.leftSide}>
            <Text style={styles.leftText}>Skills</Text>
          </View>
          <View style={styles.rightSide}>
            {skillData.map((data, i) => (
              <View style={styles.skill}>
                <Text style={styles.skillType}>{data.skills}</Text>
                <Text style={styles.skillLevel}>{data.proficiency}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PdfDoc;

{
  /* <View className="resume_container">
        <View className="resume_about">
          <View className="resume_leftSide">
            <Text>RM</Text>
          </View>
          <View className="resume_rightSide">
            <View className="resume_name">
              <Text>Ranjan Moger</Text>
              <Text className="resume_subhead">
                Associate Software Developer
              </Text>
              <Text className="resume_contact">Ph: +91 9513109508</Text>
              <Text className="resume_contact">
                Email: ranjan.moger@gmail.com
              </Text>
              <Text className="resume_contact">
                Website: www.ranjan-moger.com
              </Text>

              <Text className="resume_objective">
                To work in an organization where I can use my skills and
                knowledge to deliver value added results that provides me job
                satisfaction and self development which help me achieve personal
                as well as organizational goals.
              </Text>
            </View>
          </View>
        </View>

        <View className="resume_experiance">
          <View className="resume_exp_leftSide">
            <Text>Work Experiance</Text>
          </View>
          <View className="resume_exp_rightSide">
            <View className="resume_name">
              <Text>Niveus Solutions Pvt. Ltd.</Text>
              <Text className="resume_subhead">
                Associate Software Developer
              </Text>
              <Text className="resume_contact">Jun 2020 - Present</Text>

              <Text className="resume_objective">
                Written clean and clear code for projects such as ICICI – M2I
                and Clinic Directory. Developed clinic directory application by
                using React JS library.
              </Text>
            </View>
            <View className="resume_name">
              <Text>Niveus Solutions Pvt. Ltd.</Text>
              <Text className="resume_subhead">Software Developer Intern</Text>
              <Text className="resume_contact">Jun 2019 - Apr 2020</Text>

              <Text className="resume_objective">
                Written clean and clear code for projects such as ICICI – M2I
                and Clinic Directory. Developed clinic directory application by
                using React JS library.
              </Text>
            </View>
          </View>
        </View>

        <View className="resume_experiance">
          <View className="resume_exp_leftSide">
            <Text>Education</Text>
          </View>
          <View className="resume_exp_rightSide">
            <View className="resume_name">
              <Text>Manipal Institute of Technology</Text>
              <Text className="resume_subhead">
                M.tech - Computer Network Engg
              </Text>
              <Text className="resume_contact">Jun 2018 - Jun 2020</Text>
            </View>
            <View className="resume_name">
              <Text>AMC Engineering College</Text>
              <Text className="resume_subhead">BE - Computer Science Engg</Text>
              <Text className="resume_contact">Jun 2013 - Jun 2017</Text>
            </View>
          </View>
        </View>

        <View className="resume_experiance">
          <View className="resume_exp_leftSide">
            <Text>Skills</Text>
          </View>
          <View className="resume_exp_rightSide">
            <View className="resume_skills">
              <Text className="resume_skill_name">JAVA</Text>
              <Text className="resume_skill_perc">70%</Text>
            </View>
            <View className="resume_skills">
              <Text className="resume_skill_name">ReactJS</Text>
              <Text className="resume_skill_perc">75%</Text>
            </View>
            <View className="resume_skills">
              <Text className="resume_skill_name">React Native</Text>
              <Text className="resume_skill_perc">75%</Text>
            </View>
            <View className="resume_skills">
              <Text className="resume_skill_name">NodeJS</Text>
              <Text className="resume_skill_perc">75%</Text>
            </View>
          </View>
        </View>
      </View> */
}
