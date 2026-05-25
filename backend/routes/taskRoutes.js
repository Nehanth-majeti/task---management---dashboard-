const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Secure all task routes
router.use(protect);

// Statistics route (Must be defined BEFORE /:id to avoid conflict)
router.get('/stats', getTaskStats);

// Task CRUD routes
router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
