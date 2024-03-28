import "./CardTask.css";
import { FaCalendarAlt } from "react-icons/fa";

interface CardTasksProp {
  textTask: string;
  userImg: string;
}

const CardTask: React.FC<CardTasksProp> = ({ textTask, userImg }) => {
  return (
    <>
      <div className="container-task grab">

        <div className="content-task">
          <p>{textTask}</p>
          <FaCalendarAlt className="calendar pointer" />
        </div>

        <img className="task-user-img" src={userImg} alt="" />

      </div>
    </>
  );
};

export default CardTask;
