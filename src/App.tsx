import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { setUserId, getUsers } from './api';
import Timeline from './pages/Timeline';
import Profile from './pages/Profile';
import MurmurDetail from './pages/MurmurDetail';
import { User } from './types';
import './index.css';

function App() {
  const [userId, setId] = useState<number | undefined>(() => {
    const raw = localStorage.getItem('currentUserId');
    return raw ? Number(raw) : undefined;
  });
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUserId(userId);
    if (userId) localStorage.setItem('currentUserId', String(userId));
    else localStorage.removeItem('currentUserId');
  }, [userId]);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((error) => {
        console.error('Error loading users:', error);
        setUsers([]);
      });
  }, []);

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

          <div style={{ 
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#f7f9fa',
            borderRadius: '8px',
          }}>
            <label style={{ 
              display: 'block',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#657786',
              marginBottom: '8px',
            }}>
              Current User
            </label>
            <select 
              value={userId ?? ''} 
              onChange={e => setId(e.target.value ? Number(e.target.value) : undefined)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #e1e8ed',
                fontSize: '14px',
                backgroundColor: 'white',
              }}
            >
              <option value="">(none)</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name || u.email}
                </option>
              ))}
            </select>
            {userId && (
              <p style={{ 
                marginTop: '8px',
                fontSize: '12px',
                color: '#657786',
              }}>
                You are logged in as: {users.find(u => u.id === userId)?.name || users.find(u => u.id === userId)?.email}
              </p>
            )}
          </div>
        </nav>

        <main style={{ 
          flex: 1, 
          padding: '20px',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          <Routes>
            <Route path="/" element={<Timeline currentUserId={userId} />} />
            <Route path="/global" element={<Timeline currentUserId={userId} global />} />
            <Route path="/users/:id" element={<Profile currentUserId={userId} />} />
            <Route path="/murmurs/:id" element={<MurmurDetail currentUserId={userId} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
