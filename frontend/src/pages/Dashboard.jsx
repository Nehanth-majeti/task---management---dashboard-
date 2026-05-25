import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import StatsGrid from '../components/StatsGrid';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Plus, Search, HelpCircle, Loader2, ArrowUpDown } from 'lucide-react';

const Dashboard = () => {
  // Application state
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, inProgress: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtering & Sorting State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDateAsc');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null); // holds task if editing, null if creating

  // Toast Banner State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Helper: Trigger custom toast notifications
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    // Auto-dismiss toast
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  // Fetch stats and tasks from API (using useCallback to prevent recreation loops)
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      // Build task query parameters
      const params = {
        search: search.trim() || undefined,
        status: statusFilter !== 'All' ? statusFilter : undefined,
        priority: priorityFilter !== 'All' ? priorityFilter : undefined,
        sort: sortBy,
      };

      // Concurrent fetch of stats and task list
      const [tasksRes, statsRes] = await Promise.all([
        api.get('/tasks', { params }),
        api.get('/tasks/stats'),
      ]);

      setTasks(tasksRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Fetch dashboard details failed:', err.message);
      setError('Could not load workspace tasks. Please refresh.');
      showToast('Network error, dashboard data out of date.', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter, sortBy]);

  // Refetch when filtering properties or sort methods change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 200); // Small debounce to wait for typing search values
    return () => clearTimeout(delayDebounce);
  }, [fetchData]);

  // Handle task creation or update submissions
  const handleFormSubmit = async (taskData) => {
    try {
      if (activeTask) {
        // Update task
        await api.put(`/tasks/${activeTask._id}`, taskData);
        showToast('Task updated successfully!');
      } else {
        // Create task
        await api.post('/tasks', taskData);
        showToast('Task created successfully!');
      }
      setIsModalOpen(false);
      fetchData(); // Refresh dashboards
    } catch (err) {
      console.error('Task submission error:', err.message);
      showToast(err.response?.data?.message || 'Failed to submit task details', 'error');
    }
  };

  // Handle quick inline status updates on task cards
  const handleStatusChange = async (taskId, nextStatus) => {
    try {
      // Optimistic update for speedy visual responsiveness
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === taskId ? { ...t, status: nextStatus } : t))
      );
      
      await api.put(`/tasks/${taskId}`, { status: nextStatus });
      showToast('Status updated successfully!');
      
      // Refresh database records/aggregations
      const statsRes = await api.get('/tasks/stats');
      setStats(statsRes.data);
    } catch (err) {
      console.error('Status toggle failed:', err.message);
      showToast('Failed to update status', 'error');
      fetchData(); // Rollback to source truths
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to permanently delete this task?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      showToast('Task deleted successfully!');
      fetchData();
    } catch (err) {
      console.error('Task deletion failed:', err.message);
      showToast('Failed to delete task', 'error');
    }
  };

  // Open modal in creation mode
  const openCreateModal = () => {
    setActiveTask(null);
    setIsModalOpen(true);
  };

  // Open modal in editing mode
  const openEditModal = (task) => {
    setActiveTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="main-content">
      {/* Toast Alert Popups */}
      {toast.show && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header Panel */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800' }}>Workspace Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage, track, and complete your personal tasks</p>
        </div>
        <button className="btn btn-primary" onClick={openCreateModal}>
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>

      {/* Numerical statistics boxes */}
      <StatsGrid stats={stats} />

      {/* Filters Toolbar */}
      <div className="dashboard-actions">
        <div className="actions-left">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '100%', maxWidth: 'fit-content' }}>
            {/* Status Selectors */}
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              title="Filter by status"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Priority Selectors */}
            <select
              className="filter-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              title="Filter by priority"
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Sorting Dropdowns */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowUpDown size={14} style={{ color: 'var(--text-secondary)' }} />
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            title="Sort tasks"
          >
            <option value="dueDateAsc">Due Date: Soonest</option>
            <option value="dueDateDesc">Due Date: Latest</option>
            <option value="createdAtDesc">Created: Newest</option>
          </select>
        </div>
      </div>

      {/* Task Grid & Loading Displays */}
      {loading && tasks.length === 0 ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <span>Retrieving your tasks...</span>
        </div>
      ) : error ? (
        <div className="empty-state" style={{ borderColor: 'var(--danger)' }}>
          <h3>Loading Failed</h3>
          <p>{error}</p>
          <button className="btn btn-secondary" onClick={fetchData}>Try Again</button>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <HelpCircle size={48} />
          <h3>No tasks found</h3>
          <p style={{ maxWidth: '380px' }}>
            {search || statusFilter !== 'All' || priorityFilter !== 'All'
              ? 'No tasks match your current filter parameters. Try clearing your search or active filters.'
              : 'Add your first task by tapping the "New Task" button in the upper right.'}
          </p>
          {(search || statusFilter !== 'All' || priorityFilter !== 'All') && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
                setPriorityFilter('All');
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Popups */}
      <TaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        task={activeTask}
      />
    </div>
  );
};

export default Dashboard;
