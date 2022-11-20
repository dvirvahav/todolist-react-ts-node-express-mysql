import Axios from "axios";
import { ChangeEvent, useState } from "react";
import { useGlobalCurrentListIDContext } from "../../context/currentListID";
import { useGlobalCurrentTaskContext } from "../../context/currentTask";
import { useGlobalCurrentTasksContext } from "../../context/currentTasks";
import { useGlobalListContext } from "../../context/list";

export default function TaskItem({
  itemInput,
  itemID,
}: {
  itemInput: string;
  itemID: number;
}) {
  const { currentListID } = useGlobalCurrentListIDContext();
  const { lists } = useGlobalListContext();
  const { setCurrentList } = useGlobalCurrentTasksContext();
  const { setCurrentTask } = useGlobalCurrentTaskContext();

  const [input, setInput] = useState<string>(itemInput);
  const [buttonInput, setButtonInput] = useState<string>("Edit");
  const [readOnly, setReadOnly] = useState<boolean>(true); // change state to readonly and vise versa

  // remove list from items & data base
  const handleRemove = () => {
    // save change in database
    Axios.post("/api/removeTask", {
      taskID: itemID,
    }).then((response) => {
      if (response.data === "Error") {
        alert("Something went wrong, list not deleted");
      } else {
        lists.map((item) => {
          if (item.listID === currentListID) {
            item.pendingTasks = item.pendingTasks
              .filter((item) => item.taskID !== itemID)
              .slice();
          }
          return item;
        });
      }
    });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSave = () => {
    setReadOnly(!readOnly);
    if (!readOnly) {
      setButtonInput("Edit");
      return;
    } else setButtonInput("Save");

    Axios.post("/api/updateTask", {
      taskID: itemID,
      newName: input,
    }).then((response) => {
      if (response.data === "Error") {
        alert("Something went wrong, task name not updated in db");
      } else {
        lists.map((item) => {
          if (item.listID === currentListID) {
            item.pendingTasks.map((item) => {
              if (item.taskID === itemID) item.taskName = input;
              return item;
            });
          }
          return item;
        });

        lists.map((item) => {
          if (item.listID === currentListID) {
            setCurrentList(item.pendingTasks.slice());
          }
        });
      }
    });
  };

  const handleClick = () => {
    lists.map((item) => {
      if (item.listID === currentListID) {
        item.pendingTasks.map((item) => {
          if (item.taskID === itemID) setCurrentTask(item);
          return item;
        });
      }
      return item;
    });
  };

  return (
    <li className="taskItem item" id={"task" + itemID} onClick={handleClick}>
      <input
        type="text"
        value={itemInput}
        readOnly={readOnly}
        maxLength={20}
        onChange={handleChange}
      />
      <div className="buttonsGrid">
        <button onClick={handleSave}>{buttonInput}</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </li>
  );
}
