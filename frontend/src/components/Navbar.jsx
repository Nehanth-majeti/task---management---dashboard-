import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  // Get initial letters of user's name for avatar profile badge
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand" onClick={(e) => e.preventDefault()}>
          <CheckSquare size={26} strokeWidth={2.5} />
          <span>Taskly</span>
        </a>

        <div className="navbar-user">
          <div className="user-info">
            <div className="user-avatar" title={user.name}>
              {getInitials(user.name)}
            </div>
            <span className="user-name">{user.name}</span>
          </div>

          <button 
            className="btn btn-secondary" 
            onClick={logout} 
            title="Log Out of your account"
            style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
