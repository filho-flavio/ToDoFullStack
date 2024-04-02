import CardTask from "../CardTask/CardTask";
import "./ListColumn.css";
import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import userImg from "../../assets/user.png";
import { useEffect, useRef, useState } from "react";
import { useCreateTask, useGetTasks } from "../../hooks/useHandleTasks";

interface Props {
  listTitle: string;
  qtdTasks: number;
  listId: number;
}

const ListColumn: React.FC<Props> = ({ listTitle, qtdTasks, listId }) => {
  const [isOpenAddCard, setIsOpenAddCard] = useState<boolean>(false);
  const refText = useRef<HTMLInputElement>(null);
  const [arrTasks, setArrTasks] = useState([]);
  const [newTask, setNewtask] = useState({});

  const parsedListId = String(listId);

  const handleOpenAddCard = () => {
    setIsOpenAddCard(!isOpenAddCard);
  };

  const handleSaveCardTask = () => {
    if (refText.current !== null && refText.current.value.trim() !== "") {
      const newCardToCreate = {
        textTask: refText.current.value,
        listId: parsedListId,
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
        const tasks = await useGetTasks({ listId: parsedListId });
        setArrTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [newTask]);

  return (
    <>
      <div className="tasks-column" key={listId} id={parsedListId}>
        <div className="title-wrap">
          <span className="title-content">
            <h3 className="title-tasks-columns ">{listTitle}</h3>
            <p className="qtd-tasks">{qtdTasks}</p>
          </span>
          <BsThreeDots className="menu-column grab" />
        </div>

        <div className="tasks-list">
          {/* <CardTask
            textTask="Implement the way to add list columns and save in the DB"
            userImg={userImg}
          />
          <CardTask
            textTask="A card must have an id bound to their list"
            userImg={userImg}
          />
          <CardTask
            textTask="Should I get the name from the list and check all the tasks corresponding to it one by one"
            userImg={userImg}
          /> */}

          {arrTasks.map((item, index) => (
            <CardTask
              textTask={item.text}
              userImg={userImg}
              key={index}
              listId={parsedListId}
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
                onClick={handleSaveCardTask}
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
