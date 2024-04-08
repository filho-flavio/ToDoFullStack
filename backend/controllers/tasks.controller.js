import { db } from "../db/connection.js";

export const createTask = (req, res) => {
  try {
    const { textTask, listId, user_owner, position } = req.body;

    const query =
      "INSERT INTO tasks (`text`,  `list_id`,  `user_owner`, `position`) VALUES(?)";

    const values = [textTask, listId, user_owner, position];

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
  try {
    const { listId, user_owner } = req.body;

    const query = "SELECT * FROM tasks WHERE list_id = ? AND user_owner = ?";

    db.query(query, [listId, user_owner], (error, data) => {
      if (error) {
        console.log(`Error in get all tasks controller: ${error}`);
        return res
          .status(500)
          .json({ error: `Error in get all tasks controller: ${error}` });
      }

      return res.status(200).json(data);
    });
  } catch (error) {
    console.error(`Error in get all tasks controller: ${error}`);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const createList = (req, res) => {
  try {
    const { listTitle, qtd_tasks, user_owner } = req.body;

    const query =
      "INSERT INTO tasks_list (`list_title`, `qtd_tasks`, `list_user_owner`) VALUES(?, ?, ?)";

    const values = [listTitle, qtd_tasks, user_owner];

    const createdList = db.query(query, values);

    if (createdList) {
      res.status(200).send("List created sucessfully!");
    }
  } catch (error) {
    console.log(`Error in create list controller: ${error}`);
    res.status(500).send(`Internal server error.`);
  }
};

export const getAllLists = (req, res) => {
  try {
    const { user_owner } = req.body;

    const query = "SELECT * FROM tasks_list WHERE list_user_owner = ?";

    db.query(query, [user_owner], (error, data) => {
      if (error) {
        console.log(`Error in get all list controller: ${error}`);
        return res
          .status(500)
          .json({ error: `Error in get all list controller: ${error}` });
      }

      res.status(200).json(data);
    });
  } catch (error) {
    console.error(`Error in get all list controller: ${error}`);
    res.status(500).json({ error: `Internal Server Error` });
  }
};
