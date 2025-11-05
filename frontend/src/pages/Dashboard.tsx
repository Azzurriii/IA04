import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="user-card">
          <h2>Welcome back, {user?.name}!</h2>
          <div className="user-info">
            <div className="info-row">
              <span className="info-label">User ID:</span>
              <span className="info-value">{user?.id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{user?.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3>Authentication Info</h3>
          <p>
            You are successfully authenticated using JWT tokens. This page is protected
            and can only be accessed with a valid access token.
          </p>
          <ul>
            <li>Access tokens are stored in memory</li>
            <li>Refresh tokens are stored in localStorage</li>
            <li>Tokens are automatically refreshed when expired</li>
            <li>Logout clears all tokens</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
