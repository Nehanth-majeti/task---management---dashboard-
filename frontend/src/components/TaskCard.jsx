import React from 'react';
import { Calendar, Trash2, Edit3, AlertTriangle, CheckCircle2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const { _id, title, description, status, priority, dueDate } = task;

  // Format date to local readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (status === 'Completed') return false;
    const now = new Date();
    // Zero out hours to compare only days
    now.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < now;
  };

  const overdue = isOverdue();

  return (
    <div className={`task-card ${status === 'Completed' ? 'completed-task' : ''}`}>
      <div className="task-card-header">
        <h3 className="task-title" title={title}>
          {title}
        </h3>
        <div className="task-actions">
          <button 
            className="action-btn" 
            onClick={() => onEdit(task)} 
            title="Edit Task Details"
            aria-label="Edit Task"
          >
            <Edit3 size={16} />
          </button>
          <button 
            className="action-btn delete" 
            onClick={() => onDelete(_id)} 
            title="Permanently Delete Task"
            aria-label="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="task-desc">
        {description || <span style={{ fontStyle: 'italic', opacity: 0.4 }}>No description provided.</span>}
      </p>

      <div className="task-meta-row">
        {/* Priority Badge */}
        <span className={`badge badge-priority-${priority.toLowerCase()}`}>
          {priority}
        </span>

        {/* Overdue Alert Badge */}
        {overdue && (
          <span className="badge badge-priority-high" style={{ display: 'flex', gap: '4px' }}>
            <AlertTriangle size={12} />
            <span>Overdue</span>
          </span>
        )}

        {/* Completed Badge */}
        {status === 'Completed' && (
          <span className="badge badge-status-completed" style={{ display: 'flex', gap: '4px' }}>
            <CheckCircle2 size={12} />
            <span>Completed</span>
          </span>
        )}
      </div>

      <div className="task-card-footer">
        <div className={`task-due-date ${overdue ? 'overdue-text' : ''}`}>
          <Calendar size={14} />
          <span>{formatDate(dueDate)}</span>
        </div>

        <div className="status-select-container">
          <select
            className="status-toggle"
            value={status}
            onChange={(e) => onStatusChange(_id, e.target.value)}
            title="Change Task Status"
            aria-label="Change status"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
