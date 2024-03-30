import { useState } from "react";
import axios from "axios";

interface Props {
  data: object;
}

export const useGetLists = async () => {
  try {
    const response = await axios.get("/api/lists");

    return response.data;
  } catch (error) {
    console.log(`Error in use get lists: ${error}`);
  }
};

export const useCreateList = ({ data }: Props) => {
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/listcolumn",
        data
      );
      setResponseData(response.data);
    } catch (error) {
      setError(`Error in useCreateList: ${error}`);
    }
  };

  return { createList, responseData, error };
};
