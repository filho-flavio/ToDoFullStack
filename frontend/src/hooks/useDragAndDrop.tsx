import { useContext } from "react";
import { DragAndDropContext } from "../context/dragAndDrop";

export const useDragAndDrop = () => {
  const context = useContext(DragAndDropContext);

  return context;
};
