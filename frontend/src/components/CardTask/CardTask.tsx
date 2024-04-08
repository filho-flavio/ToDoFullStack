import "./CardTask.css";
import { FaCalendarAlt } from "react-icons/fa";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";

interface CardTasksProp {
  textTask: string;
  userImg: string;
  listId: string;
  taskId: number;
}

const CardTask: React.FC<CardTasksProp> = ({
  textTask,
  userImg,
  listId,
  taskId,
}) => {
  const parsedTaskId = `taskId-${taskId}-listId-${listId}`;
  const { handleDragStart, handleDragEnd } = useDragAndDrop();

  return (
    <>
      <div
        className="container-task grab"
        key={listId}
        id={parsedTaskId}
        draggable
        onDragStart={(event) =>
          handleDragStart(event, { textTask, userImg, listId, taskId })
        }
        onDragEnd={handleDragEnd}
      >
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
