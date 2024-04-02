import "./Sidebar.css";
import imgArrows from "../../assets/double-arrow.png";
import imgWelcome from "../../assets/emoji-happy.png";
import imgUser from "../../assets/user.png";
import imgBoardTasks from "../../assets/board.png";
import imgTeam from "../../assets/team.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


const Sidebar = () => {
  const { user } = useAuth();

  const handleSelected = (item: string) => {
    const oldItem = document.querySelector(".selected");

    if (oldItem) {
      oldItem?.classList.remove("selected");
    }

    const selectedItem = document.querySelector(item);

    if (selectedItem) {
      document.querySelector(item)?.classList.add("selected");
    } else {
      document.querySelector(".home")?.classList.add("selected");
    }


  };

  return (
    <>
      <div className="sidebar-container">
        <h1 className="sidebar-title">TODO LIST</h1>
        <div className="sidebar-close">
          <img className="imgDoubleArrow pointer" src={imgArrows} alt="" />
        </div>
        <nav className="sidebar-nav">
          <Link
            to={"/home"}
            className="sidebar-link home selected"
            onClick={() => handleSelected("home")}
          >
            <span className="sidebar-wrap-link">
              <img src={imgWelcome} alt="" />
              Welcome
            </span>
          </Link>
          <Link
            to={"/all-tasks"}
            className="sidebar-link board"
            onClick={() => handleSelected(".board")}
          >
            <span className="sidebar-wrap-link">
              <img src={imgBoardTasks} alt="" />
              All Tasks
            </span>
          </Link>
        </nav>
        <div className="sidebar-user-info">
          <img src={imgUser} alt="" />
          <span>
            <p className="sidebar-full-name">{user.fullName}</p>
            <p className="sidebar-username">{user.username}</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
