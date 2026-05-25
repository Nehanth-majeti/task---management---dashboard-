const { readDb, writeDb } = require('../config/jsonDb');

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  try {
    if (!title || !dueDate) {
      return res.status(400).json({ message: 'Title and due date are required' });
    }

    const db = readDb();

    const newTask = {
      _id: 'task_' + Date.now() + Math.random().toString(36).substr(2, 5),
      user: req.user._id,
      title,
      description: description || '',
      status: status || 'Pending',
      priority: priority || 'Medium',
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.tasks.push(newTask);
    writeDb(db);

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Create Task Error:', error.message);
    res.status(500).json({ message: 'Server error, failed to create task' });
  }
};

/**
 * @desc    Get all user tasks (with search, filter, and sort)
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = async (req, res) => {
  try {
    const { search, status, priority, sort } = req.query;
    const db = readDb();

    // Filter tasks belonging strictly to authenticated user
    let userTasks = db.tasks.filter(t => t.user === req.user._id);

    // Search query filter (title or description case-insensitive)
    if (search) {
      const searchLower = search.toLowerCase();
      userTasks = userTasks.filter(t => 
        (t.title && t.title.toLowerCase().includes(searchLower)) || 
        (t.description && t.description.toLowerCase().includes(searchLower))
      );
    }

    // Status filter
    if (status && status !== 'All') {
      userTasks = userTasks.filter(t => t.status === status);
    }

    // Priority filter
    if (priority && priority !== 'All') {
      userTasks = userTasks.filter(t => t.priority === priority);
    }

    // Sort options (default: due date ascending)
    if (sort === 'dueDateAsc') {
      userTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sort === 'dueDateDesc') {
      userTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    } else if (sort === 'createdAtDesc') {
      userTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      userTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Default
    }

    res.json(userTasks);
  } catch (error) {
    console.error('Get Tasks Error:', error.message);
    res.status(500).json({ message: 'Server error, failed to fetch tasks' });
  }
};

/**
 * @desc    Update a task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  try {
    const db = readDb();
    const taskIndex = db.tasks.findIndex(t => t._id === req.params.id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = db.tasks[taskIndex];

    // Check ownership
    if (task.user !== req.user._id) {
      return res.status(401).json({ message: 'User not authorized to update this task' });
    }

    // Update properties
    db.tasks[taskIndex] = {
      ...task,
      title: title !== undefined ? title : task.title,
      description: description !== undefined ? description : task.description,
      status: status !== undefined ? status : task.status,
      priority: priority !== undefined ? priority : task.priority,
      dueDate: dueDate !== undefined ? dueDate : task.dueDate,
      updatedAt: new Date().toISOString()
    };

    writeDb(db);
    res.json(db.tasks[taskIndex]);
  } catch (error) {
    console.error('Update Task Error:', error.message);
    res.status(500).json({ message: 'Server error, failed to update task' });
  }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res) => {
  try {
    const db = readDb();
    const taskIndex = db.tasks.findIndex(t => t._id === req.params.id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = db.tasks[taskIndex];

    // Check ownership
    if (task.user !== req.user._id) {
      return res.status(401).json({ message: 'User not authorized to delete this task' });
    }

    db.tasks.splice(taskIndex, 1);
    writeDb(db);

    res.json({ message: 'Task removed successfully' });
  } catch (error) {
    console.error('Delete Task Error:', error.message);
    res.status(500).json({ message: 'Server error, failed to delete task' });
  }
};

/**
 * @desc    Get task statistics for dashboard
 * @route   GET /api/tasks/stats
 * @access  Private
 */
const getTaskStats = async (req, res) => {
  try {
    const db = readDb();
    const now = new Date();

    // Filter tasks strictly owned by this user
    const userTasks = db.tasks.filter(t => t.user === req.user._id);

    const stats = {
      total: userTasks.length,
      completed: userTasks.filter(t => t.status === 'Completed').length,
      pending: userTasks.filter(t => t.status === 'Pending').length,
      inProgress: userTasks.filter(t => t.status === 'In Progress').length,
      overdue: userTasks.filter(t => t.status !== 'Completed' && new Date(t.dueDate) < now).length
    };

    res.json(stats);
  } catch (error) {
    console.error('Get Stats Error:', error.message);
    res.status(500).json({ message: 'Server error, failed to fetch statistics' });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskStats,
};
