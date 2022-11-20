import { useCallback, useState } from "react";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { listObject, taskObject, userObject } from "../types/types";
import { CurrentTasksContext } from "../context/currentTasks";
import { CurrentListIDContext } from "../context/currentListID";
import { CurrentTaskContext, taskTemp } from "../context/currentTask";
import { UserContext } from "../context/user";
import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import { ListContext } from "../context/list";

function App() {
  const [lists, setLists] = useState<listObject[]>([]);
  const [currentList, setCurrentList] = useState<taskObject[]>([]);
  const [currentListID, setCurrentListID] = useState<number>(0);
  const [currentTask, setCurrentTask] = useState<taskObject>(taskTemp);
  const [profile, setUser] = useState({} as userObject);

  const addNewList = useCallback(
    (newList: listObject) => setLists([...lists, newList]),
    [lists]
  );
  const reloadNewList = useCallback(
    (newList: listObject[]) => setLists(newList),
    []
  );
  const clearList = useCallback(() => setLists([]), []);
  const clearCurrentList = useCallback(() => setCurrentList([]), []);
  const removeItem = useCallback(
    (itemID: number) => setLists(lists.filter((t) => t.listID !== itemID)),
    [lists]
  );

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to="/">
            <input type="text" className="nav-bar-item" value="Home" />
          </Link>
          <Link to="/login">
            <input type="text" className="nav-bar-item" value="Login" />
          </Link>
          <Link to="/signup">
            <input type="text" className="nav-bar-item" value="Register" />
          </Link>
        </nav>
        <CurrentTasksContext.Provider
          value={{ currentList, clearCurrentList, setCurrentList }}>
          <CurrentListIDContext.Provider
            value={{ currentListID, setCurrentListID }}>
            <CurrentTaskContext.Provider
              value={{ currentTask, setCurrentTask }}>
              <UserContext.Provider value={{ profile, setUser }}>
                <ListContext.Provider
                  value={{
                    addNewList,
                    removeItem,
                    reloadNewList,
                    clearList,
                    lists,
                  }}>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                  </Routes>
                </ListContext.Provider>
              </UserContext.Provider>
            </CurrentTaskContext.Provider>
          </CurrentListIDContext.Provider>
        </CurrentTasksContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
