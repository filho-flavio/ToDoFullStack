import axios from "axios";

export const useGetTasks = async () => {
  try {
    const response = await axios.get("/api/tasks");
    return response.data;
  } catch (error) {
    alert(`Error to get all tasks: ${error}`);
    return;
  }
};

export const useCreateTask = async () => {
  try {
    
  } catch(error) {

  }
}

export const useUpdateTask = async () => {

} 

export const useDeleteTask = async () => {

}
