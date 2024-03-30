import CardTask from "../CardTask/CardTask";
import "./ListColumn.css";
import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import userImg from "../../assets/user.png";
import { useRef, useState } from "react";

interface Props {
  listTitle: string;
  qtdTasks: number;
}

const ListColumn: React.FC<Props> = ({ listTitle, qtdTasks }) => {
  const [isOpenAddCard, setIsOpenAddCard] = useState<boolean>(false);
  const refText = useRef<HTMLInputElement>(null);
  const refTitle = useRef<HTMLInputElement>(null);
  const [cardTask, setCardTask] = useState([]);
  const [isChangingTitle, setIsChangingTitle] = useState<boolean>(false);

  const handleOpenAddCard = () => {
    setIsOpenAddCard(!isOpenAddCard);
  };

  const handleSaveCardTask = () => {
    if (refText.current !== null && refText.current.value.trim() !== "") {
      setCardTask((prevState) => [
        ...prevState,
        { text: refText.current.value, userImg: userImg },
      ]);
      setIsOpenAddCard(!isOpenAddCard);
    } else {
      alert("You must write a task to add!");
    }
  };

  const handleChangeTitle = () => {
    refTitle.current.value = listTitle;
  };

  const handleChangeTitleList = () => {
    setIsChangingTitle(!isChangingTitle);
  };

  return (
    <>
      <div className="tasks-column" key={listTitle} id={listTitle}>
        <div className="title-wrap">
          <span className="title-content">
            {isChangingTitle ? (
              <input
                value={listTitle}
                className="changing-title-list"
                onChange={(e) => handleChangeTitle}
                ref={refTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setIsChangingTitle(!isChangingTitle);
                }}
              />
            ) : (
              <h3
                className="title-tasks-columns "
                onDoubleClick={handleChangeTitleList}
              >
                {listTitle}
              </h3>
            )}
            <p className="qtd-tasks">{qtdTasks}</p>
          </span>
          <BsThreeDots className="menu-column grab" />
        </div>

        <div className="tasks-list">
          <CardTask
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
          />

          {cardTask.map((item) => (
            <CardTask textTask={item.text} userImg={item.userImg} />
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
