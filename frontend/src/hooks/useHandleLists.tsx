import axios from "axios";

interface ListTasks {
  listTitle: string;
  qtd_tasks: number;
  user_owner: string;
}

interface ListUser {
  user_owner: string;
}

export const useGetLists = async (data: ListUser) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/tasks-lists/get-lists",
      data
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
