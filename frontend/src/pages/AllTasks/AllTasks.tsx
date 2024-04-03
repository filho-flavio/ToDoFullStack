import ListColumn from "../../components/ListColumn/ListColumn";
import imgChangeColor from "../../assets/color-picker.png";
import { IoClose } from "react-icons/io5";
import "./AllTasks.css";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCreateList, useGetLists } from "../../hooks/useHandleLists";
import { handleChangeColor } from "../../hooks/useChangeColor";

interface ListTasks {
  listTitle: string;
  qtd_tasks: number;
}

const AllTasks = () => {
  const { user } = useAuth();
  const [isModalChangeColorOpen, setIsModalChangeColorOpen] =
    useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState(".color-white");
  const [isAddingList, setIsAddingList] = useState<boolean>(false);
  const [listToCreate, setListToCreate] = useState<ListTasks>({
    listTitle: "",
    qtd_tasks: 0,
  });
  const [arrListColumns, setArrListColumns] = useState([]);
  const refTitleList = useRef("");

  useEffect(() => {
    selectColor(currentColor);
  }, [isModalChangeColorOpen]);

  useEffect(() => {
    setCurrentColor(user.backgroundColor);

    const background = document.querySelector(
      ".board-tasks-container"
    ) as HTMLElement;

    if (currentColor === ".color-white") {
      background.style.backgroundColor = "#fff";
      selectColor(".color-white");
    } else if (currentColor === ".color-gray") {
      background.style.backgroundColor = "#939393";
      selectColor(".color-gray");
    } else if (currentColor === ".color-blue") {
      background.style.backgroundColor = "#3d61a2";
      selectColor(".color-blue");
    } else if (currentColor === ".color-green") {
      background.style.backgroundColor = "#55a23d";
      selectColor(".color-green");
    } else if (currentColor === ".color-yellow") {
      background.style.backgroundColor = "#a29b3d";
      selectColor(".color-yellow");
    }
  }, [arrListColumns]);

  useEffect(() => {
    const fetchData = async () => {
      const arrList = await useGetLists();
      setArrListColumns(arrList);
    };

    fetchData();
  }, []);

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
  
    const colorMap: { [key: string]: string } = {
      "color-white": "#fff",
      "color-gray": "#939393",
      "color-blue": "#3d61a2",
      "color-green": "#55a23d",
      "color-yellow": "#a29b3d",
    };
  
    const className = Array.from(colorTarget).find((cls) => colorMap[cls]);
  
    if (className) {
      background.style.backgroundColor = colorMap[className];
      selectColor("." + className);
    }
  };
  

  const selectColor = (className: string) => {
    const currentColorElem = document.querySelector(".current-color");

    if (currentColorElem) {
      currentColorElem.classList.remove("current-color");
    }

    const newColorElem = document.querySelector(className);

    if (newColorElem) {
      newColorElem.classList.add("current-color");
      setCurrentColor(className);
    }
  };

  const handleOpenAddList = () => {
    setIsAddingList(!isAddingList);
  };

  useEffect(() => {
    useGetLists();
  }, [listToCreate]);

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
                  listTitle={item.list_title}
                  qtdTasks={item.qtd_tasks}
                  key={item.list_id}
                  listId={item.list_id}
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
