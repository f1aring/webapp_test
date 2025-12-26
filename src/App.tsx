import  { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { getUsers, getCurrentUser, logout } from './api';
import Timeline from './pages/Timeline';
import Profile from './pages/Profile';
import MurmurDetail from './pages/MurmurDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { User } from './types';
import './index.css';
import TopBar from './components/TopBar';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Load all users for navigation
    getUsers()
      .then(setUsers)
      .catch((error) => {
        console.error('Error loading users:', error);
        setUsers([]);
      });
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f7f9fa',
        flexDirection: 'column'
      }}>
        <TopBar currentUser={currentUser} onLogout={handleLogout} />

        <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar only when a user is authenticated */}
        {currentUser && (
          <nav style={{
            minWidth: 220,
            backgroundColor: 'white',
            borderRight: '1px solid #e1e8ed',
            padding: '20px',
          }}>
            <div style={{ marginBottom: '24px' }}>
              <Link 
                to="/" 
                style={{
                  display: 'block',
                  padding: '12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#14171a',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                }}
              >
                Timeline
              </Link>
              <Link 
                to="/global" 
                style={{
                  display: 'block',
                  padding: '12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#14171a',
                  fontWeight: 'bold',
                }}
              >
                Global
              </Link>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold',
                color: '#657786',
                marginBottom: '12px',
                textTransform: 'uppercase',
              }}>
                Users
              </h4>
              {users.map(u => (
                <div key={u.id} style={{ marginBottom: '4px' }}>
                  <Link 
                    to={`/users/${u.id}`}
                    style={{
                      display: 'block',
                      padding: '8px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      color: '#14171a',
                      fontSize: '14px',
                    }}
                  >
                    {u.name || u.email}
                  </Link>
                </div>
              ))}
            </div>
          </nav>
        )}

        <main style={{
          flex: 1,
          padding: '20px',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#657786' }}>
              Loading...
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={currentUser ? <Timeline currentUserId={currentUser?.id} /> : <Navigate to="/login" replace />} />
              <Route path="/global" element={<Timeline currentUserId={currentUser?.id} global />} />
              <Route path="/users/:id" element={<Profile currentUserId={currentUser?.id} />} />
              <Route path="/murmurs/:id" element={<MurmurDetail currentUserId={currentUser?.id} />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
