import { db } from "../db/connection.js";

export const createTask = (req, res) => {
  try {
    const { textTask, listId } = req.body;

    const query = "INSERT INTO tasks (`text`,  `list_id`) VALUES(?)";

    const values = [textTask, listId];

    const createdTask = db.query(query, [values]);

    if (createdTask) {
      res.status(200).send("Task created sucessfully!");
    }
  } catch (error) {
    console.log(`Error in create task controller: ${error}`);
    res.status(500).send(`Error in create task: ${error}`);
  }
};

export const getAllTasks = (req, res) => {
  const { listId } = req.body;

  const query = "SELECT * FROM tasks WHERE list_id = ?";

  db.query(query, [listId], (error, data) => {
    if (error) {
      console.log(`Error in get all list controller: ${error}`);
      return res
        .status(500)
        .json({ error: `Error in get all tasks controller: ${error}` });
    }

    return res.status(200).json(data);
  });
};

export const createList = (req, res) => {
  try {
    const { listTitle, qtd_tasks } = req.body;
    
    console.log("Here is the title: " + listTitle, qtd_tasks);

    const query =
      "INSERT INTO tasks_list (`list_title`, `qtd_tasks`) VALUES(?, ?)";

    // const values = [listTitle, qtd_tasks];

    // const createdList = db.query(query, [values]);

    // if (createdList) {
    //   res.status(200).send("List created sucessfully!");
    // }
  } catch (error) {
    console.log(`Error in create list controller: ${error}`);
    res.status(500).send(`Internal server error.`);
  }
};

// this function must do a query that does a distinct query and returns all the list names
export const getAllLists = (_, res) => {
  const query = "SELECT * FROM tasks_list";

  db.query(query, (error, data) => {
    if (error) {
      console.log(`Error in get all list controller: ${error}`);
      res
        .status(500)
        .json({ error: `Error in get all list controller: ${error}` });
    }

    console.log(data);

    res.status(200).json(data);
  });
};
