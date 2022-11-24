import Axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useGlobalCurrentListContext } from "../../context/currentList";
import { useGlobalCurrentListIDContext } from "../../context/currentListID";

import { useGlobalListContext } from "../../context/list";

export default function ListItem({
  itemInput,
  itemID,
}: {
  itemInput: string;
  itemID: number;
  isActive: boolean;
}) {
  const { setCurrentList, clearCurrentList } = useGlobalCurrentListContext();
  const { lists, removeItem } = useGlobalListContext();
  const { currentListID, setCurrentListID } = useGlobalCurrentListIDContext();
  const [buttonInput, setButtonInput] = useState<string>("Edit");
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [input, setInput] = useState<string>(itemInput);

  // This function handle clicked list
  const handleClearList = () => {
    clearCurrentList();
  };
  const handleSetList = () => {
    setCurrentListID(itemID); // set current list ID

    // Displaying current list tasks to tasks tab
    lists.map((item) => {
      if (item.listID === itemID) {
        setCurrentList(item.pendingTasks);
      }
    });
  };

  // handle task input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // remove list from items
  const handleRemove = () => {
    // Make a connection to DB and remove the list + its tasks
    Axios.post("/api/removeList", {
      listID: itemID,
    }).then((response) => {
      if (response.data === "Error") {
        alert("Something went wrong, list not deleted");
      } else {
        clearCurrentList();
        removeItem(itemID);
      }
    });
  };

  // Make a connection to DB and update list name
  const handleSave = () => {
    setReadOnly(!readOnly);
    if (!readOnly) {
      setButtonInput("Edit");
      return;
    } else setButtonInput("Save");
    Axios.post("/api/updateList", {
      listID: itemID,
      newName: input,
    }).then((response) => {
      if (response.data === "Error") {
        alert("Something went wrong, list not saved in db");
      } else {
        lists.map((item) => {
          if (item.listID === currentListID) {
            item.listName = input;
          }
          return item;
        });
      }
    });
  };

  return (
    <li
      className="item"
      id={"list" + itemID}
      onMouseDown={handleClearList}
      onMouseUp={handleSetList}>
      <input
        type="text"
        value={input}
        readOnly={readOnly}
        maxLength={20}
        onChange={handleChange}
      />

      <div className="buttonsGrid ">
        <button onClick={handleSave}>{buttonInput}</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </li>
  );
}
