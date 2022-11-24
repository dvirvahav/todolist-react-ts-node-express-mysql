import Axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

import { useGlobalCurrentListIDContext } from "../../context/currentListID";
import { useGlobalCurrentListContext } from "../../context/currentList";
import { useGlobalListContext } from "../../context/list";
import { infoObject, taskObject } from "../../types/types";
import TaskItem from "./taskItem";

export default function TaskContainer() {
  const { currentList, setCurrentList, clearCurrentList } =
    useGlobalCurrentListContext();
  const { currentListID } = useGlobalCurrentListIDContext();
  const { lists } = useGlobalListContext();
  const [input, setInput] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  // make a connection to DB and save the new task to already exist list
  const submit = (event: FormEvent): void => {
    event.preventDefault(); // prevent page from re-render

    Axios.post("/api/insertTask", {
      listID: currentListID,
      taskName: input,
    }).then((response) => {
      if (response.data === "Error") {
        alert("Something went wrong, list not saved in db");
      } else {
        // mysql auto-generate id, date created
        let newTask: taskObject = {} as taskObject;

        // Creating new task to present in client side
        lists.map((item) => {
          if (item.listID === currentListID) {
            newTask = initiateNewTask(response.data[0]["id"], input);
            item.pendingTasks.set(response.data[0]["id"], newTask);
          }
        });

        // Set the list as current list
        lists.map((item) => {
          if (item.listID === currentListID) {
            clearCurrentList();
            setCurrentList(item.pendingTasks);
          }
        });
      }
    });

    setInput("");
  };

  const handlePending = () => {
    // clearCurrentList();
  };
  const handleCompleted = () => {};
  return (
    <div className="taskContainer">
      <h1 className="headline">Tasks</h1>
      <div>
        <button onClick={handlePending}> Pending</button>
        <button onClick={handleCompleted}> Completed </button>
      </div>
      <div className="allLists">
        <ul className="pendingTaskList">
          {Array.from(currentList.values()).map((item) => (
            <TaskItem
              itemInput={item.taskName}
              itemID={item.taskID}
              itemStatus={item.status}
            />
          ))}
        </ul>
      </div>
      <form className="formAdd" onSubmit={submit}>
        <button>+</button>
        <input
          className="taskInput"
          type="text"
          placeholder="Add a task"
          maxLength={80}
          size={80}
          value={input} // in order to clear it with setInputValue
          onChange={handleChange} // updating InputValue
          required
        />
      </form>
    </div>
  );
}

export function initiateNewTask(serial: number, input: string): taskObject {
  const newInfoForTask: infoObject = {
    date: new Date().toLocaleString(),
  };
  const newTaskItem: taskObject = {
    taskID: serial,
    taskName: input,
    info: newInfoForTask,
    status: 0,
  };

  return newTaskItem;
}
