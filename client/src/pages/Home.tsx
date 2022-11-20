import "./Home.css";
import ListContainer from "../components/listContainer/listContainer";
import TaskContainer from "../components/taskContainer/taskContainer";
import InfoContainer from "../components/infoContainer/infoContainer";
import React from "react";
import { useGlobalUserContext } from "../context/user";

function Home() {
  const { profile, setUser } = useGlobalUserContext();
  return (
    <div className="Home">
      <ListContainer />
      <TaskContainer />
      <InfoContainer />
    </div>
  );
}

export default Home;
