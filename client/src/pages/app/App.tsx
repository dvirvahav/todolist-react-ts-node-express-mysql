import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Home from "../home/Home";
import CurrentTaskContextProvider from "../../context/currentTask";
import ListContextProvider from "../../context/list";
import CurrentListContextProvider from "../../context/currentList";
import CurrentListIDContextProvider from "../../context/currentListID";
import UserContextProvider from "../../context/user";

function App() {
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

        <CurrentListContextProvider>
          <CurrentListIDContextProvider>
            <CurrentTaskContextProvider>
              <UserContextProvider>
                <ListContextProvider>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                  </Routes>
                </ListContextProvider>
              </UserContextProvider>
            </CurrentTaskContextProvider>
          </CurrentListIDContextProvider>
        </CurrentListContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
