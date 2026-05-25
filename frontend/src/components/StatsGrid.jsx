import React from 'react';
import { Folder, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const StatsGrid = ({ stats }) => {
  const { total = 0, completed = 0, pending = 0, inProgress = 0, overdue = 0 } = stats || {};

  // Compute active/remaining tasks
  const activeTasks = pending + inProgress;

  return (
    <div className="stats-grid">
      <div className="stat-card total">
        <div className="stat-details">
          <h3>Total Tasks</h3>
          <div className="stat-value">{total}</div>
        </div>
        <div className="stat-icon-wrapper">
          <Folder size={24} />
        </div>
      </div>

      <div className="stat-card completed">
        <div className="stat-details">
          <h3>Completed</h3>
          <div className="stat-value">{completed}</div>
        </div>
        <div className="stat-icon-wrapper">
          <CheckCircle2 size={24} />
        </div>
      </div>

      <div className="stat-card pending">
        <div className="stat-details">
          <h3>Active Tasks</h3>
          <div className="stat-value">{activeTasks}</div>
        </div>
        <div className="stat-icon-wrapper">
          <Clock size={24} />
        </div>
      </div>

      <div className="stat-card overdue">
        <div className="stat-details">
          <h3>Overdue</h3>
          <div className="stat-value">{overdue}</div>
        </div>
        <div className="stat-icon-wrapper">
          <AlertCircle size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
