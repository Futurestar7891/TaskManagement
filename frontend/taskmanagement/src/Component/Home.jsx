import { useState, useEffect } from "react";
import Taskcard from "./Taskcard";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

function Home() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [inputValue, setinputValue] = useState("");
  const [date, setDate] = useState("");
  const [taskarray, settaskArray] = useState([]);

  const addTask = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:3000/api/createtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Email: localStorage.getItem("Email"),
          task: inputValue,
          date: date,
        }),
      });
      const jsondata = await response.json();
      if (jsondata.success === true) {
        setinputValue("");
        alert.show(jsondata.message);
        getTask();
      } else {
        alert.show(jsondata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTask = async () => {
    try {
      console.log("entered in gettask api");
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:3000/api/gettask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Email: localStorage.getItem("Email"),
        }),
      });
      const jsondata = await response.json();
      if (jsondata.success === true) {
        console.log(jsondata.taskdata);
        settaskArray(jsondata.taskdata);
      } else {
        console.log("something wrong", jsondata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const logout = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const jsondata = await response.json();
      if (jsondata.success === true) {
        localStorage.removeItem("Token");
        navigate("/");
        alert.show(jsondata.message);
      } else {
        alert.show(jsondata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const notimplemented = () => {
    window.alert("not implemented");
  };

  return localStorage.getItem("Token") ? (
    <div className="homecontainer">
      <div className="profile">
        <div className="profilecontainer">
          <div className="profileimage">
            <img src={localStorage.getItem("Img")} alt="" />
            <strong>{localStorage.getItem("Name")}</strong>
          </div>
          <hr />
          <div className="profiledetails">
            <NavLink onClick={notimplemented} className="Navlink">
              Profile Details
            </NavLink>
            <NavLink onClick={notimplemented} className="Navlink">
              Edit Profile
            </NavLink>
            <NavLink onClick={notimplemented} className="Navlink" to="#">
              Change Password
            </NavLink>
          </div>
          <div className="profilebutton">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      <div className="todo">
        <div className="taskinput">
          <input
            type="text"
            placeholder="Please Enter Your Task"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
          />
          <input
            type="date"
            placeholder="deadline"
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div className="tasklist">
          {taskarray.map((task, idx) => (
            <div
              style={{
                width: "30%",
                borderRadius: "0.4vw",
                flexWrap: "wrap",
              }}
              key={idx}
            >
              <Taskcard task={task} index={idx} getTask={getTask} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="loadercontainer">
      <div className="loader"></div>
      <h2>Please Login First</h2>
    </div>
  );
}

export default Home;
