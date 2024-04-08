import React, { createContext, useState } from "react";

interface Item {
  textTask: string;
  userImg: string;
  listId: string;
  taskId: number;
}

interface Props {
  children: React.ReactNode;
}

export const DragAndDropContext = createContext({});

const DragAndDropProvider: React.FC<Props> = ({ children }) => {
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);

  // Função para lidar com o início do arrastar
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    item: Item
  ) => {
    setDraggedItem(item);
  };

  // Função para lidar com o final do arrastar
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // Função que permite soltar o item
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Função para soltar o item
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const targetListId = event.target.id;
    const taskId = draggedItem?.taskId;
    const oldListId = draggedItem?.listId;

    targetColumn(oldListId, taskId, targetListId);

    if (draggedItem) {
      //console.log("Item dropped:", draggedItem);
      setDraggedItem(null);
    }
  };

  const targetColumn = (listId, taskId, listTarget) => {
    const columnTarget = document.querySelector("#" + listTarget);
    const task = document.querySelector(
      "#taskId-" + taskId + "-listId-" + listId
    );
    console.log(columnTarget);

    console.log(task);
  };

  return (
    <DragAndDropContext.Provider
      value={{ handleDragStart, handleDragEnd, handleDragOver, onDrop }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};

export default DragAndDropProvider;
