import "./CardTask.css";
import { FaCalendarAlt } from "react-icons/fa";

interface CardTasksProp {
  textTask: string;
  userImg: string;
  listId: string;
  taskId: number;
}

const CardTask: React.FC<CardTasksProp> = ({ textTask, userImg, listId, taskId }) => {
  const parsedTaskId = `taskId-${taskId}-listId-${listId}`

  return (
    <>
      <div className="container-task grab" key={listId} id={parsedTaskId}>

        <div className="content-task">
          <p>{textTask}</p>
          {/* <FaCalendarAlt className="calendar pointer" /> */}
        </div>

        <img className="task-user-img" src={userImg} alt="" />

      </div>
    </>
  );
};

export default CardTask;
