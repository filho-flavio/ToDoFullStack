import "./BoardTasks.css";

const BoardTasks = () => {
  return (
    <>
      <div className="board-tasks-container">
        <div className="board-tasks-content">
          <h2 className="title-board-tasks">All Tasks</h2>
          <div className="underline-board-tasks"></div>
          <div className="wrap-board-tasks">
            <div className="tasks-column">
              <h3 className="title-tasks-columns">To Do</h3>
              <div className="tasks-list"></div>
            </div>
            <div className="tasks-column">
              <h3 className="title-tasks-columns">In Progress</h3>
              <div className="tasks-list"></div>
            </div>
            <div className="tasks-column">
              <h3 className="title-tasks-columns">In Review</h3>
              <div className="tasks-list">
              </div>
              <button>+ Add a card</button>
            </div>
            <div className="tasks-column">
              <h3 className="title-tasks-columns">Finished</h3>
              <div className="tasks-list line"></div>
            </div>
            <div className="tasks-column">
              <button>+ Add another List</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardTasks;
