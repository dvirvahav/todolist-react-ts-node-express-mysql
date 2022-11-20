import Axios from "axios";
import { ChangeEvent, useState } from "react";
import { useGlobalCurrentListIDContext } from "../../context/currentListID";
import { useGlobalCurrentTasksContext } from "../../context/currentTasks";
import { useGlobalListContext } from "../../context/list";

export default function ListItem({
  itemInput,
  itemID,
  isActive,
}: {
  itemInput: string;
  itemID: number;
  isActive: boolean;
}) {
  const { setCurrentList, clearCurrentList } = useGlobalCurrentTasksContext();
  const { lists, removeItem } = useGlobalListContext();
  const { currentListID, setCurrentListID } = useGlobalCurrentListIDContext();
  const [buttonInput, setButtonInput] = useState<string>("Edit");
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [input, setInput] = useState<string>(itemInput);

  // set clicked list tasks
  const handleClick = () => {
    setCurrentListID(itemID);

    // eslint-disable-next-line array-callback-return
    lists.map((item) => {
      if (item.listID === itemID) {
        setCurrentList(item.pendingTasks.slice());
      }
    });

    // effect is not instant for some reason.
    //  lists.map((item) => {
    //       if (item.listID === currentListID) {
    //         item.isActive = true;
    //       } else {
    //         item.isActive = false;
    //       }
    //       return item;
    //     });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // remove list from items
  const handleRemove = () => {
    // save change in database
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
    <li className="item" id={"list" + itemID} onClick={handleClick}>
      <input
        type="text"
        value={input}
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
