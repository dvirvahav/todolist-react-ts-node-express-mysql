import { useGlobalCurrentTaskContext } from "../../context/currentTask";
import DateItem from "./dateItem";

/* This function contains the current task selected information */
export default function InfoContainer() {
  const { currentTask } = useGlobalCurrentTaskContext();

  return (
    <div className="infoContainer">
      <h1 className="headline">Info</h1>
      <div className="taskInfo">
        <DateItem date={currentTask.info.date} />
      </div>
    </div>
  );
}
