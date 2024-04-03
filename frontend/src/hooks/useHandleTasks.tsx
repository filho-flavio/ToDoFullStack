import axios from "axios";

interface GetTasks {
  listId: string;
}

interface Tasks {
  textTask: string;
  listId: string;
}

export const useGetTasks = async (data: GetTasks) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/tasks-lists/get-tasks",
      data
    );
    return response.data;
  } catch (error) {
    alert(`Error to get all tasks: ${error}`);
    return;
  }
};

export const useCreateTask = async (data: Tasks) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/tasks-lists/create-task",
      data
    );
    return response.data;
  } catch (error) {
    alert(`Error in useCreateTask: ${error}`);
  }
};

export const useUpdateTask = async () => {};

export const useDeleteTask = async () => {};
