import pkg from "pg";
import path from "path";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const { Client } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 5000;
const app = express();
let date = new Date();

// Database connection
const db = new Client({
  user: "siyabonga",
  host: "localhost",
  database: "todotask_db",
  password: "Siya@100",
  port: 5432,
});

async function connectDb() {
  try {
    await db.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}
connectDb();

// Middleware
app.use(express.static(path.join(__dirname, "../client")));
app.use(express.json()); // Only need express.json() for JSON bodies

// Save task to database
async function saveTask(description, date) {
  const query = `INSERT INTO tasks(description, date) VALUES ($1, $2) RETURNING *;`;
  try {
    console.log("Inserting task:", description, date); // Log inputs to the function
    const result = await db.query(query, [description, date]);
    console.log("Inserted row:", result.rows[0]); // Log result
    return result.rows[0];
  } catch (error) {
    console.error("Error during database insert:", error.message);
    throw new Error("Failed to save task to the database");
  }
}

// Add a task
app.post("/add", async (req, res) => {
  const { description, date } = req.body;
  console.log("Request body:", req.body); // Check the request data

  try {
    const newTask = await saveTask(description, date);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to save task" });
  }
});

// Edit a task
app.post("/edit", async (req, res) => {
  const { id, description, date } = req.body;

  try {
    await db.query("UPDATE tasks SET description = $1, date = $2 WHERE id = $3", [description, date, id]);
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ error: "Failed to edit task" });
  }
});

// Fetch tasks
app.get("/myTask", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY date DESC");
    console.log("Fetched tasks:", result.rows);  // Log fetched tasks
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.delete("/delete-task/:id?", async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      // Delete a single task by ID
      await db.query("DELETE FROM tasks WHERE id = $1", [id]);
      res.status(200).json({ message: `Task with ID ${id} has been deleted` });
    } else {
      // If no ID is provided, delete all tasks
      await db.query("DELETE FROM tasks");
      res.status(200).json({ message: "All tasks have been deleted" });
    }
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ error: "Failed to delete task" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
