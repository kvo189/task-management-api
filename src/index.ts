import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { initializeDatabase } from './database';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize database
let db: any;
initializeDatabase().then((database) => {
  db = database;
});

// Create a new task
app.post('/tasks', async (req: Request, res: Response) => {
  const { title, description, priority, dueDate, status } = req.body;

  try {
    const result = await db.run(
      `
      INSERT INTO tasks (title, description, priority, dueDate, status)
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, description, priority, dueDate, status]
    );
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get all tasks
app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await db.all('SELECT * FROM tasks');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get a specific task
app.get('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(200).json(task);
    }
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Update a task
app.put('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, status } = req.body;

  try {
    const result = await db.run(
      `
      UPDATE tasks
      SET title = ?, description = ?, priority = ?, dueDate = ?, status = ?
      WHERE id = ?
      `,
      [title, description, priority, dueDate, status, id]
    );
    if (result.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(200).json({ message: 'Task updated successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await db.run('DELETE FROM tasks WHERE id = ?', [id]);
    if (result.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(200).json({ message: 'Task deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
