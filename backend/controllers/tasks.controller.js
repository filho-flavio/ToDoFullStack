import { db } from "../db/connection";

export const createTask = (req, res) => {
  try {
    const { text, data_abertura, schedule, user_owner } = req.body;

    const query = "INSERT INTO tasks (`text`, `data_abertura`, `schedule`, `user_owner`, `assigned_to`) VALUES(?)";

    const values = [text, data_abertura, schedule, user_owner];

    const createdTask = db.query(query, [values]);

    if (createdTask) {
      res.status(200).send("Task created sucessfully!");
    }
  } catch (error) {
    console.log(`Error in create task controller: ${error}`);
    res.status(500).send(`Error in create task: ${error}`);
  }
};

export const getAllTasks = (_, res) => {
  try {
    const query = "SELECT * FROM tasks";

    const allTasks = db.query(query);

    if (allTasks) {
      res.status(200).send("All tasks was send sucessfully!");
    }
  } catch (error) {
    console.log(`Error in get all tasks controller: ${error}`);
    res.status(500).send(`Error in get all tasks: ${error}`);
  }
};

export const createListColumn = (req, res) => {
  try {
    const { titleList, qtd_tasks } = req.body;

    const query = "INSERT INTO users (`titleList`, `qtd_tasks`) VALUES(?)";

    const values = [titleList, qtd_tasks];

    const createdList = db.query(query, [values]);

    if (createdList) {
      res.status(200).send("List created sucessfully!");
    }
  } catch (error) {
    console.log(`Error in create list controller: ${error}`);
    res.status(500).send(`Error in create list: ${error}`);
  }
};

// this function must do a query that does a distinct query and returns all the list names
export const getAllLists = (_, res) => {
  try {
  } catch (error) {
    console.log(`Error in get all list controller: ${error}`);
    res.status(500).send(`Error in create list: ${error}`);
  }
};
