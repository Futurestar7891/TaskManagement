import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./App.css";
import Home from "./Component/Home";
import Signup from "./Component/Signup";
import Login from "./Component/Login";

function App() {
  const alertOptions = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "5vh",
    transition: transitions.SCALE,
  };
  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Routes>
        <Route path="/Home" Component={Home} />
        <Route path="/signup" Component={Signup} />
        <Route path="/" Component={Login} />
      </Routes>
    </AlertProvider>
  );
}

export default App;
