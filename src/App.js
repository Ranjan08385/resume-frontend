import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./pages/header/Header";
import PersonalDetails from "./pages/personal_details/PersonalDetails";
import EducationDetails from "./pages/education/Education";
import ProjectDetails from "./pages/project/Project";
import ExperianceDetails from "./pages/experiance/Experiance";
import SkillsDetails from "./pages/skills/Skills";
import YourResume from "./pages/resume/Resume";
import Home from "./pages/home/Home";
import { ToastProvider, useToasts } from "react-toast-notifications";
// import { Snack } from "../snackbar";

function App() {
  return (
    <div className="App">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        // components={{ Toast: Snack }}
        placement="bottom-center"
      >
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/personal" component={PersonalDetails} />
            <Route path="/education" component={EducationDetails} />
            <Route path="/project" component={ProjectDetails} />
            <Route path="/experiance" component={ExperianceDetails} />
            <Route path="/skills" component={SkillsDetails} />
            <Route path="/resume" component={YourResume} />
          </Switch>
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
