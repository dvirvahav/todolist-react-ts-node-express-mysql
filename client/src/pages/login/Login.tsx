import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useGlobalUserContext } from "../../context/user";
import { listObject, userObject } from "../../types/types";
import { initiateNewList } from "../../components/listContainer/listContainer";
import { initiateNewTask } from "../../components/taskContainer/taskContainer";
import { useGlobalListContext } from "../../context/list";
import { useGlobalCurrentTasksContext } from "../../context/currentTasks";
import { alerts } from "../../utils/enums";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useGlobalUserContext();
  const { reloadNewList, clearList } = useGlobalListContext();
  const { clearCurrentList } = useGlobalCurrentTasksContext();
  const navigate = useNavigate();

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /* This login verify login details with mysql DB and after confirm 
  it sends the user information + lists &tasks related to that user */

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    Axios.post("/api/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data === "Error") {
          alert(alerts.login);
        } else {
          updateUserDetails(response);

          // Fetch users lists + tasks
          Axios.post("/api/getAllData", { username: username })
            .then((response) => {
              if (response.data === "Error") {
                alert(alerts.db);
              } else {
                clearData(); // in case user connected with another login details.
                loadData(response);
              }
            })
            .catch(() => {
              alert(alerts.connection);
            });

          navigate("/");
        }
      })
      .catch(() => {
        alert(alerts.connection);
      });
  };

  // Navigate to signup page
  const handleSignup = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate("/signup");
  };

  const clearData = () => {
    clearCurrentList();
    clearList();
  };

  const updateUserDetails = (response: any) => {
    const user: userObject = {} as userObject;
    user.username = response.data[0]["username"];
    user.first = response.data[0]["first"];
    user.last = response.data[0]["last"];
    user.mail = response.data[0]["mail"];
    setUser(user);
  };

  const loadData = (response: any) => {
    const userLists: listObject[] = [];
    var i,
      j = 0;
    for (i = 0; i < response.data[0].length; i++) {
      let currentListID = response.data[0][i]["id"];
      let newList: listObject = initiateNewList(
        currentListID,
        response.data[0][i]["name"]
      );
      userLists.push(newList);
      for (j = 0; j < response.data[1].length; j++) {
        if (response.data[1][j]["listID"] === currentListID) {
          let newTask = initiateNewTask(
            response.data[1][j]["taskID"],
            response.data[1][j]["taskName"]
          );
          newTask.info.date = response.data[1][j]["date"];
          if (response.data[1][j]["status"])
            userLists[i].completedTasks.push(newTask);
          else userLists[i].pendingTasks.push(newTask);
        }
      }
    }
    reloadNewList(userLists);
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