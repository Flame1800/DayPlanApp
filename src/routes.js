const host = "http://localhost:3001";

// Create new task
// POST /tasks
// { task: { text: 'your text' } }

// Get List Of Tasks
// GET /tasks

// Get Task
// GET /tasks/:id

// Remove Task
// DELETE /tasks/:id

export default {
  tasksDayUrl: () => [host, "tasksDay"].join("/"), // get tasks list
  taskDayUrl: (id) => [host, "tasksDay", id].join("/"),
  userUrl: (id) => [host, "users", id].join("/"),
};
