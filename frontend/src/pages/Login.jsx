import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, AlertCircle, KeyRound, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [sessionExpiredMsg, setSessionExpiredMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user, error: authError, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If user is already authenticated, redirect immediately to Dashboard
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // Check if session has expired from redirect parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('expired') === 'true') {
      setSessionExpiredMsg(true);
    }
    clearError();
  }, [location, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSessionExpiredMsg(false);
    
    if (!email.trim() || !password) {
      setFormError('Please fill in all credentials');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      // Success will trigger user state effect to redirect
    } catch (err) {
      // Handled by local catch block, AuthContext saves the error message too
      setFormError(err.message || 'Incorrect email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', color: 'var(--primary)' }}>
            <CheckSquare size={42} strokeWidth={2.5} />
          </div>
          <h1>Welcome Back</h1>
          <p>Login to manage your tasks effectively</p>
        </div>

        {sessionExpiredMsg && (
          <div className="error-banner" style={{ background: 'var(--warning-glow)', borderColor: 'var(--warning)', color: '#fcd34d' }}>
            <AlertCircle size={16} />
            <span>Session expired, please sign in again.</span>
          </div>
        )}

        {(formError || authError) && (
          <div className="error-banner">
            <AlertCircle size={16} />
            <span>{formError || authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">Email Address</label>
            <div className="input-container">
              <input
                id="email-input"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="form-label" htmlFor="password-input" style={{ margin: '0' }}>Password</label>
            </div>
            <div className="input-container">
              <input
                id="password-input"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying Session...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
