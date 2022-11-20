import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useGlobalUserContext } from "../context/user";
import { listObject, userObject } from "../types/types";
import { initiateNewList } from "../components/listContainer/listContainer";
import { initiateNewTask } from "../components/taskContainer/taskContainer";
import { useGlobalListContext } from "../context/list";
import { useGlobalCurrentTasksContext } from "../context/currentTasks";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useGlobalUserContext();
  const { lists, reloadNewList, clearList } = useGlobalListContext();
  const { clearCurrentList } = useGlobalCurrentTasksContext();
  const navigate = useNavigate();

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    Axios.post("/api/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data === "Error") {
        alert("Login details are incorrect");
      } else {
        const user: userObject = {} as userObject;
        user.username = response.data[0]["username"];
        user.first = response.data[0]["first"];
        user.last = response.data[0]["last"];
        user.mail = response.data[0]["mail"];
        Axios.post("/api/getAllData", { username: username }).then(
          (response) => {
            if (response.data === "Error") {
              alert("Couldn't fetch data from DB");
            } else {
              clearData();
              loadData(response);
              console.log(lists);
            }
          }
        );

        setUser(user);
        navigate("/");
      }
    });
  };

  const handleSignup = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate("/signup");
  };
  const clearData = () => {
    clearCurrentList();
    clearList();
  };
  const loadData = (response: any) => {
    const listss: listObject[] = [];
    var i,
      j = 0;
    for (i = 0; i < response.data[0].length; i++) {
      let currentListID = response.data[0][i]["id"];
      let newList: listObject = initiateNewList(
        currentListID,
        response.data[0][i]["name"]
      );
      listss.push(newList);
      for (j = 0; j < response.data[1].length; j++) {
        if (response.data[1][j]["listID"] === currentListID) {
          let newTask = initiateNewTask(
            response.data[1][j]["taskID"],
            response.data[1][j]["taskName"]
          );
          newTask.info.date = response.data[1][j]["date"];
          if (response.data[1][j]["status"])
            listss[i].completedTasks.push(newTask);
          listss[i].pendingTasks.push(newTask);
        }
      }
    }
    reloadNewList(listss);
  };
  return (
    <div className="Login-body">
      <div className="Login">
        <h1>Log in to Your Account</h1>
        <form method="post" onSubmit={handleSubmit}>
          <input
            className="Login-input"
            type="text"
            name="username"
            placeholder="Username"
            required
            value={username}
            onChange={handleUserChange}
          />
          <br />
          <input
            className="Login-input"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={handlePassChange}
          />
          <br />
          <br />
          <input type="submit" className="Login-button" value="Login" />

          <br />
          <br />
          <br />
          <p>
            Need an account?{" "}
            <a href="/public/Signup.html" onClick={handleSignup}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
