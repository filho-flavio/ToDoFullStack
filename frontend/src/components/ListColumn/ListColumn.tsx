import CardTask from "../CardTask/CardTask";
import "./ListColumn.css";
import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import userImg from "../../assets/user.png";
import { useEffect, useRef, useState } from "react";
import { useCreateTask, useGetTasks } from "../../hooks/useHandleTasks";
import { RiDraggable } from "react-icons/ri";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  listTitle: string;
  listId: number;
}

const ListColumn: React.FC<Props> = ({ listTitle, listId }) => {
  const [isOpenAddCard, setIsOpenAddCard] = useState<boolean>(false);
  const refText = useRef<HTMLInputElement>(null);
  const [arrTasks, setArrTasks] = useState([]);
  const [totaltTasks, setTotalTasks] = useState(0);
  const [newTask, setNewtask] = useState({});
  const { user } = useAuth();

  const parsedListId = String(listId);

  const columnId = `list-${parsedListId}`;

  const handleOpenAddCard = () => {
    setIsOpenAddCard(!isOpenAddCard);
  };

  const handleSaveCardTask = (item) => {
    if (refText.current !== null && refText.current.value.trim() !== "") {
      const newCardToCreate = {
        textTask: refText.current.value,
        listId: parsedListId,
        user_owner: user.id,
      };

      setNewtask(newCardToCreate);

      useCreateTask(newCardToCreate);

      setIsOpenAddCard(!isOpenAddCard);
    } else {
      alert("You must write a task to add!");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await useGetTasks({
          listId: parsedListId,
          user_owner: user.id,
        });
        setArrTasks(tasks);
        setTotalTasks(tasks.length);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [newTask]);

  return (
    <>
      <div className="tasks-column" key={listId} id={columnId}>
        <div className="title-wrap">
          <span className="title-content">
            <h3 className="title-tasks-columns ">{listTitle}</h3>
            <p className="qtd-tasks">{totaltTasks}</p>
          </span>
          <RiDraggable className="menu-column grab" />
        </div>

        <div className="tasks-list">
          {arrTasks.map((item, index) => (
            <CardTask
              textTask={item.text}
              userImg={userImg}
              key={index}
              listId={parsedListId}
              taskId={index}
            />
          ))}
        </div>

        {isOpenAddCard ? (
          <div className="wrap-add-card">
            <input
              type="text"
              className="in-save-card"
              ref={refText}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveCardTask();
              }}
            />
            <div className="wrap-btns-save-close">
              <button
                className="btn-save-card pointer"
                onClick={() => handleSaveCardTask(columnId)}
              >
                Save
              </button>
              <IoClose
                onClick={handleOpenAddCard}
                className="btn-close-modal pointer"
              />
            </div>
          </div>
        ) : (
          <button className="btn-add-card pointer" onClick={handleOpenAddCard}>
            + Add a Card
          </button>
        )}
      </div>
    </>
  );
};

export default ListColumn;
