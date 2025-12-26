import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { getUsers, getCurrentUser, logout } from './api';
import Timeline from './pages/Timeline';
import Profile from './pages/Profile';
import MurmurDetail from './pages/MurmurDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { User } from './types';
import './index.css';

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
      }}>
        <nav style={{ 
          minWidth: 220, 
          backgroundColor: 'white',
          borderRight: '1px solid #e1e8ed',
          padding: '20px',
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            marginBottom: '24px',
            fontWeight: 'bold',
            color: '#1da1f2',
          }}>
            MiniMurmur
          </h2>
          
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

          {currentUser ? (
            <div style={{ 
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#f7f9fa',
              borderRadius: '8px',
            }}>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ 
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#14171a',
                  marginBottom: '4px',
                }}>
                  {currentUser.name || currentUser.email}
                </p>
                <p style={{ 
                  fontSize: '12px',
                  color: '#657786',
                }}>
                  @user{currentUser.id}
                </p>
              </div>
              <Link
                to={`/users/${currentUser.id}`}
                style={{
                  display: 'block',
                  padding: '8px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  color: '#1da1f2',
                  fontSize: '14px',
                  marginBottom: '8px',
                  textAlign: 'center',
                }}
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e1e8ed',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  color: '#e0245e',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ 
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#f7f9fa',
              borderRadius: '8px',
            }}>
              <Link
                to="/login"
                style={{
                  display: 'block',
                  padding: '10px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  backgroundColor: '#1da1f2',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: '8px',
                }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                style={{
                  display: 'block',
                  padding: '10px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  border: '1px solid #1da1f2',
                  color: '#1da1f2',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  backgroundColor: 'white',
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>

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
              <Route path="/" element={<Timeline currentUserId={currentUser?.id} />} />
              <Route path="/global" element={<Timeline currentUserId={currentUser?.id} global />} />
              <Route path="/users/:id" element={<Profile currentUserId={currentUser?.id} />} />
              <Route path="/murmurs/:id" element={<MurmurDetail currentUserId={currentUser?.id} />} />
            </Routes>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
