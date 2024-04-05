import "./Sidebar.css";
import imgArrows from "../../assets/double-arrow.png";
import { IoMdArrowDropdown } from "react-icons/io";
import imgWelcome from "../../assets/emoji-happy.png";
import imgUser from "../../assets/user.png";
import imgBoardTasks from "../../assets/board.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { user, signOut } = useAuth();
  const selectedItem = localStorage.getItem("todo-sidebar");
  const [selectedOption, setSelectedOption] = useState<string | null>(
    selectedItem
  );
  const navigate = useNavigate();

  const saveOption = (item: string) => {
    localStorage.setItem("todo-sidebar", item);
    setSelectedOption(item);
  };

  useEffect(() => {
    if (selectedOption) {
      handleSelected(selectedOption);
    }
  }, []);

  const handleSelected = (item: string) => {
    const oldItem = document.querySelector(".selected");

    if (oldItem) {
      oldItem?.classList.remove("selected");
    }

    const selectedItem = document.querySelector(item);

    if (selectedItem) {
      selectedItem?.classList.add("selected");
      saveOption(item);
    } else {
      document.querySelector(".home")?.classList.add("selected");
      saveOption(".home");
    }
  };

  const handleSignout = () => {
    document
      .querySelector(".sidebar-btn-signout")
      ?.classList.toggle("signout-opened");
    document.querySelector(".sidebar-signout")?.classList.toggle("active");
  };

  const handleSigningout = () => {
    signOut();
    navigate("/");
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
            className="sidebar-link home"
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
          <IoMdArrowDropdown
            className="sidebar-btn-signout pointer"
            onClick={handleSignout}
          />
        </div>
        <div className="sidebar-signout">
          <button className="btn-signout pointer" onClick={handleSigningout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
