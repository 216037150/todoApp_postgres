import pkg from "pg";
import path from "path";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const { Client } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 5000;
const app = express();

//data connection
const db = new Client({
  user: "Siyabonga",
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

// static files
app.use(express.static(path.join(__dirname, "../client")));
// app.use('/Utils', express.static(path.join(__dirname, '../Utils')));
app.use(express.json());

//POST

async function saveTask(description, date) {
  const query = `INSERT INTO tasks(description, date) VALUES ($1, $2);`;
  try {
    const result = await db.query(query, [description, date]);
    console.log("Inserted row:", result.rows);
    return result.rows[0];
  } catch (error) {
    console.error("Error during database insert:", error.message);
    throw new Error("Failed to save task to the database");
  }
}

app.post("/task", async (req, res) => {
  try {
    const { description, date } = req.body;
    console.log("Received data:", req.body);
    if (!description) {
      return response.status(400).json({ message: "title is required" });
    }

    await saveTask(description, date);
    res.status(200).json({ message: "Task saved successfully!" });
  } catch (error) {
    console.error("Error on saving task:", error.message);
    res.status(500).json({ error: "Failed to save task" });
  }
});

//insert task into database

app.get("/myTask", async (req, res) => {
  try {
    const result = await db.query(` SELECT * FROM tasks`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching task:", error.message);
    res.status(500).json({ error: "Failed to tasks" });
  }
});

// the app is running here
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
