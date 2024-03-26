import "./ListColumn.css";

interface Props {
  listTitle: string;
}

const ListColumn: React.FC<Props> = ({ listTitle }) => {
  return (
    <>
      <div className="tasks-column">
        <h3 className="title-tasks-columns">{listTitle}</h3>
        <div className="tasks-list"></div>
      </div>
    </>
  );
};

export default ListColumn;
