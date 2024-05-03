import { useState, useEffect } from "react";
import Taskcard from "./Taskcard";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [inputValue, setinputValue] = useState("");
  const [date, setDate] = useState("");
  const [taskarray, settaskArray] = useState([]);

  const addTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/createtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: localStorage.getItem("Email"),
          task: inputValue,
          date: date,
        }),
      });
      const jsondata = await response.json();
      if (jsondata.success === true) {
        console.log("Task added successfully");
        getTask();
      } else {
        console.log(jsondata);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/gettask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        console.log("something wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("Token");
    navigate("/");

    console.log(localStorage.getItem("Token"));
  };

  const notimplemented = () => {
    window.alert("not implemented");
  };
  return (
    <div className="homecontainer">
      <div className="profile">
        <div className="profileimg">
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
  );
}

export default Home;
