import ListColumn from "../../components/ListColumn/ListColumn";
import imgChangeColor from "../../assets/color-picker.png";
import { IoClose } from "react-icons/io5";
import "./AllTasks.css";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCreateList, useGetLists } from "../../hooks/useHandleLists";

interface ListTasks {
  listTitle: string;
  qtd_tasks: number;
}

const AllTasks = () => {
  const { user } = useAuth();
  const [isModalChangeColorOpen, setIsModalChangeColorOpen] =
    useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState(".color-blue");
  const [isAddingList, setIsAddingList] = useState<boolean>(false);
  const [listToCreate, setListToCreate] = useState<ListTasks>({
    listTitle: "",
    qtd_tasks: 0,
  });
  const [arrListColumns, setArrListColumns] = useState([
    {
      id: 1,
      titleList: "To do",
      qtd_tasks: 3,
    },
    {
      id: 2,
      titleList: "Doing",
      qtd_tasks: 5,
    },
    {
      id: 3,
      titleList: "In Review",
      qtd_tasks: 2,
    },
    {
      id: 4,
      titleList: "Finished",
      qtd_tasks: 10,
    },
    {
      id: 5,
      titleList: "Next week",
      qtd_tasks: 6,
    },
    {
      id: 6,
      titleList: "Next month",
      qtd_tasks: 15,
    },
  ]);
  const refTitleList = useRef("");
  console.log("Here is the color: " + currentColor);

  useEffect(() => {
    const background = document.querySelector(
      ".board-tasks-container"
    ) as HTMLElement;

    background.style.backgroundColor = "#3d61a2";
  }, []);

  useEffect(() => {
    selectColor(currentColor);
  }, [isModalChangeColorOpen]);

  const handleOpenModalChangeColor = () => {
    setIsModalChangeColorOpen(!isModalChangeColorOpen);
  };

  const handleChangeColor = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const colorTarget = event.target.classList;

    const background = document.querySelector(
      ".board-tasks-container"
    ) as HTMLElement;

    if (colorTarget.contains("color-white")) {
      background.style.backgroundColor = "#fff";
      selectColor(".color-white");
    } else if (colorTarget.contains("color-gray")) {
      background.style.backgroundColor = "#939393";
      selectColor(".color-gray");
    } else if (colorTarget.contains("color-blue")) {
      background.style.backgroundColor = "#3d61a2";
      selectColor(".color-blue");
    } else if (colorTarget.contains("color-green")) {
      background.style.backgroundColor = "#55a23d";
      selectColor(".color-green");
    } else if (colorTarget.contains("color-yellow")) {
      background.style.backgroundColor = "#a29b3d";
      selectColor(".color-yellow");
    }
  };

  const selectColor = (className) => {
    const currentColor = document.querySelector(".current-color");

    if (currentColor) {
      currentColor.classList.remove("current-color");
    }

    const newColor = document.querySelector(className);

    if (newColor) {
      newColor.classList.add("current-color");
      setCurrentColor(className);
    }
  };

  const handleOpenAddList = () => {
    setIsAddingList(!isAddingList);
  };

  useEffect(() => {
    useGetLists();
  }, [listToCreate])

  const handleSaveList = () => {
    const listTitle = refTitleList.current.value.trim();

    if (listTitle !== "") {
      setArrListColumns((prevState) => [
        ...prevState,
        { id: prevState.length + 1, titleList: listTitle, qtd_tasks: 0 },
      ]);

      setListToCreate({ listTitle: listTitle, qtd_tasks: 0 });

      useCreateList(listToCreate);

      setIsAddingList(!isAddingList);
    }
  };

  return (
    <>
      <div className="board-tasks-container">
        <div className="board-tasks-content">
          <div className="wrap-title-all-tasks">
            <h2 className="title-board-tasks">All Tasks</h2>

            <div className="wrap-add-list-change-color">
              {!isAddingList && (
                <button
                  className="btn-add-column pointer"
                  onClick={() => setIsAddingList(!isAddingList)}
                >
                  + Add another List
                </button>
              )}
              <img
                src={imgChangeColor}
                alt="Color picker"
                className="color-picker pointer"
                onClick={() =>
                  setIsModalChangeColorOpen(!isModalChangeColorOpen)
                }
              />
            </div>
          </div>

          <div className="underline-board-tasks"></div>

          <div className="wrap-board-tasks">
            <div className="board-tasks">
              {arrListColumns.map((item) => (
                <ListColumn
                  listTitle={item.titleList}
                  qtdTasks={item.qtd_tasks}
                  key={item.id}
                />
              ))}
            </div>
            {isAddingList && (
              <div className="modal-add-list">
                <input
                  ref={refTitleList}
                  type="text"
                  className="in-add-list"
                  placeholder="Enter list title..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveList;
                    }
                  }}
                />
                <div className="modal-save-close-list">
                  <button
                    className="btn-save-list pointer"
                    onClick={handleSaveList}
                  >
                    Save list
                  </button>
                  <IoClose
                    className="btn-close-modal pointer"
                    onClick={handleOpenAddList}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {isModalChangeColorOpen && (
          <div className="modal-change-background">
            <div className="modal-header">
              <h4 className="modal-title">Change Background</h4>
              <IoClose
                className="modal-btn-close pointer"
                onClick={handleOpenModalChangeColor}
              />
            </div>
            <div className="modal-underline"></div>
            <div className="modal-list-colors">
              <span
                className="modal-item-color current-color color-white"
                onClick={handleChangeColor}
              ></span>
              <span
                className="modal-item-color color-gray"
                onClick={handleChangeColor}
              ></span>
              <span
                className="modal-item-color color-blue"
                onClick={handleChangeColor}
              ></span>
              <span
                className="modal-item-color color-green"
                onClick={handleChangeColor}
              ></span>
              <span
                className="modal-item-color color-yellow"
                onClick={handleChangeColor}
              ></span>
              <span className="modal-item-color line"></span>
              <span className="modal-item-color line"></span>
              <span className="modal-item-color line"></span>
              <span className="modal-item-color line"></span>
              <span className="modal-item-color line"></span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllTasks;
