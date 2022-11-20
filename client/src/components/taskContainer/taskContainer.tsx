import Axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

import { useGlobalCurrentListIDContext } from "../../context/currentListID";
import { useGlobalCurrentTasksContext } from "../../context/currentTasks";
import { useGlobalListContext } from "../../context/list";
import { infoObject, taskObject } from "../../types/types";
import TaskItem from "./taskItem";

export default function TaskContainer() {
  const { currentList, setCurrentList } = useGlobalCurrentTasksContext();
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
            item.pendingTasks.push(newTask);
            return item;
          } else {
            return item;
          }
        });

        // Set the list as current list
        lists.map((item) => {
          if (item.listID === currentListID) {
            setCurrentList(item.pendingTasks.slice());
          }
        });
      }
    });

    setInput("");
  };

  return (
    <div className="taskContainer">
      <h1 className="headline">Tasks</h1>

      <div className="allLists">
        <ul className="pendingTaskList">
          {currentList.map((item) => (
            <TaskItem itemInput={item.taskName} itemID={item.taskID} />
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
  };

  return newTaskItem;
}
