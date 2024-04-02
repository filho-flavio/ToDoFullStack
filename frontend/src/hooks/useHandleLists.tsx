import axios from "axios";

interface ListTasks {
  listTitle: string;
  qtd_tasks: number;
}

export const useGetLists = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/tasks-lists/get-lists"
    );

    return response.data;
  } catch (error) {
    console.log(`Error in use get lists: ${error}`);
  }
};

export const useCreateList = async (data: ListTasks) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/tasks-lists/create-list",
      data
    );

    console.log("Here is the data list: " + data.listTitle);

    return response.data;
  } catch (error) {
    alert(`Error in useCreateList: ${error}`);
  }
};
