import { useState } from "react";

function Taskcard({ task, index, getTask }) {
  const [edittask, setEdittask] = useState(false);
  const [updatetask, setUpdatetask] = useState(task.task);

  const editTask = () => {
    setEdittask(true);
  };

  const handleInputChange = (e) => {
    setUpdatetask(e.target.value);
  };

  const updateTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/updatetask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index: index,
          Email: localStorage.getItem("Email"),
          task: updatetask,
        }),
      });
      const jsondata = await response.json();
      if (jsondata.success === true) {
        console.log("Task updated successfully");
        getTask();
        setEdittask(false);
      } else {
        console.log(jsondata);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/deletetask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index: index,
          Email: localStorage.getItem("Email"),
        }),
      });
      const jsondata = await response.json();
      if (jsondata.success === true) {
        console.log("Task deleted successfully");
        getTask();
      } else {
        console.log(jsondata);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  return (
    <div className="cardcontainer">
      <div className="cardcontainertask">
        {edittask ? (
          <input
            type="text"
            value={updatetask}
            onChange={handleInputChange}
            autoFocus // Automatically focus on the input field
          />
        ) : (
          <h2>{task.task}</h2>
        )}
      </div>
      <div className="cardcontainerbutton">
        {edittask ? (
          <button onClick={updateTask}>Update Task</button>
        ) : (
          <button onClick={editTask}>Edit Task</button>
        )}
        <button onClick={deleteTask}>Delete Task</button>
      </div>
      <span>Deadline: {task.date}</span>
    </div>
  );
}

export default Taskcard;
