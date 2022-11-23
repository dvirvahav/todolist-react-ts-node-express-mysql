import "./Home.css";
import ListContainer from "../../components/listContainer/listContainer";
import TaskContainer from "../../components/taskContainer/taskContainer";
import InfoContainer from "../../components/infoContainer/infoContainer";
import React from "react";

function Home() {
  return (
    <div className="Home">
      <ListContainer />
      <TaskContainer />
      <InfoContainer />
    </div>
  );
}

export default Home;
