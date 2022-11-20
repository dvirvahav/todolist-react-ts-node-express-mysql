import ListItem from "./listItem";

import { ChangeEvent, useState, FormEvent } from "react";
import { listObject, taskObject } from "../../types/types";
import { useGlobalCurrentTasksContext } from "../../context/currentTasks";
import { useGlobalListContext } from "../../context/list";

import { useGlobalCurrentListIDContext } from "../../context/currentListID";
import Axios from "axios";
import { useGlobalUserContext } from "../../context/user";

export default function ListContainer() {
  const [input, setInput] = useState<string>("");
  const { setCurrentList } = useGlobalCurrentTasksContext();
  const { lists, addNewList } = useGlobalListContext();
  const { setCurrentListID } = useGlobalCurrentListIDContext();
  const { profile } = useGlobalUserContext();

  const handleSubmit = (event: FormEvent): void => {
    let newList: listObject = {} as listObject;
    event.preventDefault(); // prevent page from re-render
    console.log(profile);
    // make a connection to DB and save the new list with axios
    Axios.post("/api/insertList", {
      listName: input,
      username: profile.username,
    }).then((response) => {
      if (response.data === "Error") {
        alert("Something went wrong, list not saved in db");
      } else {
        setCurrentListID(response.data[0]["id"]); // mysql auto-increment returns the id of the new list
        newList = initiateNewList(response.data[0]["id"], input); // set new list with the id
        setCurrentList(newList.pendingTasks.slice()); // set the list as current
        addNewList(newList); // add the list to items

        // setNewSerial(serial + 1); //
      }
    });
    console.log(lists);
    setInput("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="listContainer">
      <h1 className="headline">Lists</h1>
      <ul className="categoryList">
        <ul>
          {lists.map((item) => (
            <ListItem
              itemInput={item.listName}
              itemID={item.listID}
              isActive={item.isActive}
            />
          ))}
        </ul>
      </ul>
      <form className="formAddList" onSubmit={handleSubmit}>
        <button>+</button>
        <input
          className="listInput"
          type="text"
          placeholder="Add a list"
          maxLength={20}
          value={input} // in order to clear it with setInputValue
          onChange={handleChange} // updating InputValue
          required
        />
      </form>
    </div>
  );
}

//
export function initiateNewList(serial: number, input: string): listObject {
  let completed: taskObject[] = [];
  let pending: taskObject[] = [];

  let newListItem: listObject = {
    listID: serial,
    listName: input,
    completedTasks: completed,
    pendingTasks: pending,
    isActive: false,
  };

  return newListItem;
}
