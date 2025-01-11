# Simple Task Management API

A lightweight task management system API that allows users to create, read, update, and delete tasks. Users can also filter tasks by priority or due date and track the history of status changes.

## Features

1. **Task Management**
   - CRUD operations for tasks.
2. **Filter and Search**
   - Filter tasks by priority (High, Medium, Low) and due date (Today, Overdue).
3. **Status Tracking**
   - Maintain a log of status updates (e.g., "Pending" → "In Progress" → "Completed").
4. **Error Handling**
   - Handles invalid input, missing tasks, and server errors gracefully.

## Endpoints

### Task Endpoints
| Method | Endpoint         | Description                    |
|--------|------------------|--------------------------------|
| POST   | `/tasks`         | Create a new task             |
| GET    | `/tasks`         | Get a list of tasks           |
| GET    | `/tasks/:id`     | Get a specific task by ID     |
| PUT    | `/tasks/:id`     | Update a task                 |
| DELETE | `/tasks/:id`     | Delete a task                 |

### Filters
- Filter tasks by:
  - Priority: `?priority=High`
  - Due Date: `?dueDate=today` or `?dueDate=overdue`
- Sorting:
  - By Due Date: Default.
  - By Priority: `?sort=priority`.

### Status Logs
| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| GET    | `/tasks/:id/status`  | Get the status log of a task       |

## Tech Stack

- **Backend**: Node.js (Express.js) or Go (Fiber)
- **Database**: PostgreSQL
- **Testing**: Jest (Node.js) or Go's `testing` package
- **Queue**: Array-based status tracking (can integrate Redis for scaling)
- **Authentication** (Stretch Goal): JWT

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/simple-task-management-api.git
   cd simple-task-management-api
