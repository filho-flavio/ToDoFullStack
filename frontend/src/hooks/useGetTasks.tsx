import axios from "axios";

const useGetTasks = async () => {
  try {
    const response = await axios.get("/api/tasks");
    return response.data;
  } catch (error) {
    alert(`Error to get all tasks: ${error}`);
    return;
  }
};

export default useGetTasks;
